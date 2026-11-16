import { grammarQuestions } from '../content/grammar-catalog.ts'

export const GRAMMAR_BATCH_SIZE = 5
export interface GrammarAttempt {
  attemptId: string
  sessionId: string
  questionId: string
  option: string
  correct: boolean
  at: string
}
export interface GrammarSession {
  sessionId: string
  lessonId: string
  state: 'active' | 'paused' | 'ended'
  startedAt: string
  activeMs: number
  cursor: number
  items: { questionId: string; options: string[] }[]
}
export interface GrammarState {
  version: 1
  attempts: GrammarAttempt[]
  session: GrammarSession | null
  savedSessions?: Record<string, GrammarSession>
}
export type GrammarCommand =
  | { type: 'grammar-start'; lessonId: string; sessionId: string; seed: number }
  | { type: 'grammar-answer'; sessionId: string; questionId: string; attemptId: string; option: string }
  | { type: 'grammar-next'; sessionId: string; questionId: string }
  | { type: 'grammar-pause' }

export function isGrammarCommand(command: { type: string }): command is GrammarCommand {
  return command.type === 'grammar-start' || command.type === 'grammar-answer'
    || command.type === 'grammar-next' || command.type === 'grammar-pause'
}
function shuffle<T>(values: readonly T[], seed: number): T[] {
  const result = [...values]
  let value = seed >>> 0
  for (let index = result.length - 1; index > 0; index--) {
    value = (Math.imul(value, 1664525) + 1013904223) >>> 0
    const target = value % (index + 1)
    ;[result[index], result[target]] = [result[target], result[index]]
  }
  return result
}
export function grammarFeedback(state: GrammarState | undefined): GrammarAttempt | undefined {
  const session = state?.session
  const item = session?.items[session.cursor]
  return item ? state!.attempts.find(attempt => attempt.sessionId === session!.sessionId && attempt.questionId === item.questionId) : undefined
}
export function grammarStats(state: GrammarState | undefined, lessonId = 'a1-lesson-01') {
  const questions = grammarQuestions.filter(question => question.lessonId === lessonId)
  const attempts = (state?.attempts ?? []).filter(attempt => questions.some(question => question.questionId === attempt.questionId))
  const last = new Map(attempts.map(attempt => [attempt.questionId, attempt]))
  return { answered: last.size, total: questions.length,
    correct: attempts.filter(attempt => attempt.correct).length, attempts: attempts.length,
    mistakes: [...last.values()].filter(attempt => !attempt.correct).length }
}
export function applyGrammar(state: GrammarState | undefined, command: GrammarCommand, now: string): GrammarState | undefined {
  if (!Number.isFinite(Date.parse(now))) return state
  if (command.type === 'grammar-start') {
    const questions = grammarQuestions.filter(question => question.lessonId === command.lessonId)
    if (!questions.length || !command.sessionId || !Number.isFinite(command.seed)) return state
    const savedSessions = { ...state?.savedSessions }
    const current = state?.session
    const target = current?.lessonId === command.lessonId ? current : savedSessions[command.lessonId]
    if (current && current.lessonId !== command.lessonId) {
      savedSessions[current.lessonId] = { ...current, state: current.state === 'active' ? 'paused' : current.state }
    }
    delete savedSessions[command.lessonId]
    if (target && target.state !== 'ended') {
      if (current === target && target.state === 'active') return state
      return { ...state!, savedSessions, session: { ...target, state: 'active' } }
    }
    if (current?.sessionId === command.sessionId || Object.values(savedSessions).some(session => session.sessionId === command.sessionId)
      || state?.attempts.some(attempt => attempt.sessionId === command.sessionId)) return state
    const attempts = state?.attempts ?? []
    const last = new Map(attempts.map(attempt => [attempt.questionId, attempt]))
    const priority = (id: string) => !last.has(id) ? 1 : last.get(id)!.correct ? 2 : 0
    const selected = shuffle(questions, command.seed)
      .sort((a, b) => priority(a.questionId) - priority(b.questionId))
      .slice(0, GRAMMAR_BATCH_SIZE)
    return { version: 1, attempts: [...attempts], savedSessions,
      session: { sessionId: command.sessionId, lessonId: command.lessonId, state: 'active', startedAt: now,
        activeMs: 0, cursor: 0, items: selected.map((question, index) => ({
          questionId: question.questionId, options: shuffle(question.options, command.seed + index + 1),
        })) } }
  }
  const session = state?.session
  if (!state || !session || session.state !== 'active') return state
  if (command.type === 'grammar-pause') return { ...state, session: { ...session, state: 'paused' } }
  const item = session.items[session.cursor]
  if (!item || command.sessionId !== session.sessionId || command.questionId !== item.questionId) return state
  const feedback = grammarFeedback(state)
  if (command.type === 'grammar-answer') {
    if (feedback || !command.attemptId || state.attempts.some(attempt => attempt.attemptId === command.attemptId)
      || !item.options.includes(command.option) || Date.parse(now) < Date.parse(session.startedAt)) return state
    const question = grammarQuestions.find(question => question.questionId === item.questionId)!
    return { ...state, attempts: [...state.attempts, { attemptId: command.attemptId, sessionId: session.sessionId,
      questionId: question.questionId, option: command.option, correct: command.option === question.answer, at: now }] }
  }
  if (!feedback) return state
  const cursor = session.cursor + 1
  return { ...state, session: { ...session, cursor, state: cursor === session.items.length ? 'ended' : 'active' } }
}

