import assert from 'node:assert/strict'
import test from 'node:test'
import { grammarQuestions } from '../content/grammar-catalog.ts'
import { applyGrammar, grammarFeedback, grammarStats, validateGrammar } from './grammar.ts'

// Additional fifty-question lessons are added one release at a time.
const lessonIds = ['a1-lesson-03']
const now = '2026-11-16T12:00:00.000Z'
for (const lessonId of lessonIds) {
  const questions = grammarQuestions.filter(question => question.lessonId === lessonId)
  test(lessonId + ': 50 authored, unambiguous-format questions with stable IDs and complete feedback', () => {
    assert.equal(questions.length, 50)
    assert.equal(new Set(questions.map(question => question.sentenceDe)).size, 50)
    assert.equal(new Set(grammarQuestions.map(question => question.questionId)).size, grammarQuestions.length)
    for (const [index, question] of questions.entries()) {
      assert.equal(question.questionId, `a1-g${lessonId.slice(-2)}-${String(index + 1).padStart(3, '0')}`)
      assert.equal(question.options.length, 4)
      assert.equal(new Set(question.options).size, 4)
      assert.equal(question.options.filter(option => option === question.answer).length, 1)
      assert.ok(question.promptFa && question.explanationFa && question.locator)
      assert.equal(question.origin, 'authored')
    }
  })
  test(lessonId + ': ten batches cover all fifty questions before repeating correctly answered questions', () => {
    let state: ReturnType<typeof applyGrammar>
    const seen = new Set<string>()
    for (let batch = 0; batch < 10; batch++) {
      state = applyGrammar(state, { type: 'grammar-start', lessonId, sessionId: lessonId + '-batch-' + batch, seed: 31 + batch }, now)!
      for (let index = 0; index < 5; index++) {
        const session = state.session!, item = session.items[session.cursor]
        const question = questions.find(question => question.questionId === item.questionId)!
        assert.ok(question && !seen.has(question.questionId))
        seen.add(question.questionId)
        assert.equal(applyGrammar(state, { type: 'grammar-next', sessionId: session.sessionId, questionId: question.questionId }, now), state)
        const command = { type: 'grammar-answer' as const, sessionId: session.sessionId, questionId: question.questionId,
          attemptId: lessonId + '-answer-' + seen.size, option: question.answer }
        state = applyGrammar(state, command, now)!
        assert.equal(applyGrammar(state, command, now), state)
        assert.ok(grammarFeedback(state)?.correct)
        assert.equal(validateGrammar(state), true)
        state = applyGrammar(state, { type: 'grammar-next', sessionId: session.sessionId, questionId: question.questionId }, now)!
      }
    }
    assert.equal(seen.size, 50)
    assert.equal(grammarStats(state, lessonId).answered, 50)
    assert.equal(grammarStats(state, lessonId).mistakes, 0)
  })
  test(lessonId + ': switching and JSON persistence preserve feedback, option order and isolated statistics', () => {
    let state = applyGrammar(undefined, { type: 'grammar-start', lessonId, sessionId: lessonId + '-saved', seed: 9 }, now)!
    const session = structuredClone(state.session!), item = session.items[0]
    const question = questions.find(question => question.questionId === item.questionId)!
    state = applyGrammar(state, { type: 'grammar-answer', sessionId: session.sessionId, questionId: item.questionId,
      attemptId: lessonId + '-wrong', option: item.options.find(option => option !== question.answer)! }, now)!
    const feedback = grammarFeedback(state)
    state = applyGrammar(state, { type: 'grammar-start', lessonId: 'a1-lesson-01', sessionId: lessonId + '-other', seed: 2 }, now)!
    state = JSON.parse(JSON.stringify(state))
    assert.equal(validateGrammar(state), true)
    assert.equal(grammarStats(state, 'a1-lesson-01').answered, 0)
    state = applyGrammar(state, { type: 'grammar-start', lessonId, sessionId: 'unused', seed: 4 }, now)!
    assert.deepEqual(state.session!.items, session.items)
    assert.deepEqual(grammarFeedback(state), feedback)
    assert.equal(grammarStats(state, lessonId).mistakes, 1)
  })
}
