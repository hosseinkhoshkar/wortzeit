import assert from 'node:assert/strict'
import test from 'node:test'
import { grammarSevenQuestions } from './grammar-seven.ts'

test('all fifty lesson-seven questions have complete teaching notes and four unique options', () => {
  assert.equal(grammarSevenQuestions.length, 50)
  assert.equal(new Set(grammarSevenQuestions.map(q => q.review?.exampleDe)).size, 50)
  for (const [index, question] of grammarSevenQuestions.entries()) {
    assert.equal(question.questionId, `a1-g07-${String(index + 1).padStart(3, '0')}`)
    assert.equal(new Set(question.options).size, 4)
    assert.equal(question.options.filter(option => option === question.answer).length, 1)
    for (const value of Object.values(question.review!)) assert.ok(value.trim().length > 0)
    assert.match(question.review!.exampleFa, /[آ-ی]/u)
    assert.ok(question.review!.ruleFa !== question.explanationFa)
    assert.ok(!question.review!.exampleDe.includes('___'))
    assert.ok(!/[آ-ی]/u.test(question.sentenceDe))
  }
})
