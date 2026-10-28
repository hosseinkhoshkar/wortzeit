import assert from 'node:assert/strict'
import test from 'node:test'
import { courseBundle } from './catalog.ts'
import { lessonOneBundle } from './lesson-one.ts'
import { lessonFourBundle } from './lesson-four.ts'
import { validateContent } from './validate.ts'

test('the catalog exposes two real lessons, all84 lesson4 entries and unchanged lesson1 identities', () => {
  assert.deepEqual(validateContent(courseBundle), [])
  assert.equal(courseBundle.entries.length, 104)
  assert.deepEqual(courseBundle.lessons?.map(lesson => lesson.lessonId), [lessonOneBundle.lesson.lessonId, 'lesson-04'])
  assert.deepEqual(courseBundle.entries.slice(0, 20), lessonOneBundle.entries)
  assert.deepEqual(courseBundle.entries.slice(20), lessonFourBundle.entries)
  assert.equal(new Set(courseBundle.entries.map(entry => entry.entryId)).size, 104)
  assert.equal(new Set(courseBundle.sourceRefs.map(ref => ref.sourceRefId)).size, courseBundle.sourceRefs.length)
})

test('lesson-aware validation rejects cross-lesson options and broken introduction/source mappings', () => {
  const badOption = structuredClone(courseBundle)
  badOption.entries[20].meaningOptionEntryIds[1] = badOption.entries[0].entryId
  assert.ok(validateContent(badOption).some(error => error.includes('meaning options')))
  const badIntroduction = structuredClone(courseBundle)
  badIntroduction.lessons![1].introducedEntryIds[0] = badIntroduction.entries[0].entryId
  assert.ok(validateContent(badIntroduction).some(error => error.includes('Introduction IDs')))
  const badSource = structuredClone(courseBundle)
  badSource.sourceRefs[0].lessonId = 'missing-lesson'
  assert.ok(validateContent(badSource).some(error => error.includes('source reference')))
})
