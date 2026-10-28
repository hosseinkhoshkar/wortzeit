import { POLICY_VERSION, SCHEMA_VERSION, TARGET_ACTIVE_MS } from '../contracts/index.ts'
import type { AppState, ContentBundle, Session, SkillProgress } from '../contracts/index.ts'
import type { ContentBundle as LegacyBundle } from '../contracts/legacy-v1.ts'
import { validateLegacyState } from './legacy-v1.ts'
import { emptySkill } from '../learning/schedule.ts'
import { validateVersionTwoState } from './legacy-v2.ts'

export const DATABASE_NAME = 'wortzeit-progress'
export const STORE_NAME = 'user-state'
const STATE_KEY = 'current'

export class StorageError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'StorageError'
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}
function integer(value: unknown, min = 0, max = Number.MAX_SAFE_INTEGER): boolean {
  return typeof value === 'number' && Number.isInteger(value) && value >= min && value <= max
}

/** Keep the version-two evidence checks and validate each lesson session independently. */
export function validateState(value: unknown, bundle: ContentBundle): asserts value is AppState {
  const fail = (): never => { throw new StorageError('اطلاعات ذخیره‌شده ناقص یا ناسازگار است. داده‌های قبلی حفظ شده‌اند؛ حافظهٔ سایت را پاک نکنید.') }
  const lessons = bundle.lessons ?? [bundle.lesson]
  const lessonIds = new Set(lessons.map(lesson => lesson.lessonId))
  if (!isRecord(value) || value.schemaVersion !== SCHEMA_VERSION
    || typeof value.activeLessonId !== 'string' || !lessonIds.has(value.activeLessonId)
    || !isRecord(value.savedSessions)) fail()
  const state = value as unknown as AppState
  const checkVersionTwo = (session: Session | null) => {
    try { validateVersionTwoState({ ...state, schemaVersion: 2, session }, bundle) } catch { fail() }
  }
  checkVersionTwo(state.session)
  const sessionIds = new Set<string>()
  const entryLesson = new Map(bundle.entries.map(entry => [entry.entryId, entry.introducedInLessonId]))
  function checkSession(session: Session, lessonId: string, archived: boolean): void {
    if (!isRecord(session) || session.lessonId !== lessonId || !lessonIds.has(lessonId)
      || sessionIds.has(session.sessionId) || archived && session.state === 'active') fail()
    sessionIds.add(session.sessionId)
    checkVersionTwo(session)
    const inLesson = (id: string) => entryLesson.get(id) === lessonId
    if (session.introducedEntryIds.some(id => !inLesson(id))) fail()
    for (const task of session.queue) {
      const ids = task.kind === 'match' ? task.entryIds
        : task.kind === 'choose-meaning' ? [task.entryId, ...task.optionIds] : [task.entryId]
      if (ids.some(id => !inLesson(id))) fail()
    }
    if (state.attempts.some(attempt => attempt.sessionId === session.sessionId && !inLesson(attempt.entryId))) fail()
  }
  if (state.session) checkSession(state.session, state.activeLessonId, false)
  for (const [lessonId, session] of Object.entries(state.savedSessions)) {
    if (lessonId === state.activeLessonId || !lessonIds.has(lessonId)) fail()
    checkSession(session, lessonId, true)
  }
}

function lessonOneBundle(bundle: ContentBundle): ContentBundle {
  const lesson = (bundle.lessons ?? [bundle.lesson]).find(item => item.lessonId === 'a1-lesson-01')
  if (!lesson) throw new StorageError('نسخهٔ قدیمی به درس اول نیاز دارد؛ اطلاعات قبلی حفظ شده‌اند.')
  const entries = bundle.entries.filter(entry => entry.introducedInLessonId === lesson.lessonId)
  return { ...bundle, lessons: undefined, lesson, entries,
    sourceRefs: bundle.sourceRefs.filter(ref => ref.lessonId === lesson.lessonId), contentVersion: 'lesson-01-excerpt-v2' }
}

