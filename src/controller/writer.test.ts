import assert from 'node:assert/strict'
import { test } from 'node:test'
import { lessonOneBundle as bundle } from '../content/lesson-one.ts'
import { createInitialState, currentTask, transition } from '../learning/engine.ts'
import { CommandWriter } from './writer.ts'
import type { AppState } from '../contracts/index.ts'

const now = '2026-10-28T12:00:00.000Z'
function clozeState() {
  let state = transition(createInitialState(bundle, 'Europe/Berlin'), { type: 'start-session', sessionId: 's', seed: 2 }, bundle, now)
  let task = currentTask(state)!
  state = transition(state, { type: 'reveal-card', taskId: task.taskId }, bundle, now)
  state = transition(state, { type: 'next', taskId: task.taskId }, bundle, now)
  task = currentTask(state)!
  assert.equal(task.kind, 'choose-meaning')
  state = transition(state, { type: 'answer', taskId: task.taskId, attemptId: 'meaning', answer: task.entryId }, bundle, now)
  state = transition(state, { type: 'next', taskId: task.taskId }, bundle, now)
  return state
}

test('failed draft commit retains later rapid edits and retry stores the displayed final text', async () => {
  const initial = clozeState(), task = currentTask(initial)!
  let persisted = structuredClone(initial), fail = true
  const seen: string[] = [], errors: unknown[] = []
  const writer = new CommandWriter(initial, { bundle, now: () => now,
    save: async (state, revision) => {
      assert.equal(revision, persisted.revision)
      if (fail) throw new Error('quota')
      persisted = structuredClone(state)
      seen.push(state.session!.draft)
    }, onSaved: () => {}, onBusy: () => {}, onError: error => { errors.push(error) },
  })
  const jobs = ['H', 'Ha', 'Hallo'].map(value => writer.submit({ type: 'draft', taskId: task.taskId, value }))
  await Promise.all(jobs.map(job => assert.rejects(job, /quota/)))
  assert.equal(persisted.session!.draft, '')
  fail = false
  await writer.retry()
  assert.deepEqual(seen, ['H', 'Ha', 'Hallo'])
  assert.equal(persisted.session!.draft, 'Hallo')
  assert.equal(errors.at(-1), null)
})

test('failed answer retry uses identical attempt ID and never announces an uncommitted state', async () => {
  const initial = clozeState(), task = currentTask(initial)!
  assert.equal(task.kind, 'cloze')
  const answer = bundle.entries.find(entry => entry.entryId === task.entryId)!.cloze.acceptedAnswers[0]
  let persisted = structuredClone(initial), fail = true
  const announced: AppState[] = []
  const writer = new CommandWriter(initial, { bundle, now: () => now,
    save: async state => { if (fail) throw new Error('disk'); persisted = structuredClone(state) },
    onSaved: state => { announced.push(state) }, onBusy: () => {}, onError: () => {},
  })
  const command = { type: 'answer' as const, taskId: task.taskId, attemptId: 'fixed-retry-id', answer }
  await assert.rejects(writer.submit(command), /disk/)
  assert.equal(announced.length, 0)
  assert.equal(persisted.attempts.length, initial.attempts.length)
  fail = false
  await writer.retry()
  assert.equal(persisted.attempts.filter(item => item.attemptId === command.attemptId).length, 1)
  const revision = persisted.revision
  await writer.submit(command)
  assert.equal(persisted.revision, revision)
})
