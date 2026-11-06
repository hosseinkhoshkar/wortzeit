export function textbookStudyOrder(rows: readonly { entryId: string; refs: readonly string[] }[]): Map<string, number> {
  // Stable sorting keeps source order on the same page and for entries without a textbook page.
  return new Map(rows.map(row => {
    const pages = row.refs.flatMap(locator => {
      const page = /^کتاب درسی: PDF \d+، چاپی (\d+)$/u.exec(locator)
      return page ? [Number(page[1])] : []
    })
    return { entryId: row.entryId, page: Math.min(Number.MAX_SAFE_INTEGER, ...pages) }
  }).sort((a, b) => a.page - b.page).map(({ entryId }, index) => [entryId, index + 1]))
}
