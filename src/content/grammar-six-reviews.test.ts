import assert from 'node:assert/strict'
import test from 'node:test'
import { grammarSixQuestions } from './grammar-six.ts'
import { grammarSixReviews } from './grammar-six-reviews.ts'

test('all fifty lesson-six questions have teaching notes keyed by their stable identities', () => {
  assert.deepEqual(Object.keys(grammarSixReviews).sort(), grammarSixQuestions.map(q => q.questionId).sort())
  assert.equal(new Set(grammarSixQuestions.map(q => q.review?.exampleDe)).size, 50)
  for (const question of grammarSixQuestions) {
    const review = question.review!
    assert.ok(review, question.questionId)
    for (const value of Object.values(review)) assert.ok(value.trim().length > 0, question.questionId)
    assert.ok(review.ruleFa !== question.explanationFa)
    assert.ok(!review.exampleDe.includes('___'))
    assert.match(review.exampleFa, /[آ-ی]/u)
  }
})
