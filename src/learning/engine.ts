import { POLICY_VERSION, REVIEW_DAYS, SCHEMA_VERSION } from '../contracts/index.ts'
import type {
  AppState, ContentBundle, Entry, EntryProgress, EntryStatus, HomeStats,
  LearningCommand, Session, SessionSummary, SessionTask,
} from '../contracts/index.ts'

const DAY = 86_400_000

export function createInitialState(bundle: ContentBundle, studyTimeZone: string): AppState {
  // Validate once, rather than silently changing an invalid time zone later.
  new Intl.DateTimeFormat('en', { timeZone: studyTimeZone }).format(0)
  return {
    schemaVersion: SCHEMA_VERSION, learningPolicyVersion: POLICY_VERSION,
    contentVersion: bundle.contentVersion, revision: 0,
    settings: { studyTimeZone, maxNewPerSession: 5 },
    progress: {}, attempts: [], session: null,
  }
}

export function currentTask(state: AppState): SessionTask | null {
  const session = state.session
  return session && session.state !== 'ended' ? session.queue[session.cursor] ?? null : null
}

export function normalizeAnswer(answer: string): string {
  return answer.normalize('NFC').trim().replace(/\s+/gu, ' ')
}

function studyDate(now: string, timeZone: string): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone, year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(new Date(now))
  const get = (type: string) => parts.find(part => part.type === type)!.value
  return `${get('year')}-${get('month')}-${get('day')}`
}

function shuffled<T>(values: readonly T[], seed: number): T[] {
  const result = [...values]
  let randomState = seed >>> 0
  for (let index = result.length - 1; index > 0; index--) {
    randomState += 0x6d2b79f5
    let value = randomState
    value = Math.imul(value ^ value >>> 15, value | 1)
    value ^= value + Math.imul(value ^ value >>> 7, value | 61)
    const random = ((value ^ value >>> 14) >>> 0) / 4_294_967_296
    const other = Math.floor(random * (index + 1))
    ;[result[index], result[other]] = [result[other], result[index]]
  }
  return result
}

function entryMap(bundle: ContentBundle): Map<string, Entry> {
  return new Map(bundle.entries.map(entry => [entry.entryId, entry]))
}

function due(progress: EntryProgress, now: string): boolean {
  return progress.nextDueAt !== null && Date.parse(progress.nextDueAt) <= Date.parse(now)
}

function needsRecall(progress: EntryProgress, sessionId: string, now: string): boolean {
  if (progress.pendingError) {
    return progress.pendingError.sessionId !== sessionId || progress.pendingError.remainingOtherAnswers === 0
  }
  return progress.initialRecallPending || due(progress, now)
}

function makeRecall(progress: EntryProgress, session: Session, suffix: string): SessionTask {
  return {
    taskId: `${session.sessionId}:recall:${progress.entryId}:${suffix}`,
    kind: 'cloze', entryId: progress.entryId,
    cycleKind: progress.pendingError ? 'recovery' : progress.initialRecallPending ? 'initial' : 'scheduled',
  }
}

function orderedRecall(state: AppState, now: string): EntryProgress[] {
  const sessionId = state.session!.sessionId
  const date = studyDate(now, state.settings.studyTimeZone)
  const completedIndependent = new Set(state.attempts.filter(attempt => attempt.sessionId === sessionId
    && attempt.studyDate === date && attempt.independent && attempt.correct).map(attempt => attempt.entryId))
  return Object.values(state.progress).filter(item => needsRecall(item, sessionId, now)
    // A due success on the same study date intentionally keeps its old due time.
    // It is complete for this study date; a later day/error can still require recall.
    && (item.pendingError !== null || !completedIndependent.has(item.entryId)))
    .sort((a, b) => {
      // Due scheduled reviews first; pending and unfinished work follow.
      const rank = (item: EntryProgress) => !item.pendingError && due(item, now) ? 0 : item.pendingError ? 1 : 2
      return rank(a) - rank(b)
        || (a.nextDueAt ?? a.introducedAt).localeCompare(b.nextDueAt ?? b.introducedAt)
        || a.entryId.localeCompare(b.entryId)
    })
}

