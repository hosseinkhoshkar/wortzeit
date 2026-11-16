import assert from 'node:assert/strict'
import test from 'node:test'
import { grammarQuestions } from '../content/grammar-one.ts'
import { courseBundle } from '../content/catalog.ts'
import { applyGrammar, grammarFeedback, grammarStats, validateGrammar } from './grammar.ts'
import { createInitialState, transition } from './engine.ts'
import { validateState } from '../storage/index.ts'
import { getDailyStreak, STREAK_TARGET_MS } from './streak.ts'

const now = '2026-11-16T12:00:00.000Z'
function start(seed = 1) {
  return applyGrammar(undefined, { type: 'grammar-start', lessonId: 'a1-lesson-01', sessionId: 'grammar-test', seed }, now)!
}
test('lesson-one grammar contains 24 authored questions, exactly four unique options and a known correct answer', () => {
  assert.equal(grammarQuestions.length, 24)
  assert.equal(new Set(grammarQuestions.map(question => question.questionId)).size, 24)
  for (const question of grammarQuestions) {
    assert.equal(question.lessonId, 'a1-lesson-01')
    assert.equal(question.options.length, 4)
    assert.equal(new Set(question.options).size, 4)
    assert.ok(question.options.includes(question.answer))
    assert.ok(question.explanationFa && question.locator && question.origin === 'authored')
  }
})
test('five unique questions and shuffled option positions are stable across cloning and differ across seeds', () => {
  const positions = new Set<number>()
  const orders = new Set<string>()
  for (let seed = 1; seed <= 40; seed++) {
    const state = start(seed)
    assert.equal(state.session!.items.length, 5)
    assert.equal(new Set(state.session!.items.map(item => item.questionId)).size, 5)
    assert.equal(validateGrammar(state), true)
    for (const item of state.session!.items) {
      const question = grammarQuestions.find(question => question.questionId === item.questionId)!
      positions.add(item.options.indexOf(question.answer))
    }
    orders.add(state.session!.items.map(item => item.questionId).join(','))
    assert.deepEqual(structuredClone(state), state)
  }
  assert.equal(positions.size, 4)
  assert.ok(orders.size > 1)
})
test('answer commits once, cannot be changed, and next requires the current committed answer', () => {
  const state = start()
  const session = state.session!
  const item = session.items[0]
  assert.equal(applyGrammar(state, { type: 'grammar-next', sessionId: session.sessionId, questionId: item.questionId }, now), state)
  const command = { type: 'grammar-answer' as const, sessionId: session.sessionId, questionId: item.questionId, attemptId: 'answer-1', option: item.options[0] }
  const answered = applyGrammar(state, command, now)!
  assert.equal(answered.attempts.length, 1)
  assert.equal(applyGrammar(answered, command, now), answered)
  assert.equal(applyGrammar(answered, { ...command, attemptId: 'answer-2', option: item.options[1] }, now), answered)
  assert.ok(grammarFeedback(answered))
  const paused = applyGrammar(answered, { type: 'grammar-pause' }, now)!
  const resumed = applyGrammar(paused, { type: 'grammar-start', lessonId: 'a1-lesson-01', sessionId: 'unused', seed: 90 }, now)!
  assert.deepEqual(grammarFeedback(resumed), grammarFeedback(answered))
  assert.deepEqual(resumed.session!.items, answered.session!.items)
  assert.equal(validateGrammar(resumed), true)
})
test('a wrong question is eligible for the next batch and grammar attempts never create vocabulary progress', () => {
  let grammar = start()
  const wrongId = grammar.session!.items[0].questionId
  for (let index = 0; index < 5; index++) {
    const session = grammar.session!, item = session.items[session.cursor]
    const question = grammarQuestions.find(question => question.questionId === item.questionId)!
    grammar = applyGrammar(grammar, { type: 'grammar-answer', sessionId: session.sessionId, questionId: item.questionId, attemptId: 'answer-' + index,
      option: index === 0 ? item.options.find(option => option !== question.answer)! : question.answer }, now)!
    grammar = applyGrammar(grammar, { type: 'grammar-next', sessionId: session.sessionId, questionId: item.questionId }, now)!
  }
  assert.equal(grammar.session!.state, 'ended')
  assert.equal(grammarStats(grammar).mistakes, 1)
  grammar = applyGrammar(grammar, { type: 'grammar-start', lessonId: 'a1-lesson-01', sessionId: 'next-batch', seed: 10 }, now)!
  assert.ok(grammar.session!.items.some(item => item.questionId === wrongId))
  assert.equal(validateGrammar(grammar), true)
})
test('grammar pauses vocabulary, contributes only active time to streaks, and survives switching back', () => {
  let state = createInitialState(courseBundle, 'Europe/Berlin')
  state = transition(state, { type: 'start-session', sessionId: 'vocabulary-before-grammar', seed: 3 }, courseBundle, now)
  const before = structuredClone(state)
  state = transition(state, { type: 'grammar-start', lessonId: 'a1-lesson-01', sessionId: 'grammar-time', seed: 4 }, courseBundle, now)
  assert.equal(state.session!.state, 'paused')
  assert.deepEqual(state.progress, before.progress)
  state.dailyActivity['2026-11-16'] = STREAK_TARGET_MS - 1000
  const activity = { type: 'activity' as const, eventId: 'grammar-second', sessionId: 'grammar-time', from: now, to: '2026-11-16T12:00:01.000Z', elapsedMs: 1000 }
  state = transition(state, activity, courseBundle, activity.to)
  assert.equal(getDailyStreak(state, activity.to).days, 1)
  assert.equal(state.grammar!.session!.activeMs, 1000)
  assert.equal(state.session!.activeMs, 0)
  assert.equal(transition(state, activity, courseBundle, activity.to), state)
  validateState(state, courseBundle)
  state = transition(state, { type: 'start-session', sessionId: 'resume-vocab', seed: 5 }, courseBundle, activity.to)
  assert.equal(state.grammar!.session!.state, 'paused')
  assert.equal(state.session!.sessionId, before.session!.sessionId)
  assert.deepEqual(state.session!.queue, before.session!.queue)
  assert.deepEqual(state.progress, before.progress)
  validateState(state, courseBundle)
})
test('unknown options, duplicate evidence and inconsistent results fail closed; old saves without grammar remain valid', () => {
  assert.equal(validateGrammar(undefined), true)
  const state = start()
  const session = state.session!, item = session.items[0]
  const invalid = { type: 'grammar-answer' as const, sessionId: session.sessionId, questionId: item.questionId, attemptId: 'invalid', option: 'not-an-option' }
  assert.equal(applyGrammar(state, invalid, now), state)
  const answered = applyGrammar(state, { ...invalid, option: item.options[0] }, now)!
  const corrupt = structuredClone(answered)
  corrupt.attempts[0].correct = !corrupt.attempts[0].correct
  assert.equal(validateGrammar(corrupt), false)
  const duplicate = structuredClone(answered)
  duplicate.attempts.push({ ...duplicate.attempts[0], attemptId: 'another-id' })
  assert.equal(validateGrammar(duplicate), false)
})
