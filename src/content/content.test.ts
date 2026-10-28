import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { lessonOneBundle } from './lesson-one.ts'
import { validateContent } from './validate.ts'

test('phase-one content is complete, internally consistent, and explicitly an excerpt', () => {
  assert.deepEqual(validateContent(lessonOneBundle), [])
  assert.equal(lessonOneBundle.entries.length, 20)
  assert.equal(lessonOneBundle.lesson.coverage, 'partial')
  assert.equal(lessonOneBundle.provenance.reviewStatus, 'excerpt-checked')
  assert.ok(lessonOneBundle.provenance.noteFa.includes('تأیید جامع اصل کتاب نیست'))
})

test('every selected headword, Persian meaning, article and all source locators exactly match the supplied file', () => {
  const source = readFileSync(new URL('../../reference/vocabulary/Lesson-01-A1.txt', import.meta.url), 'utf8')
  const sourceEntries = [...source.matchAll(/^\d+\. (.+?) — (.+)\r?\n\s+منبع: (.+)/gm)]
  assert.equal(sourceEntries.length, 229)
  for (const entry of lessonOneBundle.entries) {
    const headword = entry.nounData ? `${entry.nounData.article} ${entry.lemma}` : entry.lemma
    const original = sourceEntries.find((match) => match[1] === headword)
    assert.ok(original, `${headword} must exist in the supplied lesson`)
    assert.equal(entry.meaningFa, original[2], headword)
    const refs = entry.sourceRefIds.map((refId) => {
      const ref = lessonOneBundle.sourceRefs.find((candidate) => candidate.sourceRefId === refId)
      assert.ok(ref)
      return ref.locator
    })
    assert.deepEqual(refs, original[3].trim().split('؛ '), `${headword}: preserve every listed source, not just the first`)
  }
})

test('authored cloze answers reconstruct exactly the labeled example, including umlauts and capitalization', () => {
  for (const entry of lessonOneBundle.entries) {
    assert.equal(entry.examples[0].origin, 'authored')
    assert.equal(entry.cloze.sentence.split('___').length, 2)
    for (const answer of entry.cloze.acceptedAnswers) assert.equal(entry.cloze.sentence.replace('___', answer), entry.examples[0].de)
  }
  const named = lessonOneBundle.entries.find((entry) => entry.lemma === 'heißen')!
  assert.deepEqual(named.cloze.acceptedAnswers, ['heißen'])
  assert.equal(named.nounData, undefined)
  assert.equal(lessonOneBundle.entries.filter((entry) => entry.partOfSpeech === 'noun').length, 10)
})

test('validator rejects broken source, duplicate identity, invented noun data and invalid exercise data', () => {
  const bundle = structuredClone(lessonOneBundle)
  bundle.entries[1].entryId = bundle.entries[0].entryId
  bundle.entries[0].sourceRefIds.push('missing-source-ref')
  bundle.entries[0].nounData = { article: 'das', plural: null, pluralNote: 'unknown' }
  bundle.entries[0].meaningOptionEntryIds = [bundle.entries[0].entryId]
  bundle.entries[0].cloze.sentence = 'no blank'
  const errors = validateContent(bundle)
  assert.ok(errors.some((error) => error.includes('Duplicate entry ID')))
  assert.ok(errors.some((error) => error.includes('Broken entry source refs')))
  assert.ok(errors.some((error) => error.includes('Non-noun')))
  assert.ok(errors.some((error) => error.includes('Invalid meaning options')))
  assert.ok(errors.some((error) => error.includes('Invalid cloze')))
})

test('matching and every meaning choice use four distinct, resolvable meanings', () => {
  const byId = new Map(lessonOneBundle.entries.map((entry) => [entry.entryId, entry]))
  for (const entry of lessonOneBundle.entries) {
    assert.equal(entry.meaningOptionEntryIds.length, 4)
    assert.equal(new Set(entry.meaningOptionEntryIds.map((id) => byId.get(id)?.meaningFa)).size, 4)
    assert.ok(entry.meaningOptionEntryIds.includes(entry.entryId))
  }
  assert.equal(new Set(lessonOneBundle.entries.map((entry) => entry.meaningFa)).size, 20)
})
