import assert from 'node:assert/strict'
import test from 'node:test'
import { courseBundle } from '../content/catalog.ts'
import { createInitialState } from '../learning/engine.ts'
import { getDailyStreak, STREAK_TARGET_MS } from '../learning/streak.ts'
import { loadState } from './index.ts'
import { indexedDBModel } from './test-idb.ts'

test('streak history survives IndexedDB reopening without migration or a second counter', async t => {
  const before = createInitialState(courseBundle, 'Europe/Berlin')
  before.dailyActivity = { '2026-11-12': STREAK_TARGET_MS, '2026-11-13': STREAK_TARGET_MS }
  const previous = globalThis.indexedDB
  t.after(() => { globalThis.indexedDB = previous })
  const model = indexedDBModel(before)
  globalThis.indexedDB = model.factory
  model.failNextPut()
  for (let open = 0; open < 2; open++) {
    const loaded = (await loadState(courseBundle))!
    assert.deepEqual(loaded, before)
    assert.equal(getDailyStreak(loaded, '2026-11-13T12:00:00.000Z').days, 2)
    assert.equal(getDailyStreak(loaded, '2026-11-15T12:00:00.000Z').days, 0)
  }
  assert.deepEqual(model.read(), before)
})