function record(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}
function validTime(value: unknown): value is string {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T/u.test(value) && Number.isFinite(Date.parse(value))
}
/** Invalid grammar never causes the caller to discard an otherwise intact vocabulary save. */
export function validateGrammar(value: unknown): boolean {
  if (value === undefined) return true
  if (!record(value) || value.version !== 1 || !Array.isArray(value.attempts)) return false
  const ids = new Set<string>(), answered = new Set<string>()
  for (const attempt of value.attempts) {
    if (!record(attempt) || typeof attempt.attemptId !== 'string' || !attempt.attemptId || ids.has(attempt.attemptId)
      || typeof attempt.sessionId !== 'string' || !attempt.sessionId || !validTime(attempt.at)) return false
    const question = grammarQuestions.find(question => question.questionId === attempt.questionId)
    if (!question || typeof attempt.option !== 'string' || !question.options.includes(attempt.option)
      || attempt.correct !== (attempt.option === question.answer)) return false
    const key = JSON.stringify([attempt.sessionId, attempt.questionId])
    if (answered.has(key)) return false
    answered.add(key); ids.add(attempt.attemptId)
  }
  if (value.savedSessions !== undefined && !record(value.savedSessions)) return false
  const sessions = [value.session, ...Object.values((value.savedSessions ?? {}) as Record<string, unknown>)]
  const sessionIds = new Set<string>(), lessonIds = new Set<string>()
  for (const [key, saved] of Object.entries(value.savedSessions ?? {})) {
    if (!record(saved) || saved.lessonId !== key || saved.state === 'active') return false
  }
  for (const session of sessions) {
    if (session === null) continue
    if (!record(session) || typeof session.sessionId !== 'string' || !session.sessionId
      || typeof session.lessonId !== 'string' || !grammarQuestions.some(question => question.lessonId === session.lessonId)
      || sessionIds.has(session.sessionId) || lessonIds.has(session.lessonId)
      || !['active', 'paused', 'ended'].includes(String(session.state)) || !validTime(session.startedAt)
      || typeof session.activeMs !== 'number' || !Number.isFinite(session.activeMs) || session.activeMs < 0
      || !Array.isArray(session.items) || session.items.length !== GRAMMAR_BATCH_SIZE
      || typeof session.cursor !== 'number' || !Number.isInteger(session.cursor) || session.cursor < 0 || session.cursor > session.items.length
      || (session.state === 'ended') !== (session.cursor === session.items.length)) return false
    sessionIds.add(session.sessionId); lessonIds.add(session.lessonId)
    const questions = new Set<string>()
    for (const [index, item] of session.items.entries()) {
      if (!record(item)) return false
      const question = grammarQuestions.find(question => question.questionId === item.questionId)
      if (!question || question.lessonId !== session.lessonId || questions.has(question.questionId)
        || !Array.isArray(item.options) || item.options.length !== 4 || new Set(item.options).size !== 4
        || item.options.some(option => !question.options.includes(option))) return false
      questions.add(question.questionId)
      const key = JSON.stringify([session.sessionId, question.questionId])
      if (index < session.cursor && !answered.has(key) || index > session.cursor && answered.has(key)) return false
    }
    const relevant = value.attempts.filter(attempt => attempt.sessionId === session.sessionId)
    if (relevant.some(attempt => !questions.has(attempt.questionId) || Date.parse(attempt.at) < Date.parse(String(session.startedAt)))) return false
  }
  // A historical session cannot mix questions from different lessons.
  const historicalLessons = new Map<string, string>()
  for (const attempt of value.attempts) {
    const lessonId = grammarQuestions.find(question => question.questionId === attempt.questionId)!.lessonId
    if (historicalLessons.has(attempt.sessionId) && historicalLessons.get(attempt.sessionId) !== lessonId) return false
    historicalLessons.set(attempt.sessionId, lessonId)
  }
  return true
}
