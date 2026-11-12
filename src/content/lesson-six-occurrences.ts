import type { ContentBundle, SourceRef } from '../contracts/index.ts'
import { lessonSixSharedWords } from './lesson-six-source.ts'

/** Include earlier/later lesson words in this vocabulary list without duplicating progress or new-word counts. */
export function attachLessonSixOccurrences(bundle: ContentBundle): ContentBundle {
  const shared = new Map(lessonSixSharedWords.map(row => [row.entryId as string, row]))
  const references: SourceRef[] = lessonSixSharedWords.map(row => ({
    sourceRefId: `${row.entryId}-occurrence-lesson-06`, sourceId: 'source-textbook',
    lessonId: 'lesson-06', locator: row.locator,
  }))
  return {
    ...bundle,
    sourceRefs: [...bundle.sourceRefs, ...references],
    entries: bundle.entries.map(entry => {
      if (!shared.has(entry.entryId)) return entry
      const ref = references.find(ref => ref.sourceRefId === `${entry.entryId}-occurrence-lesson-06`)!
      return { ...entry, sourceRefIds: [...entry.sourceRefIds, ref.sourceRefId],
        occurrences: [...entry.occurrences, { lessonId: 'lesson-06', sourceRefIds: [ref.sourceRefId] }] }
    }),
  }
}
