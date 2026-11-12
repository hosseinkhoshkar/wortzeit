import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { courseBundle, lessonBundles } from './catalog.ts'
import { createInitialState, transition } from '../learning/engine.ts'
import { validateContent } from './validate.ts'

const lessonId = 'lesson-06'
const lesson = lessonBundles.find(bundle => bundle.lesson.lessonId === lessonId)!

test('all 224 lesson-six entries match their source, keep exact articles and have three distinct examples', () => {
  const text = readFileSync(new URL('../../reference/vocabulary/Lesson-06-A1.txt', import.meta.url), 'utf8')
  const rows = [...text.matchAll(/^(\d+)\. (.*?) — (.*?)\r?\n[ \t]+منبع: (.*?)\r?$/gm)]
  const sidecar = JSON.parse(readFileSync(new URL('../../public/content/examples/Lesson-06-A1.json', import.meta.url), 'utf8'))
  const entries = courseBundle.entries.filter(entry => entry.introducedInLessonId === lessonId)
  assert.equal(rows.length, 224)
  assert.equal(entries.length, rows.length)
  assert.equal(lesson.sourceRefs.length, 289)
  assert.equal(entries.slice(0, 80).filter(entry => entry.nounData).length, 42)
  for (const [index, entry] of entries.entries()) {
    const [, row, headword, meaningFa, locators] = rows[index]
    assert.equal(entry.entryId, `a1-l06-${row.padStart(3, '0')}`)
    assert.equal(entry.nounData ? `${entry.nounData.article} ${entry.lemma}` : entry.lemma, headword)
    assert.equal(entry.meaningFa, meaningFa)
    assert.deepEqual(entry.sourceRefIds.map(id => lesson.sourceRefs.find(ref => ref.sourceRefId === id)?.locator), locators.split('؛ '))
    assert.equal(entry.enabledExercises.includes('choose-article'), Boolean(entry.nounData))
    assert.ok(!entry.writing.cueFa.includes(entry.lemma))
    assert.equal(entry.examples.length, 3)
    assert.equal(new Set(entry.examples.map(example => example.de.normalize('NFC').toLowerCase())).size, 3)
    assert.equal(new Set(entry.examples.map(example => example.fa)).size, 3)
    assert.deepEqual(entry.examples.slice(1).map(({ de, fa, origin }) => ({ de, fa, origin })), sidecar.entries[index].additionalExamples)
  }
  assert.deepEqual(validateContent(lesson), [])
})

test('the first lesson-six batch follows printed page order without replacing a saved lesson-five session', () => {
  const now = '2026-11-06T12:00:00.000Z'
  let state = createInitialState(courseBundle, 'Europe/Berlin')
  state = transition(state, { type: 'select-lesson', lessonId: 'lesson-05' }, courseBundle, now)
  state = transition(state, { type: 'start-session', sessionId: 'fifth-before-sixth', seed: 1 }, courseBundle, now)
  const fifth = { ...structuredClone(state.session!), state: 'paused' }
  state = transition(state, { type: 'select-lesson', lessonId }, courseBundle, now)
  assert.deepEqual(state.savedSessions['lesson-05'], fifth)
  state = transition(state, { type: 'start-session', sessionId: 'sixth-first', seed: 1 }, courseBundle, now)
  const cards = state.session!.queue.filter(task => task.kind === 'flashcard')
  assert.deepEqual(cards.map(card => card.entryId), lesson.lesson.introducedEntryIds.slice(0, 5))
  assert.deepEqual(cards.map(card => lesson.entries.find(entry => entry.entryId === card.entryId)?.lemma),
    ['freundlich', 'schicken', 'Tee', 'Wald', 'waschen'])
  state = transition(state, { type: 'select-lesson', lessonId: 'lesson-05' }, courseBundle, now)
  assert.deepEqual(state.session, fifth)
  assert.equal(state.savedSessions[lessonId].sessionId, 'sixth-first')
})

test('publisher vocabulary audit is completely represented without duplicate learning identities', async () => {
  const { lessonVocabularyEntries } = await import('./lesson-vocabulary.ts')
  const audit = JSON.parse(readFileSync(new URL('../../reference/audits/lesson-06.json', import.meta.url), 'utf8'))
  const entries = lessonVocabularyEntries(courseBundle, lessonId)
  const words = new Set(entries.map(entry => entry.nounData ? `${entry.nounData.article} ${entry.lemma}` : entry.lemma))
  assert.equal(entries.length, 236)
  assert.equal(new Set(entries.map(entry => entry.entryId)).size, entries.length)
  for (const word of audit.requiredHeadwords) assert.ok(words.has(word), `Missing publisher vocabulary: ${word}`)
  for (const row of audit.sharedEntries) {
    const entry = entries.find(entry => entry.entryId === row.entryId)!
    assert.notEqual(entry.introducedInLessonId, lessonId)
    assert.ok(entry.occurrences.some(occurrence => occurrence.lessonId === lessonId))
    assert.equal(courseBundle.entries.filter(entry => entry.entryId === row.entryId).length, 1)
  }
})

test('all original 80 entries and their study order are byte-for-byte equivalent to the pre-expansion snapshot', async () => {
  const { createHash } = await import('node:crypto')
  const hashes = JSON.parse(readFileSync(new URL('../../reference/audits/lesson-06-original-hashes.json', import.meta.url), 'utf8'))
  for (const entry of lesson.entries.slice(0, 80)) {
    assert.equal(createHash('sha256').update(JSON.stringify(entry)).digest('hex'), hashes[entry.entryId], entry.entryId)
  }
  assert.deepEqual(lesson.lesson.introducedEntryIds.slice(80), lesson.entries.slice(80).map(entry => entry.entryId))
  assert.equal(lesson.entries[80].entryId, 'a1-l06-081')
  assert.equal(lesson.entries.at(-1)!.entryId, 'a1-l06-224')
})

test('ein Paar and ein paar retain their meaningful capital-letter distinction', () => {
  const pair = courseBundle.entries.find(entry => entry.lemma === 'ein Paar')!
  const few = courseBundle.entries.find(entry => entry.lemma === 'ein paar')!
  assert.equal(pair.writing.caseSensitive, true)
  assert.equal(few.writing.caseSensitive, true)
  assert.notEqual(pair.meaningFa, few.meaningFa)
  assert.deepEqual(pair.writing.acceptedAnswers, ['ein Paar'])
  assert.deepEqual(few.writing.acceptedAnswers, ['ein paar'])
})
