import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { courseBundle } from './catalog.ts'
import { lessonSevenOrder } from './lesson-seven-order.ts'
import { lessonStudyEntries, lessonVocabularyEntries } from './lesson-vocabulary.ts'
import { createInitialState, transition } from '../learning/engine.ts'
import { validateState } from '../storage/index.ts'

test('lesson-seven audit covers all existing IDs, orders coursebook pages, and separates supplements without a fabricated page', () => {
  const audit = JSON.parse(readFileSync(new URL('../../reference/audits/lesson-07.json', import.meta.url), 'utf8'))
  assert.deepEqual(lessonSevenOrder, audit.entries)
  assert.equal(lessonSevenOrder.length, 55)
  assert.equal(new Set(lessonSevenOrder.map(row => row.entryId)).size, 55)
  const pages = lessonSevenOrder.filter(row => row.page !== null).map(row => row.page!)
  assert.equal(pages.length, 40)
  assert.deepEqual(pages, pages.toSorted((a, b) => a - b))
  assert.ok(lessonSevenOrder.slice(40).every(row => row.page === null))
  const ordered = lessonStudyEntries(courseBundle, 'lesson-07')
  assert.deepEqual(ordered.map(entry => entry.entryId), lessonSevenOrder.map(row => row.entryId))
  assert.deepEqual(lessonVocabularyEntries(courseBundle, 'lesson-07'), ordered)
  assert.equal(lessonSevenOrder.find(row => row.headword === 'die Blume')?.page, 62)
  assert.equal(lessonSevenOrder.find(row => row.headword === 'lachen')?.page, 63)
  assert.equal(lessonSevenOrder.find(row => row.headword === 'die Kunst')?.page, 64)
  assert.equal(lessonSevenOrder.find(row => row.headword === 'das Ticket')?.page, null)
  assert.equal(audit.counts.publisherPageVerified, lessonSevenOrder.filter(row => row.evidence === 'publisher-page-glossary').length)
})

test('an old lesson-seven queue and progress survive content reordering; new queues use the corrected order', () => {
  const oldBundle = structuredClone(courseBundle)
  const oldLesson = oldBundle.lessons!.find(lesson => lesson.lessonId === 'lesson-07')!
  delete oldLesson.studyEntryIds
  delete oldLesson.vocabularyEntryIds
  const now = '2026-11-24T10:00:00.000Z'
  let old = transition(createInitialState(oldBundle, 'Europe/Berlin'), { type: 'select-lesson', lessonId: 'lesson-07' }, oldBundle, now)
  old = transition(old, { type: 'start-session', sessionId: 'historical-seven', seed: 12 }, oldBundle, now)
  const saved = JSON.parse(JSON.stringify(old))
  validateState(saved, courseBundle)
  assert.deepEqual(saved, old)
  const resumed = transition(saved, { type: 'start-session', sessionId: 'ignored-new-id', seed: 99 }, courseBundle, now)
  assert.deepEqual(resumed.session!.queue, old.session!.queue)
  assert.deepEqual(resumed.progress, old.progress)
  const selected = transition(createInitialState(courseBundle, 'Europe/Berlin'), { type: 'select-lesson', lessonId: 'lesson-07' }, courseBundle, now)
  const fresh = transition(selected, { type: 'start-session', sessionId: 'fresh-seven', seed: 12 }, courseBundle, now)
  assert.deepEqual(fresh.session!.queue.filter(item => item.kind === 'flashcard').map(item => item.entryId), lessonSevenOrder.slice(0, 5).map(row => row.entryId))
})
