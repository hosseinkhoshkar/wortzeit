import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import type { AppState } from '../contracts/index.ts'
import { courseBundle } from '../content/catalog.ts'
import { lessonVocabularyEntries } from '../content/lesson-vocabulary.ts'
import { getHomeStats, transition } from '../learning/engine.ts'
import { loadState, migrateState, validateState } from './index.ts'
import { indexedDBModel } from './test-idb.ts'

// Generated with the unmodified main engine/catalog at 846c2c9.
const before: AppState = JSON.parse(readFileSync(new URL('./fixtures/pre-lesson-six-expansion-schema4.json', import.meta.url), 'utf8'))
const now = '2026-11-12T10:00:00.000Z'

test('the pre-expansion lesson-six session reloads unchanged and lists added words without creating progress', async t => {
  validateState(before, courseBundle)
  assert.deepEqual(migrateState(before, courseBundle), before)
  const previous = globalThis.indexedDB
  t.after(() => { globalThis.indexedDB = previous })
  const model = indexedDBModel(before)
  globalThis.indexedDB = model.factory
  model.failNextPut()
  const loaded = (await loadState(courseBundle))!
  const paused = { ...before, session: { ...before.session!, state: 'paused' as const } }
  assert.deepEqual(loaded, paused)
  assert.deepEqual(await loadState(courseBundle), paused)
  assert.deepEqual(model.read(), before)
  const snapshot = structuredClone(loaded)
  const vocabulary = lessonVocabularyEntries(courseBundle, 'lesson-06')
  assert.equal(vocabulary.length, 236)
  assert.deepEqual(loaded, snapshot)
  assert.equal(getHomeStats(loaded, courseBundle, now).newCount, 224 - Object.keys(before.progress).length)
  const pendingIds = new Set(before.session!.queue.filter(task => task.kind === 'flashcard').map(task => task.entryId))
  assert.ok([...pendingIds].every(id => Number(id.slice(-3)) <= 80))
  const resumed = transition(loaded, { type: 'start-session', sessionId: 'resume', seed: 7 }, courseBundle, now)
  const revealed = transition(resumed, { type: 'reveal-card', taskId: loaded.session!.queue[loaded.session!.cursor].taskId }, courseBundle, now)
  validateState(revealed, courseBundle)
  assert.deepEqual(revealed.progress, before.progress)
})
