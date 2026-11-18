import type { ContentBundle } from '../contracts/index.ts'
import { lessonSixCoursebookRows } from './lesson-six-coursebook.ts'

/** Keep every historical identity and source; only the current study/display scope changes. */
export function withLessonSixCurriculum(bundle: ContentBundle): ContentBundle {
  const available = new Set(bundle.entries.map(entry => entry.entryId))
  const rows = lessonSixCoursebookRows.filter(row => available.has(row.entryId))
  const vocabularyEntryIds = rows.map(row => row.entryId as string)
  const studyEntryIds = vocabularyEntryIds.filter(id => bundle.entries.some(entry => entry.entryId === id && entry.introducedInLessonId === 'lesson-06'))
  const update = (lesson: ContentBundle['lesson']) => lesson.lessonId === 'lesson-06'
    ? { ...lesson, studyEntryIds, vocabularyEntryIds } : lesson
  const sourceRefs = rows.map(row => ({ sourceRefId: `${row.entryId}-coursebook-lesson-06`,
    sourceId: 'source-textbook', lessonId: 'lesson-06', locator: row.sourceLocator }))
  const refsByEntry = new Map(rows.map((row, index) => [row.entryId as string, sourceRefs[index]]))
  return { ...bundle, lesson: update(bundle.lesson), lessons: bundle.lessons?.map(update),
    sourceRefs: [...bundle.sourceRefs, ...sourceRefs],
    entries: bundle.entries.map(entry => {
      const ref = refsByEntry.get(entry.entryId)
      if (!ref) return entry
      return { ...entry, sourceRefIds: [...entry.sourceRefIds, ref.sourceRefId], occurrences: entry.occurrences.map(occurrence =>
        occurrence.lessonId === 'lesson-06' ? { ...occurrence, sourceRefIds: [...occurrence.sourceRefIds, ref.sourceRefId] } : occurrence) }
    }) }
}
