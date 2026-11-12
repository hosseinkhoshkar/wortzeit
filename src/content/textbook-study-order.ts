import type { ContentBundle } from '../contracts/index.ts'

export function withTextbookStudyOrder(bundle: ContentBundle, existingEntryCount?: number): ContentBundle {
  const textbookIds = new Set(bundle.sources.filter(source => source.kind === 'textbook').map(source => source.sourceId))
  const pages = new Map<string, number>()
  for (const ref of bundle.sourceRefs) {
    if (ref.lessonId !== bundle.lesson.lessonId || !textbookIds.has(ref.sourceId)) continue
    const page = /چاپی (\d+)(?:\s|$)/u.exec(ref.locator)
    if (page) pages.set(ref.sourceRefId, Number(page[1]))
  }
  // Stable sorting keeps source order on the same page and for entries without a textbook page.
  const originalEntries = existingEntryCount === undefined ? bundle.entries : bundle.entries.slice(0, existingEntryCount)
  const ordered = originalEntries.map(entry => ({
    entryId: entry.entryId,
    page: Math.min(Number.MAX_SAFE_INTEGER, ...entry.sourceRefIds.map(id => pages.get(id) ?? Number.MAX_SAFE_INTEGER)),
  })).sort((a, b) => a.page - b.page)
  // An audited expansion may append words without moving any existing study position.
  const ids = [...ordered.map(({ entryId }) => entryId), ...(existingEntryCount === undefined ? [] : bundle.entries.slice(existingEntryCount).map(entry => entry.entryId))]
  const rank = new Map(ids.map((entryId, index) => [entryId, index + 1]))
  return {
    ...bundle,
    lesson: { ...bundle.lesson, introducedEntryIds: [...rank.keys()] },
    entries: bundle.entries.map(entry => ({ ...entry, introductionOrder: rank.get(entry.entryId)! })),
  }
}
