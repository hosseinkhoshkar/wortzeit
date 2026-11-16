import assert from 'node:assert/strict'
import test from 'node:test'
import { grammarTwoQuestions } from '../content/grammar-two.ts'
import { grammarQuestions } from '../content/grammar-catalog.ts'
import { courseBundle } from '../content/catalog.ts'
import { applyGrammar, grammarFeedback, grammarStats, validateGrammar } from './grammar.ts'
import { createInitialState, transition } from './engine.ts'
import { validateState } from '../storage/index.ts'

const now = '2026-11-16T12:00:00.000Z'
const start = (lessonId: string, sessionId: string) => ({ type: 'grammar-start' as const, lessonId, sessionId, seed: 17 })
test('lesson two has 28 authored questions, four distinct options, stable IDs and seven topics', () => {
  assert.equal(grammarTwoQuestions.length, 28)
  assert.equal(new Set(grammarTwoQuestions.map(question => question.topicFa)).size, 7)
  assert.equal(new Set(grammarQuestions.map(question => question.questionId)).size, grammarQuestions.length)
  assert.equal(grammarQuestions.filter(question => ['a1-lesson-01', 'a1-lesson-02'].includes(question.lessonId)).length, 52)
  grammarTwoQuestions.forEach((question, index) => {
    assert.equal(question.questionId, `a1-g02-${String(index + 1).padStart(3, '0')}`)
    assert.equal(question.lessonId, 'a1-lesson-02')
    assert.equal(question.origin, 'authored')
    assert.equal(question.options.length, 4)
    assert.equal(new Set(question.options).size, 4)
    assert.ok(question.options.includes(question.answer))
    assert.ok(question.explanationFa && question.locator)
  })
})
test('switching lessons preserves both sessions, options and committed feedback including a legacy save', () => {
  let grammar = applyGrammar(undefined, start('a1-lesson-01', 'first'), now)!
  delete grammar.savedSessions // Legacy grammar-v1 snapshots have no map.
  const one = grammar.session!, item = one.items[0]
  grammar = applyGrammar(grammar, { type: 'grammar-answer', sessionId: one.sessionId, questionId: item.questionId, attemptId: 'one-answer', option: item.options[0] }, now)!
  const feedback = grammarFeedback(grammar)
  grammar = applyGrammar(grammar, start('a1-lesson-02', 'second'), now)!
  const two = structuredClone(grammar.session!)
  assert.ok(two.items.every(item => item.questionId.startsWith('a1-g02-')))
  assert.equal(grammar.savedSessions!['a1-lesson-01'].state, 'paused')
  assert.equal(grammarStats(grammar, 'a1-lesson-02').answered, 0)
  assert.equal(grammarStats(grammar, 'a1-lesson-01').answered, 1)
  assert.equal(validateGrammar(grammar), true)
  grammar = applyGrammar(grammar, start('a1-lesson-01', 'unused'), now)!
  assert.deepEqual(grammar.session!.items, one.items)
  assert.deepEqual(grammarFeedback(grammar), feedback)
  grammar = applyGrammar(grammar, start('a1-lesson-02', 'unused-again'), now)!
  assert.deepEqual(grammar.session, two)
  assert.equal(validateGrammar(JSON.parse(JSON.stringify(grammar))), true)
  const corrupt = structuredClone(grammar)
  corrupt.savedSessions!['a1-lesson-01'].items[0] = structuredClone(two.items[0])
  assert.equal(validateGrammar(corrupt), false)
  corrupt.savedSessions!['a1-lesson-01'] = { ...one, state: 'active' }
  assert.equal(validateGrammar(corrupt), false)
})
test('grammar lesson two works independently of vocabulary selection, with active time and collision guards', () => {
  let state = createInitialState(courseBundle, 'Europe/Berlin')
  state = transition(state, { type: 'select-lesson', lessonId: 'lesson-06' }, courseBundle, now)
  const before = structuredClone(state)
  state = transition(state, start('a1-lesson-02', 'two-time'), courseBundle, now)
  assert.equal(state.activeLessonId, 'lesson-06')
  assert.deepEqual(state.progress, before.progress)
  validateState(state, courseBundle)
  state = transition(state, { type: 'activity', eventId: 'two-second', sessionId: 'two-time', from: now, to: '2026-11-16T12:00:01.000Z', elapsedMs: 1000 }, courseBundle, '2026-11-16T12:00:01.000Z')
  assert.equal(state.grammar!.session!.activeMs, 1000)
  assert.equal(state.dailyActivity['2026-11-16'], 1000)
  state = transition(state, start('a1-lesson-01', 'one-time'), courseBundle, now)
  assert.equal(transition(state, { type: 'start-session', sessionId: 'two-time', seed: 1 }, courseBundle, now), state)
  validateState(state, courseBundle)
})
test('mistakes from lesson two get priority only in lesson-two batches', () => {
  let grammar = applyGrammar(undefined, start('a1-lesson-02', 'batch-two'), now)!
  const wrong = grammar.session!.items[0].questionId
  for (let index = 0; index < 5; index++) {
    const session = grammar.session!, item = session.items[session.cursor]
    const question = grammarQuestions.find(question => question.questionId === item.questionId)!
    grammar = applyGrammar(grammar, { type: 'grammar-answer', sessionId: session.sessionId, questionId: item.questionId, attemptId: 'two-answer-' + index,
      option: index === 0 ? item.options.find(option => option !== question.answer)! : question.answer }, now)!
    grammar = applyGrammar(grammar, { type: 'grammar-next', sessionId: session.sessionId, questionId: item.questionId }, now)!
  }
  grammar = applyGrammar(grammar, start('a1-lesson-01', 'batch-one'), now)!
  assert.ok(grammar.session!.items.every(item => item.questionId.startsWith('a1-g01-')))
  grammar = applyGrammar(grammar, start('a1-lesson-02', 'next-two'), now)!
  assert.equal(grammar.session!.items[0].questionId, wrong)
  assert.equal(validateGrammar(grammar), true)
})
