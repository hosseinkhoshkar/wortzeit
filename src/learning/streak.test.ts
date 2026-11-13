import assert from 'node:assert/strict'
import test from 'node:test'
import { courseBundle } from '../content/catalog.ts'
import { createInitialState, transition } from './engine.ts'
import { getDailyStreak, STREAK_TARGET_MS } from './streak.ts'

const now = '2026-11-13T12:00:00.000Z'
function stateWith(days: Record<string, number>) {
  return { ...createInitialState(courseBundle, 'Europe/Berlin'), dailyActivity: days }
}

test('twenty minutes completes a day exactly once regardless of extra time or repeated reads', () => {
  const state = stateWith({ '2026-11-13': STREAK_TARGET_MS - 1 })
  assert.equal(getDailyStreak(state, now).days, 0)
  assert.equal(getDailyStreak(state, now).completedToday, false)
  state.dailyActivity['2026-11-13']++
  assert.equal(getDailyStreak(state, now).days, 1)
  assert.equal(getDailyStreak(state, now).completedToday, true)
  state.dailyActivity['2026-11-13'] *= 4
  const before = structuredClone(state)
  for (let read = 0; read < 5; read++) assert.equal(getDailyStreak(state, now).days, 1)
  assert.deepEqual(state, before)
})

test('today remains available until midnight and a missed or short day breaks the streak', () => {
  const state = stateWith({ '2026-11-11': STREAK_TARGET_MS, '2026-11-12': STREAK_TARGET_MS, '2026-11-13': 60_000 })
  assert.equal(getDailyStreak(state, '2026-11-13T22:59:59.999Z').days, 2)
  assert.equal(getDailyStreak(state, '2026-11-13T23:00:00.000Z').days, 0)
  state.dailyActivity['2026-11-14'] = STREAK_TARGET_MS
  assert.equal(getDailyStreak(state, '2026-11-14T12:00:00.000Z').days, 1)
  assert.equal(getDailyStreak(state, '2026-11-17T12:00:00.000Z').days, 0)
})

test('consecutive calendar days work across month/year, leap days and Berlin daylight saving changes', () => {
  for (const dates of [
    ['2026-12-31', '2027-01-01', '2027-01-02'],
    ['2028-02-28', '2028-02-29', '2028-03-01'],
    ['2026-03-28', '2026-03-29', '2026-03-30'],
    ['2026-10-24', '2026-10-25', '2026-10-26'],
  ]) {
    const state = stateWith(Object.fromEntries(dates.map(date => [date, STREAK_TARGET_MS])))
    assert.equal(getDailyStreak(state, `${dates[2]}T12:00:00.000Z`).days, 3)
  }
})

test('future activity is ignored and an empty history starts at zero', () => {
  assert.equal(getDailyStreak(stateWith({}), now).days, 0)
  assert.equal(getDailyStreak(stateWith({ '2026-11-14': STREAK_TARGET_MS }), now).days, 0)
})

test('active practice accumulates across lessons/sessions without changing learning or ending at twenty minutes', () => {
  let state = createInitialState(courseBundle, 'Europe/Berlin')
  state = transition(state, { type: 'start-session', sessionId: 'first-ten', seed: 1 }, courseBundle, now)
  let sequence = 0
  function addTenMinutes() {
    for (let sample = 0; sample < 120; sample++) {
      const from = new Date(Date.parse(now) + sequence * 5000).toISOString()
      const to = new Date(Date.parse(from) + 5000).toISOString()
      const command = { type: 'activity' as const, eventId: `streak-${sequence++}`, sessionId: state.session!.sessionId, from, to, elapsedMs: 5000 }
      state = transition(state, command, courseBundle, to)
      const committed = state
      assert.equal(transition(state, command, courseBundle, to), committed)
    }
  }
  addTenMinutes()
  assert.equal(getDailyStreak(state, now).completedToday, false)
  state = transition(state, { type: 'select-lesson', lessonId: 'lesson-06' }, courseBundle, now)
  state = transition(state, { type: 'start-session', sessionId: 'second-ten', seed: 2 }, courseBundle, now)
  const learning = structuredClone({ progress: state.progress, attempts: state.attempts, reverseReviews: state.reverseReviews, queue: state.session!.queue })
  addTenMinutes()
  assert.equal(getDailyStreak(state, now).days, 1)
  assert.equal(state.session!.state, 'active')
  assert.deepEqual({ progress: state.progress, attempts: state.attempts, reverseReviews: state.reverseReviews, queue: state.session!.queue }, learning)
  state = transition(state, { type: 'pause' }, courseBundle, now)
  const command = { type: 'activity' as const, eventId: 'paused', sessionId: state.session!.sessionId, from: now, to: now, elapsedMs: 5000 }
  assert.equal(transition(state, command, courseBundle, now), state)
})

test('an activity sample crossing Berlin midnight credits each calendar day separately', () => {
  const from = '2026-11-13T22:59:58.000Z'
  const to = '2026-11-13T23:00:03.000Z'
  let state = stateWith({ '2026-11-13': STREAK_TARGET_MS - 2000 })
  state = transition(state, { type: 'start-session', sessionId: 'midnight', seed: 3 }, courseBundle, from)
  state = transition(state, { type: 'activity', eventId: 'crossing', sessionId: 'midnight', from, to, elapsedMs: 5000 }, courseBundle, to)
  assert.equal(state.dailyActivity['2026-11-13'], STREAK_TARGET_MS)
  assert.equal(state.dailyActivity['2026-11-14'], 3000)
  assert.deepEqual(getDailyStreak(state, to), { date: '2026-11-14', days: 1, activeMs: 3000, completedToday: false })
})