function queueNewEntry(session: Session, entry: Entry, seed: number): void {
  const prefix = `${session.sessionId}:new:${entry.entryId}`
  session.queue.push(
    { taskId: `${prefix}:card`, kind: 'flashcard', entryId: entry.entryId, revealed: false },
    { taskId: `${prefix}:meaning`, kind: 'choose-meaning', entryId: entry.entryId,
      optionIds: shuffled(entry.meaningOptionEntryIds, seed + entry.introductionOrder) },
    { taskId: `${prefix}:cloze`, kind: 'cloze', entryId: entry.entryId, cycleKind: 'initial' },
  )
}

/** Introduce only the card actually reached; merely planning five cards does not count. */
function activateCurrent(state: AppState, now: string): void {
  const session = state.session!
  const task = session.queue[session.cursor]
  if (!task) {
    session.state = 'ended'
    session.endedAt = now
    return
  }
  if (task.kind === 'flashcard' && !state.progress[task.entryId]) {
    if (session.introducedEntryIds.length >= state.settings.maxNewPerSession) {
      throw new Error('سقف معرفی واژه‌های این جلسه پر شده است.')
    }
    state.progress[task.entryId] = {
      entryId: task.entryId, introducedAt: now, initialRecallPending: true,
      nextDueAt: null, intervalIndex: 0, lastSuccessDate: null,
      scheduledReviewDates: [], correctCount: 0, wrongCount: 0, pendingError: null,
    }
    session.introducedEntryIds.push(task.entryId)
  }
}

/** At a task boundary, overdue/recovery tasks precede a new, unopened card. */
function prepareBoundary(state: AppState, now: string): void {
  const session = state.session!
  const task = session.queue[session.cursor]
  const beforeNewCard = !task || task.kind === 'flashcard' && !state.progress[task.entryId]
  const remaining = session.queue.slice(session.cursor)
  const alreadyPlanned = new Set(remaining.flatMap(item => item.kind === 'match' ? [] : [item.entryId]))
  const recalls = orderedRecall(state, now)
    .filter(item => !alreadyPlanned.has(item.entryId) && (beforeNewCard || item.pendingError !== null))
    .map((item, index) => makeRecall(item, session, `boundary-${session.queue.length}-${index}`))
  session.queue.splice(session.cursor, 0, ...recalls)
  activateCurrent(state, now)
}

function start(state: AppState, command: Extract<LearningCommand, { type: 'start-session' }>, bundle: ContentBundle, now: string): void {
  if (state.session && state.session.state !== 'ended') {
    const session = state.session
    session.state = 'active'
    // Preserve the current prompt/draft; newly due items go after it and before unopened cards.
    const insertion = session.queue.findIndex((task, index) => index > session.cursor
      && task.kind === 'flashcard' && !state.progress[task.entryId])
    const at = insertion < 0 ? session.queue.length : insertion
    const queued = new Set(session.queue.slice(session.cursor).flatMap(task => task.kind === 'match' ? [] : [task.entryId]))
    const recalls = orderedRecall(state, now).filter(progress => !queued.has(progress.entryId))
    session.queue.splice(at, 0, ...recalls.map((progress, index) => makeRecall(progress, session, `resume-${session.queue.length}-${index}`)))
    return
  }
  const session: Session = {
    sessionId: command.sessionId, contentVersion: bundle.contentVersion, state: 'active',
    startedAt: now, endedAt: null, queue: [], cursor: 0,
    introducedEntryIds: [], draft: '', feedback: null,
  }
  state.session = session
  session.queue.push(...orderedRecall(state, now).map((progress, index) => makeRecall(progress, session, `start-${index}`)))
  const newEntries = bundle.entries.filter(entry => !state.progress[entry.entryId])
    .sort((a, b) => a.introductionOrder - b.introductionOrder).slice(0, state.settings.maxNewPerSession)
  for (const entry of newEntries) queueNewEntry(session, entry, command.seed)
  // This task appears only after their cards, never introduces an unseen word by itself.
  const matchPool = [...newEntries.map(entry => entry.entryId), ...Object.keys(state.progress)]
  const matchIds = [...new Set(matchPool)].slice(0, 4)
  if (matchIds.length === 4 && session.queue.length > 0) {
    let rightOrder = shuffled(matchIds, command.seed ^ 0x5b1a)
    const leftOrder = shuffled(matchIds, command.seed ^ 0x77ab)
    // Independent shuffles can coincide; still avoid a solved visual row alignment.
    if (rightOrder.every((id, index) => id === leftOrder[index])) rightOrder = [...rightOrder.slice(1), rightOrder[0]]
    session.queue.push({ taskId: `${session.sessionId}:match`, kind: 'match', entryIds: matchIds,
      leftOrder, rightOrder, matchedEntryIds: [] })
  }
  activateCurrent(state, now)
}

