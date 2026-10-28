import type { ContentBundle } from '../contracts/index.ts'

// Alternatives have been reviewed for this fixed excerpt. An arbitrary spelling
// variation or inflection cannot become an accepted answer by passing shape QA.
const approvedAlternativeByCanonical: Record<string, readonly string[]> = {
  Tschüss: ['Tschuess'],
  heißen: ['heissen'],
}

function validAcceptedAnswers(answers: string[], canonical: string): boolean {
  return answers.length > 0 && answers[0] === canonical
    && new Set(answers).size === answers.length
    && answers.every((answer, index) => answer.trim() === answer && answer === answer.normalize('NFC')
      && answer.length > 0 && (index === 0 || (approvedAlternativeByCanonical[canonical] ?? []).includes(answer)))
}

/** Fail before showing an exercise when its data is incomplete or inconsistent. */
export function validateContent(bundle: ContentBundle): string[] {
  const errors: string[] = []
  const ids = bundle.entries.map((entry) => entry.entryId)
  const byId = new Map(bundle.entries.map((entry) => [entry.entryId, entry]))
  const sourceIds = new Set(bundle.sources.map((source) => source.sourceId))
  const refIds = new Set(bundle.sourceRefs.map((ref) => ref.sourceRefId))
  const lessonId = bundle.lesson.lessonId
  if (!bundle.contentVersion || bundle.entries.length !== 20) errors.push('The active excerpt requires exactly 20 entries and a content version.')
  if (new Set(ids).size !== ids.length) errors.push('Duplicate entry ID.')
  if (new Set(bundle.sources.map((source) => source.sourceId)).size !== bundle.sources.length) errors.push('Duplicate source ID.')
  if (refIds.size !== bundle.sourceRefs.length) errors.push('Duplicate source reference ID.')
  if (bundle.lesson.coverage !== 'partial' || bundle.provenance.reviewStatus !== 'excerpt-checked' || !bundle.provenance.noteFa) errors.push('Excerpt coverage or review status is missing.')
  if (new Set(bundle.lesson.introducedEntryIds).size !== ids.length || bundle.lesson.introducedEntryIds.length !== ids.length || ids.some((id) => !bundle.lesson.introducedEntryIds.includes(id))) errors.push('Introduction IDs must cover each entry once.')
  const orders = bundle.entries.map((entry) => entry.introductionOrder)
  if (new Set(orders).size !== ids.length || orders.some((order) => !Number.isInteger(order) || order < 1 || order > ids.length)) errors.push('Introduction order must be unique and contiguous.')
  for (const ref of bundle.sourceRefs) {
    if (!sourceIds.has(ref.sourceId) || ref.lessonId !== lessonId || !ref.locator.trim()) errors.push(`Broken source reference: ${ref.sourceRefId}`)
  }
  for (const entry of bundle.entries) {
    const at = entry.entryId
    if (!at || !entry.lemma.trim() || !entry.meaningFa.trim() || entry.introducedInLessonId !== lessonId || entry.reviewStatus !== 'excerpt-checked') errors.push(`Incomplete entry: ${at}`)
    if (!entry.sourceRefIds.length || new Set(entry.sourceRefIds).size !== entry.sourceRefIds.length || entry.sourceRefIds.some((id) => !refIds.has(id))) errors.push(`Broken entry source refs: ${at}`)
    if (!entry.occurrences.length || entry.occurrences.some((occurrence) => occurrence.lessonId !== lessonId || !occurrence.sourceRefIds.length || occurrence.sourceRefIds.some((id) => !entry.sourceRefIds.includes(id))) || entry.sourceRefIds.some((id) => !entry.occurrences.some((occurrence) => occurrence.sourceRefIds.includes(id)))) errors.push(`Broken occurrences: ${at}`)
    if (entry.partOfSpeech === 'noun') {
      if (!entry.nounData || !['der', 'die', 'das'].includes(entry.nounData.article) || (entry.nounData.plural === null && !entry.nounData.pluralNote.trim())) errors.push(`Incomplete noun data: ${at}`)
    } else if (entry.nounData) errors.push(`Non-noun has article data: ${at}`)
    const hasArticleExercise = entry.enabledExercises.includes('choose-article')
    if (hasArticleExercise !== Boolean(entry.partOfSpeech === 'noun' && entry.nounData && ['der', 'die', 'das'].includes(entry.nounData.article))) errors.push(`Article exercise does not match noun eligibility: ${at}`)
    if (!entry.examples.length || new Set(entry.examples.map((example) => example.exampleId)).size !== entry.examples.length || entry.examples.some((example) => !example.exampleId || example.origin !== 'authored' || !example.de.trim() || !example.fa.trim())) errors.push(`Invalid authored example: ${at}`)
    const example = entry.examples.find((candidate) => candidate.exampleId === entry.cloze.exampleId)
    if (!example || entry.cloze.sentence.split('___').length !== 2 || !entry.cloze.translationFa.trim() || !validAcceptedAnswers(entry.cloze.acceptedAnswers, entry.lemma) || entry.cloze.sentence.replace('___', entry.cloze.acceptedAnswers[0]) !== example.de) errors.push(`Invalid cloze: ${at}`)
    if (!entry.writing || !entry.writing.promptFa.trim() || !entry.writing.cueFa.trim() || typeof entry.writing.caseSensitive !== 'boolean' || !validAcceptedAnswers(entry.writing.acceptedAnswers, entry.lemma)) errors.push(`Invalid writing prompt or accepted answers: ${at}`)
    const optionIds = entry.meaningOptionEntryIds
    if (optionIds.length !== 4 || new Set(optionIds).size !== 4 || !optionIds.includes(at) || optionIds.some((id) => !byId.has(id)) || new Set(optionIds.map((id) => byId.get(id)?.meaningFa)).size !== 4) errors.push(`Invalid meaning options: ${at}`)
    if (['flashcard', 'choose-meaning', 'cloze', 'match', 'write-word'].some((kind) => !entry.enabledExercises.includes(kind as typeof entry.enabledExercises[number]))) errors.push(`Missing excerpt exercise: ${at}`)
  }
  if (new Set(bundle.entries.map((entry) => entry.meaningFa)).size !== ids.length) errors.push('Matching requires unambiguous, distinct meanings.')
  return errors
}
