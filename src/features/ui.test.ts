import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { test } from 'node:test'
import { pathToFileURL } from 'node:url'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import ts from 'typescript'
import type { Entry, EntryProgress, SessionTask, WortzeitUIProps } from '../contracts/index.ts'
import { lessonOneBundle as bundle } from '../content/lesson-one.ts'
import { createInitialState } from '../learning/engine.ts'

// Native Node does not load TSX/CSS. Compile the real view in memory and render it
// with React SSR. These are static content/accessibility checks, not browser proof.
const require = createRequire(import.meta.url)
const source = readFileSync(new URL('./WortzeitUI.tsx', import.meta.url), 'utf8')
const javascript = ts.transpileModule(`${source}\nexport { TaskPanel, SkillDetails }`, {
  compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2023 },
}).outputText.replace(/import ['"]\.\.\/App\.css['"];?/u, '')
  .replace(/from (['"])(react(?:\/jsx-runtime)?)\1/gu,
    (_match, _quote: string, specifier: string) => `from '${pathToFileURL(require.resolve(specifier)).href}'`)
const view = await import(`data:text/javascript;base64,${Buffer.from(javascript).toString('base64')}`)
const now = '2026-10-28T12:00:00.000Z'

function propsFor(task: SessionTask): WortzeitUIProps {
  const state = createInitialState(bundle, 'Europe/Berlin')
  state.session = {
    sessionId: 'ui-session', contentVersion: bundle.contentVersion, state: 'active', startedAt: now,
    endedAt: null, queue: [task], cursor: 0, introducedEntryIds: [], draft: '', feedback: null,
    activeMs: 0, targetAcknowledged: false, targetAcknowledgedDate: null,
  }
  return {
    bundle, state, stats: { introduced: 0, due: 0, newCount: 20, correct: 0, totalAnswers: 0, nextDueAt: null, todayActiveMs: 0, stabilized: 0 },
    summary: { practiced: 0, introduced: 0, correct: 0, totalAnswers: 0, needsReview: 0, remaining: 1, nextDueAt: null, activeMs: 0, assisted: 0 },
    statuses: Object.fromEntries(bundle.entries.map(entry => [entry.entryId, 'new'])), now,
    busy: false, error: null, offlineStatus: 'unavailable', onCommand: async () => {}, onRetry: () => {},
    onSessionVisibilityChange: () => {},
  }
}
function renderTask(task: SessionTask, props = propsFor(task)) {
  return renderToStaticMarkup(createElement(view.TaskPanel, { task, props }))
}
const noun = bundle.entries.find(entry => entry.nounData)!
const verb = bundle.entries.find(entry => entry.partOfSpeech === 'verb')!
const writing = (entry: Entry): SessionTask => ({ taskId: 'write', kind: 'write-word', entryId: entry.entryId, cycleKind: 'scheduled' })

test('writing displays only Persian prompt/cue before answering, with German LTR draft input', () => {
  const task = writing(noun)
  const props = propsFor(task)
  props.state.session!.draft = 'An'
  const html = renderTask(task, props)
  assert.ok(html.includes(noun.writing.promptFa))
  assert.ok(html.includes(noun.writing.cueFa))
  assert.ok(!html.includes(noun.writing.acceptedAnswers[0]))
  assert.match(html, /id="german-answer" lang="de" dir="ltr"/u)
  assert.match(html, /value="An"/u)
  assert.match(html, /نمایش پاسخ/u)
})

test('article question hides the article until feedback and provides all three touch options', () => {
  const task: SessionTask = { taskId: 'article', kind: 'choose-article', entryId: noun.entryId, options: ['das', 'der', 'die'] }
  const props = propsFor(task)
  const html = renderTask(task, props)
  assert.ok(html.includes(noun.lemma))
  assert.ok(!html.includes('class="article"'))
  for (const option of task.options) assert.ok(html.includes(`>${option}</button>`))
  props.state.session!.feedback = { attemptId: 'a', entryId: noun.entryId, correct: true, expectedAnswer: noun.nounData!.article, explanationFa: 'ثبت شد', assisted: false }
  const answered = renderTask(task, props)
  assert.match(answered, /class="article"/u)
  assert.ok(answered.includes(noun.meaningFa))
})

test('accepted written variants still show the canonical answer and assisted evidence explicitly', () => {
  const task = writing(noun)
  const props = propsFor(task)
  props.state.session!.draft = noun.writing.acceptedAnswers[0].toLocaleLowerCase('de')
  props.state.session!.feedback = { attemptId: 'a', entryId: noun.entryId, correct: true, expectedAnswer: noun.writing.acceptedAnswers[0], explanationFa: 'ثبت شد', assisted: true }
  const html = renderTask(task, props)
  assert.match(html, /صورت معیار:/u)
  assert.ok(html.includes(noun.writing.acceptedAnswers[0]))
  assert.match(html, /این تلاش با کمک ثبت شد/u)
  assert.match(html, /یادآوری مستقل یا پلهٔ تازهٔ مرور محسوب نمی‌شود/u)
})

test('persisted answer assistance reveals only after assisted state and event are present', () => {
  const task: SessionTask = { ...writing(verb), assisted: true }
  const props = propsFor(task)
  props.state.assistanceEvents.push({ eventId: 'help', sessionId: 'ui-session', taskId: task.taskId,
    entryId: verb.entryId, kind: 'answer', at: now, studyDate: '2026-10-28' })
  const html = renderTask(task, props)
  assert.ok(html.includes(verb.writing.acceptedAnswers[0]))
  assert.match(html, /این تلاش مستقل محسوب نمی‌شود/u)
})

test('skill details separate all four counts and mark article inapplicable to a verb', () => {
  const counts = { correct: 4, wrong: 2, assisted: 1, unassistedCorrect: 3, lastAttemptAt: now }
  const progress: EntryProgress = { entryId: verb.entryId, introducedAt: now, initialRecallPending: false,
    nextDueAt: now, intervalIndex: 0, lastSuccessDate: '2026-10-28', scheduledReviewDates: [], correctCount: 4,
    wrongCount: 2, pendingError: null, skills: { meaning: counts, writing: counts, article: null } }
  const html = renderToStaticMarkup(createElement(view.SkillDetails, { entry: verb, progress }))
  for (const label of ['شناخت معنی', 'نوشتن واژه', 'آرتیکل', 'درست', 'غلط', 'با کمک', 'بدون کمک']) assert.ok(html.includes(label))
  assert.match(html, /برای این مدخل کاربرد ندارد/u)
  assert.match(html, /جمع این آمار، معیار تسلط نیست/u)
})