export function migrateState(value: unknown, bundle: ContentBundle): AppState {
  if (isRecord(value) && value.schemaVersion === SCHEMA_VERSION) {
    if (value.contentVersion === bundle.contentVersion) {
      validateState(value, bundle)
      return structuredClone(value)
    }
    if (value.contentVersion !== 'lesson-01-excerpt-v2' || bundle.contentVersion !== 'course-a1-lessons-01-04-v1') {
      throw new StorageError('نسخهٔ محتوا شناخته‌شده نیست؛ اطلاعات قبلی حفظ شده‌اند.')
    }
    validateState(value, lessonOneBundle(bundle))
    const next = structuredClone(value)
    next.contentVersion = bundle.contentVersion
    next.revision++
    if (next.session) next.session.contentVersion = bundle.contentVersion
    for (const session of Object.values(next.savedSessions)) session.contentVersion = bundle.contentVersion
    validateState(next, bundle)
    return next
  }
  if (isRecord(value) && value.schemaVersion === 2) {
    const originalBundle = lessonOneBundle(bundle)
    try { validateVersionTwoState(value, originalBundle) } catch {
      throw new StorageError('اطلاعات نسخهٔ قبلی ناقص یا ناسازگار است؛ اطلاعات قبلی حفظ شده‌اند.')
    }
    const old = structuredClone(value)
    const next: AppState = {
      ...old, schemaVersion: SCHEMA_VERSION, contentVersion: bundle.contentVersion, revision: old.revision + 1,
      activeLessonId: originalBundle.lesson.lessonId, savedSessions: {},
      session: old.session ? { ...old.session, lessonId: originalBundle.lesson.lessonId, contentVersion: bundle.contentVersion } : null,
    }
    validateState(next, bundle)
    return next
  }
  const originalBundle = lessonOneBundle(bundle)
  const legacyBundle: LegacyBundle = {
    ...originalBundle, contentVersion: 'lesson-01-excerpt-v1',
    entries: originalBundle.entries.map(entry => ({ ...entry, enabledExercises: entry.enabledExercises.filter(kind =>
      kind === 'flashcard' || kind === 'choose-meaning' || kind === 'cloze' || kind === 'match') })),
  }
  // The prior reader is deliberately strict; no unknown version/content is reset.
  validateLegacyState(value, legacyBundle)
  const legacy = structuredClone(value)
  const previousWrongMatch = new Set<string>()
  const attempts: AppState['attempts'] = legacy.attempts.map(attempt => {
    const key = JSON.stringify([attempt.sessionId, attempt.taskId, attempt.entryId])
    const assisted = attempt.exercise === 'match' && previousWrongMatch.has(key)
    if (attempt.exercise === 'match' && !attempt.correct) previousWrongMatch.add(key)
    return { ...attempt, assisted, normalizationVersion: 'answer-normalization-v1' }
  })
  const next: AppState = {
    ...legacy, schemaVersion: SCHEMA_VERSION, learningPolicyVersion: POLICY_VERSION,
    contentVersion: bundle.contentVersion, revision: legacy.revision + 1,
    activeLessonId: originalBundle.lesson.lessonId, savedSessions: {},
    settings: { ...legacy.settings, targetActiveMs: TARGET_ACTIVE_MS },
    attempts,
    progress: {}, session: legacy.session ? { ...legacy.session, contentVersion: bundle.contentVersion, lessonId: originalBundle.lesson.lessonId,
      feedback: legacy.session.feedback ? { ...legacy.session.feedback,
        assisted: attempts.find(attempt => attempt.attemptId === legacy.session!.feedback!.attemptId)!.assisted } : null,
      activeMs: 0, targetAcknowledged: false, targetAcknowledgedDate: null } : null,
    assistanceEvents: [], dailyActivity: {}, activityEventIds: [],
  }
  for (const [id, progress] of Object.entries(legacy.progress)) {
    const entry = bundle.entries.find(item => item.entryId === id)!
    const skills = { meaning: emptySkill(), writing: emptySkill(), article: entry.partOfSpeech === 'noun' ? emptySkill() : null }
    for (const attempt of next.attempts.filter(item => item.entryId === id)) {
      const skill: SkillProgress = attempt.exercise === 'cloze' ? skills.writing : skills.meaning
      if (attempt.correct) { skill.correct++; if (!attempt.assisted) skill.unassistedCorrect++ }
      else skill.wrong++
      if (attempt.assisted) skill.assisted++
      skill.lastAttemptAt = attempt.at
    }
    next.progress[id] = { ...progress, pendingError: progress.pendingError ? { ...progress.pendingError, reason: 'wrong-answer' } : null, skills }
  }
  validateState(next, bundle)
  return next
}

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new StorageError('ذخیرهٔ محلی در این مرورگر در دسترس نیست.'))
      return
    }
    const request = indexedDB.open(DATABASE_NAME, 1)
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(STORE_NAME)) request.result.createObjectStore(STORE_NAME)
    }
    request.onsuccess = () => {
      request.result.onversionchange = () => request.result.close()
      resolve(request.result)
    }
    request.onerror = () => reject(new StorageError('بازکردن حافظهٔ محلی ممکن نشد؛ اطلاعات قبلی حذف نشده‌اند.'))
    request.onblocked = () => reject(new StorageError('یک تب دیگر دسترسی به حافظه را نگه داشته است؛ آن تب را ببندید و دوباره تلاش کنید.'))
  })
}

