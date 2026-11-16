import assert from 'node:assert/strict'
import test from 'node:test'
import { courseBundle } from '../content/catalog.ts'
import { createInitialState, transition } from '../learning/engine.ts'
import { grammarFeedback } from '../learning/grammar.ts'
import { indexedDBModel } from './test-idb.ts'
import { loadState, validateState } from './index.ts'

test('grammar response, options and cursor survive IndexedDB reload while the old vocabulary save is preserved', async t => {
  const now = '2026-11-16T12:00:00.000Z'
  let state = createInitialState(courseBundle, 'Europe/Berlin')
  state = transition(state, { type: 'grammar-start', lessonId: 'a1-lesson-01', sessionId: 'grammar-persistence', seed: 12 }, courseBundle, now)
  const session = state.grammar!.session!, item = session.items[0]
  state = transition(state, { type: 'grammar-answer', sessionId: session.sessionId, questionId: item.questionId, attemptId: 'persisted-answer', option: item.options[0] }, courseBundle, now)
  validateState(state, courseBundle)
  const previous = globalThis.indexedDB
  t.after(() => { globalThis.indexedDB = previous })
  const model = indexedDBModel(state)
  globalThis.indexedDB = model.factory
  model.failNextPut()
  const loaded = (await loadState(courseBundle))!
  assert.deepEqual(loaded.progress, state.progress)
  assert.deepEqual(loaded.grammar!.attempts, state.grammar!.attempts)
  assert.deepEqual(loaded.grammar!.session!.items, state.grammar!.session!.items)
  assert.equal(loaded.grammar!.session!.state, 'paused')
  assert.deepEqual(grammarFeedback(loaded.grammar), grammarFeedback(state.grammar))
  assert.deepEqual(model.read(), state)
})

test('both grammar lessons survive reload without changing the selected vocabulary lesson', async t => {
  const now = '2026-11-16T12:00:00.000Z'
  let state = createInitialState(courseBundle, 'Europe/Berlin')
  for (const [lessonId, sessionId] of [['a1-lesson-01', 'saved-one'], ['a1-lesson-02', 'saved-two']]) {
    state = transition(state, { type: 'grammar-start', lessonId, sessionId, seed: 9 }, courseBundle, now)
    const item = state.grammar!.session!.items[0]
    state = transition(state, { type: 'grammar-answer', sessionId, questionId: item.questionId, attemptId: sessionId + '-answer', option: item.options[0] }, courseBundle, now)
  }
  const previous = globalThis.indexedDB
  t.after(() => { globalThis.indexedDB = previous })
  const model = indexedDBModel(state)
  globalThis.indexedDB = model.factory
  const loaded = (await loadState(courseBundle))!
  validateState(loaded, courseBundle)
  assert.equal(loaded.activeLessonId, state.activeLessonId)
  assert.deepEqual(loaded.grammar!.savedSessions, state.grammar!.savedSessions)
  assert.deepEqual(loaded.grammar!.attempts, state.grammar!.attempts)
  assert.deepEqual(loaded.grammar!.session!.items, state.grammar!.session!.items)
  assert.equal(loaded.grammar!.session!.state, 'paused')
})
