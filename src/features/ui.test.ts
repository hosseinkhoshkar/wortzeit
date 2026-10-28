import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { test } from 'node:test'
import { pathToFileURL } from 'node:url'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import ts from 'typescript'
import type { ContentBundle, Entry, EntryProgress, LessonDefinition, SessionTask, WortzeitUIProps } from '../contracts/index.ts'
import { lessonOneBundle as bundle } from '../content/lesson-one.ts'
import { createInitialState } from '../learning/engine.ts'

// Native Node does not load TSX/CSS. Compile the real view in memory and render it
// with React SSR. These are static content/accessibility checks, not browser proof.
const require = createRequire(import.meta.url)
const source = readFileSync(new URL('./WortzeitUI.tsx', import.meta.url), 'utf8')
const javascript = ts.transpileModule(`${source}\nexport { TaskPanel, SkillDetails, LessonCards, LessonWordList, lessonEntries }`, {
  compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2023 },
}).outputText.replace(/import ['"]\.\.\/App\.css['"];?/u, '')
  .replace(/from (['"])(react(?:\/jsx-runtime)?)\1/gu,
    (_match, _quote: string, specifier: string) => `from '${pathToFileURL(require.resolve(specifier)).href}'`)
const view = await import(`data:text/javascript;base64,${Buffer.from(javascript).toString('base64')}`)
const now = '2026-10-28T12:00:00.000Z'

function propsFor(task: SessionTask): WortzeitUIProps {
  const state = createInitialState(bundle, 'Europe/Berlin')
  state.session = {
    sessionId: 'ui-session', lessonId: bundle.lesson.lessonId, contentVersion: bundle.contentVersion, state: 'active', startedAt: now,
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

// A synthetic fourth-lesson fixture checks view separation without claiming book coverage.
const lessonFour: LessonDefinition = { lessonId: 'lesson-04', titleDe: 'Spiel und Spaß', titleFa: 'بازی و سرگرمی', level: 'A1', coverage: 'partial', introducedEntryIds: ['fixture-four'] }
const fourthWord: Entry = { ...noun, entryId: 'fixture-four', introducedInLessonId: 'lesson-04', lemma: 'Kurs', meaningFa: 'دورهٔ آزمایشی چهارم', sourceRefIds: ['fixture-four-ref'], occurrences: [{ lessonId: 'lesson-04', sourceRefIds: ['fixture-four-ref'] }] }
const course: ContentBundle = { ...bundle, lessons: [bundle.lesson, lessonFour], entries: [...bundle.entries, fourthWord], sourceRefs: [...bundle.sourceRefs, { sourceRefId: 'fixture-four-ref', sourceId: bundle.sources[0].sourceId, lessonId: 'lesson-04', locator: 'fixture, not book content' }] }

test('lesson cards expose each ready lesson independently with real counts and active selection', () => {
  const html = renderToStaticMarkup(createElement(view.LessonCards, { activeLessonId: 'lesson-04', disabled: false, onChoose: async () => {}, summaries: [
    { lesson: bundle.lesson, total: 20, introduced: 5, due: 2, stabilized: 0 },
    { lesson: lessonFour, total: 84, introduced: 0, due: 0, stabilized: 0 },
  ] }))
  assert.equal((html.match(/data-lesson-id=/gu) ?? []).length, 2)
  assert.ok(html.includes(`data-lesson-id="${bundle.lesson.lessonId}"`))
  assert.match(html, /class="lesson-card lesson-current" data-lesson-id="lesson-04"/u)
  assert.ok(html.includes('ورود به درس اول') && html.includes('ورود به درس چهارم'))
  assert.ok(html.includes('Ich und die anderen') && html.includes('Spiel und Spaß'))
  assert.match(html, /aria-valuemax="84" aria-valuenow="0"/u)
  assert.ok(!html.includes('lesson-02') && !html.includes('lesson-03'))
})

test('selected lesson home uses its title and count while retaining a visible lessons navigation', () => {
  const props = propsFor(writing(noun))
  props.bundle = course
  props.state.activeLessonId = lessonFour.lessonId
  props.state.session = null
  props.activeLesson = lessonFour
  const html = renderToStaticMarkup(createElement(view.WortzeitUI, props))
  const hero = html.match(/<section class="hero-panel">([\s\S]*?)<\/section>/u)?.[1] ?? ''
  assert.ok(hero.includes('Spiel und Spaß') && hero.includes('درس چهارم'))
  assert.ok(!hero.includes('Ich und die anderen') && !hero.includes('درس اول'))
  assert.match(html, /Lektion 04/u)
  assert.match(html, /تغییر درس/u)
  assert.match(html, /دسترسی به درس‌ها/u)
  assert.match(html, /واژه‌های معرفی‌شده در بسته" aria-valuemin="0" aria-valuemax="1"/u)
})

test('fourth lesson vocabulary renders only that lesson and keeps unrelated entries hidden', () => {
  const props = propsFor(writing(noun))
  props.bundle = course
  props.state.activeLessonId = lessonFour.lessonId
  const entries = view.lessonEntries(course, lessonFour.lessonId)
  const html = renderToStaticMarkup(createElement(view.LessonWordList, { entries, props: { ...props, statuses: { ...props.statuses, 'fixture-four': 'new' } } }))
  assert.equal(entries.length, 1)
  assert.ok(html.includes('دورهٔ آزمایشی چهارم') && html.includes('Kurs'))
  const main = [...html.matchAll(/class="word-item-main">([\s\S]*?)<\/span><span class="word-status/gu)]
  assert.equal(main.length, 1)
  assert.ok(main[0][1].includes('Kurs') && main[0][1].includes('دورهٔ آزمایشی چهارم'))
  assert.ok(!main[0][1].includes('Hallo') && !main[0][1].includes('Familienname'))
  assert.match(html, /lang="de" dir="ltr"/u)
})
