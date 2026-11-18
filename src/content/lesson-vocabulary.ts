import type { ContentBundle, Entry } from '../contracts/index.ts'

/** Resolve a current curriculum without deleting identities used by saved sessions. */
export function lessonStudyEntries(bundle: ContentBundle, lessonId: string): Entry[] {
  const lesson = (bundle.lessons ?? [bundle.lesson]).find(lesson => lesson.lessonId === lessonId)
  const entries = bundle.entries.filter(entry => entry.introducedInLessonId === lessonId)
  if (!lesson?.studyEntryIds) return entries.sort((a, b) => a.introductionOrder - b.introductionOrder)
  const byId = new Map(entries.map(entry => [entry.entryId, entry]))
  return lesson.studyEntryIds.map(id => byId.get(id)!).filter(Boolean)
}

/** Shared occurrences retain the same ID/progress and can be interleaved by textbook page. */
export function lessonVocabularyEntries(bundle: ContentBundle, lessonId: string): Entry[] {
  const lesson = (bundle.lessons ?? [bundle.lesson]).find(lesson => lesson.lessonId === lessonId)
  if (lesson?.vocabularyEntryIds) {
    const byId = new Map(bundle.entries.map(entry => [entry.entryId, entry]))
    return lesson.vocabularyEntryIds.map(id => byId.get(id)!).filter(Boolean)
  }
  return [
    ...lessonStudyEntries(bundle, lessonId),
    ...bundle.entries.filter(entry => entry.introducedInLessonId !== lessonId && entry.occurrences.some(occurrence => occurrence.lessonId === lessonId)),
  ]
}