function markWrong(state: AppState, entryId: string, now: string): void {
  const session = state.session!
  const progress = state.progress[entryId]
  progress.wrongCount++
  progress.pendingError = { sessionId: session.sessionId, remainingOtherAnswers: 3, at: now }
  progress.intervalIndex = 0
  progress.scheduledReviewDates = []
  progress.nextDueAt = now
  // A preplanned immediate cloze cannot bypass the delayed recovery rule.
  session.queue = session.queue.filter((task, index) => index <= session.cursor
    || task.kind === 'match' || task.entryId !== entryId)
}

function markIndependentSuccess(progress: EntryProgress, task: Extract<SessionTask, { kind: 'cloze' }>, date: string, now: string): void {
  const recovery = progress.pendingError !== null || task.cycleKind === 'recovery'
  if (progress.initialRecallPending || recovery) {
    progress.initialRecallPending = false
    progress.pendingError = null
    progress.intervalIndex = 0
    progress.nextDueAt = new Date(Date.parse(now) + DAY).toISOString()
    progress.lastSuccessDate = date
    return
  }
  if (task.cycleKind === 'scheduled' && due(progress, now) && progress.lastSuccessDate !== date) {
    progress.intervalIndex = Math.min(progress.intervalIndex + 1, REVIEW_DAYS.length - 1)
    progress.nextDueAt = new Date(Date.parse(now) + REVIEW_DAYS[progress.intervalIndex] * DAY).toISOString()
    progress.lastSuccessDate = date
    if (!progress.scheduledReviewDates.includes(date)) progress.scheduledReviewDates.push(date)
  }
}

function answer(state: AppState, command: Extract<LearningCommand, { type: 'answer' }>, bundle: ContentBundle, now: string): boolean {
  const session = state.session!
  const task = session.queue[session.cursor]
  if (!task || task.kind === 'flashcard' || task.taskId !== command.taskId || session.feedback) return false
  const entries = entryMap(bundle)
  let entryId: string
  if (task.kind === 'match') {
    if (!command.entryId || !task.entryIds.includes(command.entryId) || !task.entryIds.includes(command.answer)
      || task.matchedEntryIds.includes(command.entryId) || task.matchedEntryIds.includes(command.answer)) return false
    entryId = command.entryId
    if (!state.progress[entryId] || !state.progress[command.answer]) return false
  } else {
    entryId = task.entryId
    if (task.kind === 'choose-meaning' && !task.optionIds.includes(command.answer)) return false
  }
  const entry = entries.get(entryId)!
  const correct = task.kind === 'cloze'
    ? entry.cloze.acceptedAnswers.some(value => normalizeAnswer(value) === normalizeAnswer(command.answer))
    : command.answer === entryId
  const independent = task.kind === 'cloze'
  const date = studyDate(now, state.settings.studyTimeZone)
  state.attempts.push({ attemptId: command.attemptId, sessionId: session.sessionId,
    taskId: task.taskId, entryId, exercise: task.kind, answer: command.answer,
    correct, independent, at: now, studyDate: date })
  // Only answers to other entries count toward an error's spacing.
  for (const progress of Object.values(state.progress)) {
    if (progress.entryId !== entryId && progress.pendingError?.sessionId === session.sessionId) {
      progress.pendingError.remainingOtherAnswers = Math.max(0, progress.pendingError.remainingOtherAnswers - 1)
    }
  }
  if (correct) {
    state.progress[entryId].correctCount++
    if (task.kind === 'match') task.matchedEntryIds.push(entryId)
    if (task.kind === 'cloze') markIndependentSuccess(state.progress[entryId], task, date, now)
  } else markWrong(state, entryId, now)
  session.feedback = {
    attemptId: command.attemptId, entryId, correct,
    expectedAnswer: task.kind === 'cloze' ? entry.cloze.acceptedAnswers[0] : entry.meaningFa,
    explanationFa: correct
      ? independent ? 'یادآوری شما ثبت شد؛ زمان مرور بعدی بر اساس برنامهٔ مرور تعیین می‌شود.'
        : 'این ارتباط درست است. برای مرور فاصله‌دار، یادآوری در جای خالی هم لازم است.'
      : `«${entry.lemma}» یعنی «${entry.meaningFa}». بعد از چند پاسخ به واژه‌های دیگر، دوباره تمرینش می‌کنیم.`,
  }
  return true
}

