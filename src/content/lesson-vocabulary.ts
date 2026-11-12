import type { ContentBundle, Entry } from '../contracts/index.ts'

/** Study entries keep their existing order; shared occurrences append with the same ID and progress. */
export function lessonVocabularyEntries(bundle: ContentBundle, lessonId: string): Entry[] {
  return [
    ...bundle.entries.filter(entry => entry.introducedInLessonId === lessonId).sort((a, b) => a.introductionOrder - b.introductionOrder),
    ...bundle.entries.filter(entry => entry.introducedInLessonId !== lessonId && entry.occurrences.some(occurrence => occurrence.lessonId === lessonId)),
  ]
}
