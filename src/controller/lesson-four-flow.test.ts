import assert from 'node:assert/strict'
import test from 'node:test'
import { courseBundle } from '../content/catalog.ts'
import { currentTask, createInitialState, transition } from '../learning/engine.ts'
import { validateState } from '../storage/index.ts'

test('all84 real lesson-four entries complete through valid sessions without introducing a lesson-one word', () => {
  const now = '2026-10-28T12:00:00.000Z'
  let state = createInitialState(courseBundle, 'Europe/Berlin')
  state = transition(state, { type: 'select-lesson', lessonId: 'lesson-04' }, courseBundle, now)
  const lessonEntries = courseBundle.entries.filter(entry => entry.introducedInLessonId === 'lesson-04')
  const byId = new Map(lessonEntries.map(entry => [entry.entryId, entry]))
  let attempts = 0
  for (let session = 0; session < 17; session++) {
    state = transition(state, { type: 'start-session', sessionId: `lesson4-${session}`, seed: session + 1 }, courseBundle, now)
    for (let step = 0; step < 300; step++) {
      const task = currentTask(state)
      if (!task) {
        state = transition(state, { type: 'end-session' }, courseBundle, now)
        break
      }
      const targets = task.kind === 'match' ? task.entryIds : [task.entryId]
      assert.ok(targets.every(id => byId.has(id)), 'all questions belong to lesson4')
      if (state.session!.feedback) {
        state = transition(state, { type: 'next', taskId: task.taskId }, courseBundle, now)
        continue
      }
      if (task.kind === 'flashcard') {
        state = transition(state, { type: 'reveal-card', taskId: task.taskId }, courseBundle, now)
        state = transition(state, { type: 'next', taskId: task.taskId }, courseBundle, now)
        continue
      }
      if (task.kind === 'match') {
        const id = task.entryIds.find(id => !task.matchedEntryIds.includes(id))!
        state = transition(state, { type: 'answer', taskId: task.taskId, attemptId: `actual4-${attempts++}`, entryId: id, answer: id }, courseBundle, now)
      } else {
        const entry = byId.get(task.entryId)!
        const answer = task.kind === 'choose-meaning' ? entry.entryId
          : task.kind === 'choose-article' ? entry.nounData!.article
            : task.kind === 'write-word' ? entry.writing.acceptedAnswers[0] : entry.cloze.acceptedAnswers[0]
        state = transition(state, { type: 'answer', taskId: task.taskId, attemptId: `actual4-${attempts++}`, answer }, courseBundle, now)
      }
    }
    assert.equal(state.session!.state, 'ended')
    assert.ok(state.session!.introducedEntryIds.length <= 5)
    validateState(state, courseBundle)
    state = structuredClone(state)
  }
  assert.equal(Object.keys(state.progress).length, 84)
  assert.ok(lessonEntries.every(entry => state.progress[entry.entryId] && !state.progress[entry.entryId].initialRecallPending))
  assert.ok(Object.values(state.progress).every(progress => progress.wrongCount === 0 && progress.intervalIndex === 0))
})
