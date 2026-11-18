import assert from 'node:assert/strict'
import test from 'node:test'
import { readFileSync } from 'node:fs'
import { courseBundle } from './catalog.ts'
import { lessonSixCoursebookRows } from './lesson-six-coursebook.ts'
import { lessonStudyEntries, lessonVocabularyEntries } from './lesson-vocabulary.ts'
import { validateContent } from './validate.ts'
import { createInitialState, transition } from '../learning/engine.ts'
import { selectReverseEntries } from '../learning/reverse.ts'

const lessonId = 'lesson-06', now = '2026-11-18T12:00:00.000Z'
test('coursebook word-bank scope is exact and page-ordered, including interleaved shared entries', () => {
  const audit = JSON.parse(readFileSync(new URL('../../reference/audits/lesson-06-coursebook.json', import.meta.url), 'utf8'))
  assert.deepEqual(lessonSixCoursebookRows, audit.rows)
  const vocabulary = lessonVocabularyEntries(courseBundle, lessonId)
  assert.equal(vocabulary.length, 172)
  assert.equal(lessonStudyEntries(courseBundle, lessonId).length, 162)
  assert.deepEqual(vocabulary.map(entry => entry.entryId), audit.rows.map((row: { entryId: string }) => row.entryId))
  const pages = lessonSixCoursebookRows.map(row => row.page)
  assert.deepEqual(pages, pages.toSorted((a, b) => a - b))
  assert.deepEqual(vocabulary.slice(0, 5).map(entry => entry.lemma), ['Waschsalon', 'Copyshop', 'Inhaberin', 'Wegbeschreibung', 'waschen'])
  const forbidden = ['Wald', 'Dokument', 'Kuh', 'dass', 'außerdem', 'Vetter']
  assert.ok(vocabulary.every(entry => !forbidden.includes(entry.lemma)))
  assert.ok(courseBundle.entries.some(entry => entry.lemma === 'Wald'), 'historical identity is retained')
  assert.equal(vocabulary.filter(entry => entry.lemma === 'ein paar').length, 1)
  assert.equal(vocabulary.filter(entry => entry.introducedInLessonId !== lessonId).length, 10)
  const rock = lessonSixCoursebookRows.find(row => row.entryId === 'a1-l04-053')!
  assert.equal(rock.page, 54)
  assert.ok(lessonSixCoursebookRows.indexOf(rock) < lessonSixCoursebookRows.findIndex(row => row.page === 55))
})
test('every new lesson-six task and distractor belongs to the current scope', () => {
  const scope = lessonStudyEntries(courseBundle, lessonId)
  const valid = new Set(scope.map(entry => entry.entryId))
  let state = transition(createInitialState(courseBundle, 'Europe/Berlin'), { type: 'select-lesson', lessonId }, courseBundle, now)
  state = transition(state, { type: 'start-session', sessionId: 'core-first', seed: 12 }, courseBundle, now)
  assert.deepEqual(state.session!.queue.filter(task => task.kind === 'flashcard').map(task => task.entryId), scope.slice(0, 5).map(entry => entry.entryId))
  for (const task of state.session!.queue) {
    if (task.kind === 'match') assert.ok(task.entryIds.every(id => valid.has(id)))
    else assert.ok(valid.has(task.entryId))
    if (task.kind === 'choose-meaning') {
      assert.equal(task.optionIds.length, 4)
      assert.ok(task.optionIds.every(id => valid.has(id)))
      assert.equal(new Set(task.optionIds.map(id => courseBundle.entries.find(entry => entry.entryId === id)!.meaningFa)).size, 4)
    }
  }
})
test('retired reverse history remains stored but is not selected into new sessions', () => {
  const state = createInitialState(courseBundle, 'Europe/Berlin')
  for (const entry of courseBundle.entries.slice(0, 15)) state.reverseProgress[entry.entryId] = {
    entryId: entry.entryId, completedAt: now, lastReviewedAt: null, nextDueAt: '2027-01-01T00:00:00.000Z',
    successStreak: 0, correctCount: 0, incorrectCount: 0, intervalDays: 1,
  }
  state.reverseProgress['a1-l06-074'] = { ...state.reverseProgress[courseBundle.entries[0].entryId], entryId: 'a1-l06-074', nextDueAt: now }
  const before = structuredClone(state)
  assert.deepEqual(selectReverseEntries(state, courseBundle, [], now, 3), [])
  assert.deepEqual(state, before)
})
test('unknown, duplicated and cross-lesson curriculum IDs fail content validation', () => {
  for (const replacement of ['missing', 'a1-l06-139', 'a1-l04-053']) {
    const bad = structuredClone(courseBundle)
    bad.lessons!.find(lesson => lesson.lessonId === lessonId)!.studyEntryIds![0] = replacement
    assert.ok(validateContent(bad).some(error => error.includes('scope')))
  }
})