export async function loadState(bundle: ContentBundle): Promise<AppState | null> {
  const database = await openDatabase()
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, 'readwrite')
    const store = transaction.objectStore(STORE_NAME)
    const request = store.get(STATE_KEY)
    let restored: AppState | null = null
    let failure: unknown = null
    request.onsuccess = () => {
      try {
        if (request.result === undefined) return
        restored = migrateState(request.result, bundle)
        if (restored.revision !== request.result.revision) store.put(restored, STATE_KEY)
      } catch (error) { failure = error; transaction.abort() }
    }
    transaction.oncomplete = () => {
      database.close()
      // A current-version load is read-only in effect and does not change its revision.
      if (restored?.session?.state === 'active') restored.session.state = 'paused'
      resolve(restored)
    }
    transaction.onerror = transaction.onabort = () => {
      database.close()
      reject(failure ?? new StorageError('بازیابی پیشرفت ممکن نشد؛ اطلاعات قبلی حفظ شده‌اند.'))
    }
  })
}

/** Atomically commits answers, schedule, feedback and cursor in one snapshot. */
export async function saveState(state: AppState, expectedRevision: number): Promise<void> {
  if (!integer(expectedRevision) || state.revision !== expectedRevision + 1) {
    throw new StorageError('ترتیب ذخیره‌سازی معتبر نیست؛ برنامه را دوباره باز کنید.')
  }
  const database = await openDatabase()
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, 'readwrite')
    const store = transaction.objectStore(STORE_NAME)
    const request = store.get(STATE_KEY)
    let conflict = false
    request.onsuccess = () => {
      const current = request.result as AppState | undefined
      if (current ? current.revision !== expectedRevision || current.schemaVersion !== SCHEMA_VERSION
        || current.contentVersion !== state.contentVersion || current.learningPolicyVersion !== POLICY_VERSION : expectedRevision !== 0) {
        conflict = true
        transaction.abort()
        return
      }
      store.put(state, STATE_KEY)
    }
    transaction.oncomplete = () => { database.close(); resolve() }
    transaction.onerror = transaction.onabort = () => {
      database.close()
      reject(new StorageError(conflict
        ? 'پیشرفت در تب دیگری تغییر کرده است. این صفحه را تازه کنید تا آخرین وضعیت بازیابی شود.'
        : 'ذخیره انجام نشد. پاسخ شما هنوز ثبت نشده؛ با همان پاسخ دوباره تلاش کنید.'))
    }
  })
}