export function transition(state: AppState, command: LearningCommand, bundle: ContentBundle, now: string): AppState {
  if (!Number.isFinite(Date.parse(now))) throw new Error('زمان مطالعه معتبر نیست.')
  if (state.contentVersion !== bundle.contentVersion || state.schemaVersion !== SCHEMA_VERSION
    || state.learningPolicyVersion !== POLICY_VERSION) throw new Error('نسخهٔ داده با برنامه سازگار نیست؛ داده‌های قبلی حفظ شده‌اند.')
  // Retry after a successful commit is idempotent, even if the prompt has moved on.
  if (command.type === 'answer' && state.attempts.some(item => item.attemptId === command.attemptId)) return state
  const next = structuredClone(state)
  if (command.type === 'start-session') {
    if (!command.sessionId || !Number.isFinite(command.seed)) return state
    start(next, command, bundle, now)
  } else {
    const session = next.session
    if (!session || session.state === 'ended') return state
    if (command.type === 'pause') {
      if (session.state === 'paused') return state
      session.state = 'paused'
    } else if (command.type === 'end-session') {
      session.state = 'ended'
      session.endedAt = now
    } else {
      if (session.state !== 'active') return state
      const task = session.queue[session.cursor]
      if (!task || task.taskId !== command.taskId) return state
      if (command.type === 'reveal-card') {
        if (task.kind !== 'flashcard' || task.revealed) return state
        task.revealed = true
      } else if (command.type === 'draft') {
        if (task.kind !== 'cloze' || session.feedback || session.draft === command.value) return state
        session.draft = command.value
      } else if (command.type === 'answer') {
        if (!command.attemptId || !answer(next, command, bundle, now)) return state
      } else if (command.type === 'next') {
        if (task.kind === 'flashcard' ? !task.revealed : !session.feedback) return state
        const stayOnMatch = task.kind === 'match' && task.matchedEntryIds.length < 4
        session.feedback = null
        session.draft = ''
        if (!stayOnMatch) {
          session.cursor++
          prepareBoundary(next, now)
        }
      }
    }
  }
  next.revision = state.revision + 1
  return next
}

export function getEntryStatus(state: AppState, entryId: string, now: string): EntryStatus {
  const progress = state.progress[entryId]
  if (!progress) return 'new'
  return progress.pendingError || due(progress, now) ? 'due' : 'learning'
}

function nearestDue(state: AppState): string | null {
  return Object.values(state.progress).flatMap(progress => progress.nextDueAt ? [progress.nextDueAt] : [])
    .sort()[0] ?? null
}

export function getHomeStats(state: AppState, bundle: ContentBundle, now: string): HomeStats {
  return {
    introduced: bundle.entries.filter(entry => state.progress[entry.entryId]).length,
    due: Object.values(state.progress).filter(progress => getEntryStatus(state, progress.entryId, now) === 'due').length,
    newCount: bundle.entries.filter(entry => !state.progress[entry.entryId]).length,
    correct: state.attempts.filter(attempt => attempt.correct).length,
    totalAnswers: state.attempts.length, nextDueAt: nearestDue(state),
  }
}

export function summarizeSession(state: AppState, now: string): SessionSummary {
  const session = state.session
  const attempts = state.attempts.filter(attempt => attempt.sessionId === session?.sessionId)
  const practicedIds = [...new Set(attempts.map(attempt => attempt.entryId))]
  return {
    practiced: practicedIds.length, introduced: session?.introducedEntryIds.length ?? 0,
    correct: attempts.filter(attempt => attempt.correct).length, totalAnswers: attempts.length,
    needsReview: practicedIds.filter(id => getEntryStatus(state, id, now) === 'due').length,
    remaining: session ? new Set(session.queue.slice(session.cursor).flatMap(task => task.kind === 'match'
      ? task.entryIds.filter(id => !task.matchedEntryIds.includes(id)) : [task.entryId])).size : 0,
    nextDueAt: nearestDue(state),
  }
}
