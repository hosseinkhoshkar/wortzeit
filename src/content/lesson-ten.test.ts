import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { courseBundle, lessonBundles } from './catalog.ts'
import { createInitialState, transition } from '../learning/engine.ts'
import { validateContent } from './validate.ts'

const lessonId = 'lesson-10'
const lesson = lessonBundles.find(bundle => bundle.lesson.lessonId === lessonId)!

test('lesson ten preserves all 51 source rows and includes three distinct bilingual examples per word', () => {
  const text = readFileSync(new URL('../../reference/vocabulary/Lesson-10-A2.txt', import.meta.url), 'utf8')
  const rows = [...text.matchAll(/^(\d+)\. (.*?) — (.*?)\r?\n[ \t]+منبع: (.*?)\r?$/gm)]
  const sidecar = JSON.parse(readFileSync(new URL('../../public/content/examples/Lesson-10-A2.json', import.meta.url), 'utf8'))
  const entries = courseBundle.entries.filter(entry => entry.introducedInLessonId === lessonId)
  assert.equal(lesson.lesson.level, 'A2')
  assert.equal(rows.length, 51)
  assert.equal(entries.length, rows.length)
  assert.equal(lesson.sourceRefs.length, 86)
  assert.equal(entries.filter(entry => entry.nounData).length, 35)
  for (const [index, entry] of entries.entries()) {
    const [, row, headword, meaningFa, locators] = rows[index]
    assert.equal(entry.entryId, `a2-l10-${row.padStart(3, '0')}`)
    assert.equal(entry.nounData ? `${entry.nounData.article} ${entry.lemma}` : entry.lemma, headword)
    assert.equal(entry.meaningFa, meaningFa)
    assert.deepEqual(entry.sourceRefIds.filter(id => !id.endsWith('-occurrence-lesson-06')).map(id => lesson.sourceRefs.find(ref => ref.sourceRefId === id)?.locator), locators.split('؛ '))
    assert.equal(entry.enabledExercises.includes('choose-article'), Boolean(entry.nounData))
    assert.ok(!entry.writing.cueFa.includes(entry.lemma))
    assert.equal(entry.examples.length, 3)
    assert.equal(new Set(entry.examples.map(example => example.de.normalize('NFC').toLowerCase())).size, 3)
    assert.equal(new Set(entry.examples.map(example => example.fa)).size, 3)
    assert.deepEqual(entry.examples.slice(1).map(({ de, fa, origin }) => ({ de, fa, origin })), sidecar.entries[index].additionalExamples)
  }
  assert.deepEqual(validateContent(lesson), [])
})

test('lesson ten starts in printed textbook order and keeps the saved lesson-nine session', () => {
  const now = '2026-11-06T12:00:00.000Z'
  let state = createInitialState(courseBundle, 'Europe/Berlin')
  state = transition(state, { type: 'select-lesson', lessonId: 'lesson-09' }, courseBundle, now)
  state = transition(state, { type: 'start-session', sessionId: 'before-ten', seed: 1 }, courseBundle, now)
  const previousSession = { ...structuredClone(state.session!), state: 'paused' }
  state = transition(state, { type: 'select-lesson', lessonId }, courseBundle, now)
  assert.deepEqual(state.savedSessions['lesson-09'], previousSession)
  state = transition(state, { type: 'start-session', sessionId: 'ten-first', seed: 1 }, courseBundle, now)
  const cards = state.session!.queue.filter(task => task.kind === 'flashcard')
  assert.deepEqual(cards.map(card => card.entryId), lesson.lesson.introducedEntryIds.slice(0, 5))
  assert.deepEqual(cards.map(card => lesson.entries.find(entry => entry.entryId === card.entryId)?.lemma),
    ["Nachteil","Vorteil","hell","Kaution","Keller"])
  state = transition(state, { type: 'select-lesson', lessonId: 'lesson-09' }, courseBundle, now)
  assert.deepEqual(state.session, previousSession)
  assert.equal(state.savedSessions[lessonId].sessionId, 'ten-first')
})
