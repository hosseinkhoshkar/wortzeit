/* global indexedDB, document, IDBObjectStore, navigator, sessionStorage, structuredClone, requestAnimationFrame */
import assert from 'node:assert/strict'
import { createServer } from 'node:http'
import { readFile, mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { chromium } from 'playwright'
import ts from 'typescript'
import { courseBundle as bundle } from '../src/content/catalog.ts'
import { lessonOneBundle } from '../src/content/lesson-one.ts'
import { validateVersionTwoState } from '../src/storage/legacy-v2.ts'
import { createInitialState, transition } from '../src/learning/engine.ts'

const results = []
const diagnostics = []
const pageErrors = []
const observedPages = new Map()
const exercisedKinds = new Set()
function observeContext(context) {
  context.on('page', page => {
    const id = observedPages.size + 1
    observedPages.set(page, id)
    page.on('pageerror', error => {
      const record = { kind: 'pageerror', tab: id, url: page.url(), message: error.message, stack: error.stack }
      pageErrors.push(record)
      diagnostics.push(record)
    })
    page.on('console', event => {
      if (event.type() === 'error') diagnostics.push({ kind: 'console', tab: id, url: page.url(), message: event.text() })
    })
  })
}
async function capture(page, phase) {
  const record = { phase, tab: observedPages.get(page), closed: page.isClosed() }
  if (!page.isClosed()) {
    record.url = page.url()
    record.screen = await page.evaluate(async () => ({
      boot: document.querySelector('.boot-screen')?.textContent ?? null,
      error: document.querySelector('[role="alert"]')?.textContent ?? null,
      locks: navigator.locks ? await navigator.locks.query() : null,
    })).catch(error => ({ error: error.message }))
    record.state = await readState(page).catch(error => ({ error: error.message }))
  }
  diagnostics.push(record)
}
const directory = path.resolve('test-results')
await mkdir(directory, { recursive: true })
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.webmanifest': 'application/manifest+json' }
const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname)
    if (pathname.startsWith('/__test/src/') && pathname.endsWith('.ts')) {
      const file = path.resolve(pathname.slice('/__test/'.length))
      if (!file.startsWith(path.resolve('src') + path.sep)) throw new Error('Invalid test module')
      const source = await readFile(file, 'utf8')
      response.setHeader('Content-Type', 'text/javascript')
      response.end(ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2023, module: ts.ModuleKind.ESNext } }).outputText)
      return
    }
    if (pathname === '/__test/setup') { response.setHeader('Content-Type', 'text/html'); response.end('<!doctype html><title>Wortzeit isolated storage test</title>'); return }
    const file = path.resolve('dist', pathname === '/' ? 'index.html' : `.${pathname}`)
    if (!file.startsWith(path.resolve('dist') + path.sep)) throw new Error('Invalid path')
    const data = await readFile(file)
    response.setHeader('Content-Type', types[path.extname(file)] ?? 'application/octet-stream')
    response.setHeader('Cache-Control', 'no-store')
    response.end(data)
  } catch { response.statusCode = 404; response.end('Not found') }
})
let browser
let origin
async function checkpoint(name, action) {
  await action()
  results.push({ name, passed: true })
  console.log(`PASS ${name}`)
}
async function saveScreenshot(page, name) {
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))))
  try {
    await page.screenshot({ path: path.join(directory, name), fullPage: true })
  } catch (error) {
    if (!error.message.includes('Unable to capture screenshot')) throw error
    diagnostics.push({ kind: 'screenshot-viewport-fallback', name })
    await page.screenshot({ path: path.join(directory, name), fullPage: false })
  }
}
async function readState(page) {
  return page.evaluate(() => new Promise((resolve, reject) => {
    const open = indexedDB.open('wortzeit-progress', 1)
    open.onerror = () => reject(open.error)
    open.onsuccess = () => {
      const db = open.result
      const transaction = db.transaction('user-state', 'readonly')
      const request = transaction.objectStore('user-state').get('current')
      transaction.oncomplete = () => { db.close(); resolve(request.result ?? null) }
      transaction.onerror = () => { db.close(); reject(transaction.error) }
    }
  }))
}
async function waitState(page, predicate) {
  for (let count = 0; count < 160; count++) {
    const state = await readState(page)
    if (state && predicate(state)) return state
    await new Promise(resolve => setTimeout(resolve, 50))
  }
  throw new Error('Persisted state did not reach the expected condition')
}
function learningSnapshot(state) {
  if (!state) return null
  return JSON.stringify({ progress: state.progress, attempts: state.attempts, assistanceEvents: state.assistanceEvents,
    session: state.session ? { ...state.session, activeMs: 0 } : null })
}
async function clickAndSave(page, locator, resume = false) {
  const before = await readState(page)
  await locator.click()
  return waitState(page, state => state.revision > (before?.revision ?? 0)
    && (resume || learningSnapshot(state) !== learningSnapshot(before)))
}
async function continueFeedback(page, state) {
  const task = state.session.queue[state.session.cursor]
  return clickAndSave(page, page.getByRole('button', { name: task.kind === 'match' && task.matchedEntryIds.length < 4 ? 'ادامهٔ بازی' : 'ادامه', exact: true }))
}
async function playToEnd(page, stopAtWritten = false) {
  for (let step = 0; step < 150; step++) {
    const state = await readState(page), session = state.session
    if (session.state === 'ended') return state
    const task = session.queue[session.cursor]
    exercisedKinds.add(task.kind)
    if (session.feedback) { await continueFeedback(page, state); continue }
    if (stopAtWritten && (task.kind === 'cloze' || task.kind === 'write-word')) return state
    const entry = task.kind === 'match' ? null : bundle.entries.find(entry => entry.entryId === task.entryId)
    if (task.kind === 'flashcard') {
      if (!task.revealed) await clickAndSave(page, page.getByRole('button', { name: 'چرخاندن کارت و نمایش معنی', exact: true }))
      await clickAndSave(page, page.getByRole('button', { name: 'برویم سراغ تمرین', exact: false }))
    } else if (task.kind === 'choose-meaning') {
      await clickAndSave(page, page.locator('.meaning-option').nth(task.optionIds.indexOf(task.entryId)))
    } else if (task.kind === 'cloze' || task.kind === 'write-word') {
      const answer = task.kind === 'write-word' ? entry.writing.acceptedAnswers[0] : entry.cloze.acceptedAnswers[0]
      await page.getByLabel('پاسخ تو', { exact: true }).fill(answer)
      await waitState(page, state => state.session.draft === answer)
      await clickAndSave(page, page.getByRole('button', { name: 'بررسی پاسخ', exact: false }))
    } else if (task.kind === 'choose-article') {
      await clickAndSave(page, page.locator('.article-option').nth(task.options.indexOf(entry.nounData.article)))
    } else {
      const id = task.entryIds.find(id => !task.matchedEntryIds.includes(id))
      await page.locator('.match-column').nth(0).locator('button').nth(task.leftOrder.indexOf(id)).click()
      await clickAndSave(page, page.locator('.match-column').nth(1).locator('button').nth(task.rightOrder.indexOf(id)))
    }
  }
  throw new Error('Session did not terminate')
}

function oldVersionTwoDraft() {
  const now = new Date().toISOString()
  let state = transition(createInitialState(lessonOneBundle, 'Europe/Berlin'), { type: 'start-session', sessionId: 'existing-v2-session', seed: 7 }, lessonOneBundle, now)
  for (let index = 0; index < 30; index++) {
    const task = state.session.queue[state.session.cursor]
    if (state.session.feedback) state = transition(state, { type: 'next', taskId: task.taskId }, lessonOneBundle, now)
    else if (task.kind === 'flashcard') {
      state = transition(state, { type: 'reveal-card', taskId: task.taskId }, lessonOneBundle, now)
      state = transition(state, { type: 'next', taskId: task.taskId }, lessonOneBundle, now)
    } else if (task.kind === 'choose-meaning') state = transition(state, { type: 'answer', taskId: task.taskId, attemptId: `existing-${index}`, answer: task.entryId }, lessonOneBundle, now)
    else {
      assert.ok(task.kind === 'cloze' || task.kind === 'write-word')
      state = transition(state, { type: 'draft', taskId: task.taskId, value: 'mein alter Entwurf' }, lessonOneBundle, now)
      state = transition(state, { type: 'pause' }, lessonOneBundle, now)
      const old = structuredClone(state)
      old.schemaVersion = 2
      delete old.activeLessonId
      delete old.savedSessions
      delete old.session.lessonId
      validateVersionTwoState(old, lessonOneBundle)
      return old
    }
  }
  throw new Error('Could not construct prior saved session')
}

try {
  await readFile('dist/index.html')
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
  origin = `http://127.0.0.1:${server.address().port}`
  browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({ viewport: { width: 360, height: 800 }, isMobile: true, hasTouch: true, locale: 'fa-IR', timezoneId: 'Europe/Berlin', reducedMotion: 'reduce' })
  observeContext(context)
  let page = await context.newPage()
  await page.goto(origin)
  await page.getByRole('button', { name: 'ادامهٔ یادگیری', exact: true }).waitFor()
  await checkpoint('mobile home / RTL / no horizontal overflow at 320, 360 and 1280', async () => {
    for (const width of [320, 360, 1280]) {
      await page.setViewportSize({ width, height: 850 })
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth), true)
      await saveScreenshot(page, `home-${width}.png`)
    }
    await page.setViewportSize({ width: 360, height: 800 })
  })
  await page.locator('.offline-pill').filter({ hasText: 'آمادهٔ آفلاین' }).waitFor({ timeout: 20_000 })
  await clickAndSave(page, page.getByRole('button', { name: 'ادامهٔ یادگیری', exact: true }))
  await checkpoint('card is not a correct answer; wrong answer is persisted before feedback', async () => {
    await clickAndSave(page, page.getByRole('button', { name: 'چرخاندن کارت و نمایش معنی', exact: true }))
    assert.equal((await readState(page)).attempts.length, 0)
    await clickAndSave(page, page.getByRole('button', { name: 'برویم سراغ تمرین', exact: false }))
    const state = await readState(page), task = state.session.queue[state.session.cursor]
    const wrong = task.optionIds.findIndex(id => id !== task.entryId)
    await clickAndSave(page, page.locator('.meaning-option').nth(wrong))
    const answered = await readState(page)
    assert.equal(answered.attempts.length, 1)
    assert.equal(answered.attempts[0].correct, false)
    assert.equal(answered.progress[task.entryId].pendingError.remainingOtherAnswers, 3)
    await page.reload()
    await page.getByRole('button', { name: 'ادامهٔ یادگیری', exact: true }).click()
    await page.getByRole('button', { name: 'ادامه', exact: true }).waitFor()
    assert.equal((await readState(page)).attempts.length, 1)
  })
  await checkpoint('full five-word session including retry and four correct matching pairs', async () => {
    const ended = await playToEnd(page)
    assert.equal(ended.session.introducedEntryIds.length, 5)
    assert.equal(Object.keys(ended.progress).length, 5)
    assert.equal(ended.attempts.filter(attempt => attempt.exercise === 'match' && attempt.correct).length, 4)
    assert.equal(new Set(ended.attempts.map(attempt => attempt.attemptId)).size, ended.attempts.length)
    await page.getByRole('heading', { name: /این بود نوبت/ }).waitFor()
    await saveScreenshot(page, 'summary-360.png')
  })
  await checkpoint('offline close/reopen and resume preserve progress and draft', async () => {
    const before = await readState(page)
    await context.setOffline(true)
    await page.close()
    page = await context.newPage()
    await page.goto(origin)
    await page.getByRole('button', { name: 'ادامهٔ یادگیری', exact: true }).waitFor()
    assert.equal((await readState(page)).attempts.length, before.attempts.length)
    await clickAndSave(page, page.getByRole('button', { name: 'ادامهٔ یادگیری', exact: true }))
    const written = await playToEnd(page, true)
    assert.equal(written.session.state, 'active')
    await page.getByLabel('پاسخ تو', { exact: true }).fill('متنِ ذخیره‌شده')
    await waitState(page, state => state.session.draft === 'متنِ ذخیره‌شده')
    await page.reload()
    await page.getByRole('button', { name: 'ادامهٔ یادگیری', exact: true }).click()
    await page.getByLabel('پاسخ تو', { exact: true }).waitFor()
    assert.equal(await page.getByLabel('پاسخ تو', { exact: true }).inputValue(), 'متنِ ذخیره‌شده')
    await saveScreenshot(page, 'offline-cloze-360.png')
  })
  await context.setOffline(false)
  await checkpoint('second tab cannot write; lock is released after closing first tab', async () => {
    await clickAndSave(page, page.getByRole('button', { name: 'توقف و بازگشت', exact: true }))
    const stored = await readState(page)
    const other = await context.newPage()
    await other.goto(origin)
    await other.getByRole('alert').filter({ hasText: 'تب دیگری' }).waitFor()
    assert.equal(await other.getByRole('button', { name: 'ادامهٔ یادگیری', exact: true }).count(), 0)
    assert.deepEqual(await readState(other), stored)
    await capture(page, 'owner-before-close')
    await capture(other, 'contender-before-close')
    await page.close()
    await capture(other, 'owner-closed-before-retry')
    await other.getByRole('button', { name: 'تلاش دوباره', exact: true }).click()
    await other.getByRole('button', { name: 'ادامهٔ یادگیری', exact: true }).waitFor()
    await capture(other, 'takeover-ready')
    assert.deepEqual(await readState(other), stored, 'taking ownership does not rewrite persisted progress')
    await clickAndSave(other, other.getByRole('button', { name: 'ادامهٔ یادگیری', exact: true }), true)
    await other.getByLabel('پاسخ تو', { exact: true }).waitFor()
    assert.equal(await other.getByLabel('پاسخ تو', { exact: true }).inputValue(), stored.session.draft)
    const resumed = await readState(other)
    assert.deepEqual(resumed.attempts, stored.attempts)
    assert.deepEqual(resumed.progress, stored.progress)
    assert.deepEqual(resumed.session.queue, stored.session.queue)
    assert.equal(resumed.session.cursor, stored.session.cursor)
    assert.equal(resumed.session.sessionId, stored.session.sessionId)
    page = other
  })
  await checkpoint('queued retry cannot write while owner is active and cancelled requests are removed', async () => {
    await clickAndSave(page, page.getByRole('button', { name: 'توقف و بازگشت', exact: true }))
    const stored = await readState(page)
    const cancelled = await context.newPage()
    await cancelled.goto(origin)
    await cancelled.getByRole('alert').filter({ hasText: 'تب دیگری' }).waitFor()
    await cancelled.getByRole('button', { name: 'تلاش دوباره', exact: true }).click()
    await page.waitForFunction(async () => (await navigator.locks.query()).pending.some(lock => lock.name === 'wortzeit-single-writer'))
    assert.deepEqual(await readState(page), stored)
    await cancelled.close()
    await page.waitForFunction(async () => !(await navigator.locks.query()).pending.some(lock => lock.name === 'wortzeit-single-writer'))
    const queued = await context.newPage()
    await queued.goto(origin)
    await queued.getByRole('alert').filter({ hasText: 'تب دیگری' }).waitFor()
    await queued.getByRole('button', { name: 'تلاش دوباره', exact: true }).click()
    await page.waitForFunction(async () => (await navigator.locks.query()).pending.some(lock => lock.name === 'wortzeit-single-writer'))
    assert.equal(await queued.getByRole('button', { name: 'ادامهٔ یادگیری', exact: true }).count(), 0)
    assert.deepEqual(await readState(queued), stored)
    await capture(queued, 'retry-pending-while-owner-active')
    await page.close()
    await queued.getByRole('button', { name: 'ادامهٔ یادگیری', exact: true }).waitFor()
    assert.deepEqual(await readState(queued), stored)
    await capture(queued, 'queued-retry-acquired')
    page = queued
  })
  await checkpoint('new noun session includes word writing and applicable article exercises on mobile', async () => {
    await clickAndSave(page, page.getByRole('button', { name: 'ادامهٔ یادگیری', exact: true }), true)
    await playToEnd(page)
    await clickAndSave(page, page.getByRole('button', { name: 'ادامهٔ یادگیری', exact: true }))
    await playToEnd(page)
    assert.ok(exercisedKinds.has('write-word'))
    assert.ok(exercisedKinds.has('choose-article'))
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth), true)
    await saveScreenshot(page, 'phase-two-summary-360.png')
  })
  await context.close()
  await checkpoint('existing V2 progress migrates; lesson sections isolate 84 words and preserve each draft offline', async () => {
    const isolated = await browser.newContext({ viewport: { width: 360, height: 800 }, isMobile: true, hasTouch: true, locale: 'fa-IR' })
    observeContext(isolated)
    const lessonPage = await isolated.newPage()
    await lessonPage.goto(`${origin}/__test/setup`)
    const old = oldVersionTwoDraft()
    await lessonPage.evaluate(old => new Promise((resolve, reject) => {
      const open = indexedDB.open('wortzeit-progress', 1)
      open.onupgradeneeded = () => open.result.createObjectStore('user-state')
      open.onerror = () => reject(open.error)
      open.onsuccess = () => {
        const db = open.result, tx = db.transaction('user-state', 'readwrite')
        tx.objectStore('user-state').put(old, 'current')
        tx.oncomplete = () => { db.close(); resolve() }
        tx.onerror = () => reject(tx.error)
      }
    }), old)
    await lessonPage.goto(origin)
    await lessonPage.getByRole('button', { name: 'ادامهٔ یادگیری', exact: true }).waitFor()
    const migrated = await readState(lessonPage)
    assert.equal(migrated.schemaVersion, 3)
    assert.deepEqual(migrated.progress, old.progress)
    assert.deepEqual(migrated.attempts, old.attempts)
    assert.equal(migrated.session.draft, old.session.draft)
    await lessonPage.getByRole('button', { name: 'درس‌ها', exact: true }).click()
    assert.equal(await lessonPage.locator('.lesson-card').count(), 2)
    for (const width of [320, 360, 430, 1280]) {
      await lessonPage.setViewportSize({ width, height: 850 })
      assert.equal(await lessonPage.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth), true)
      await saveScreenshot(lessonPage, `lessons-${width}.png`)
    }
    await lessonPage.setViewportSize({ width: 360, height: 800 })
    await clickAndSave(lessonPage, lessonPage.locator('[data-lesson-id="lesson-04"] .lesson-open-button'))
    let selected = await readState(lessonPage)
    assert.equal(selected.activeLessonId, 'lesson-04')
    assert.equal(selected.savedSessions[lessonOneBundle.lesson.lessonId].draft, old.session.draft)
    assert.ok(lessonPage.url().includes('lesson=lesson-04'))
    await lessonPage.getByRole('button', { name: 'واژه‌ها', exact: true }).click()
    assert.equal(await lessonPage.locator('.word-item').count(), 84)
    await saveScreenshot(lessonPage, 'lesson-four-words-360.png')
    await lessonPage.getByRole('button', { name: 'خانه', exact: true }).click()
    await clickAndSave(lessonPage, lessonPage.getByRole('button', { name: 'ادامهٔ یادگیری', exact: true }))
    await clickAndSave(lessonPage, lessonPage.getByRole('button', { name: 'چرخاندن کارت و نمایش معنی', exact: true }))
    await clickAndSave(lessonPage, lessonPage.getByRole('button', { name: 'برویم سراغ تمرین', exact: false }))
    selected = await readState(lessonPage)
    const task = selected.session.queue[selected.session.cursor]
    assert.ok(task.entryId.startsWith('a1-l04-'))
    await clickAndSave(lessonPage, lessonPage.locator('.meaning-option').nth(task.optionIds.indexOf(task.entryId)))
    await continueFeedback(lessonPage, await readState(lessonPage))
    await lessonPage.getByLabel('پاسخ تو', { exact: true }).fill('Entwurf aus Lektion vier')
    await waitState(lessonPage, state => state.session.draft === 'Entwurf aus Lektion vier')
    await clickAndSave(lessonPage, lessonPage.getByRole('button', { name: 'توقف و بازگشت', exact: true }))
    await lessonPage.getByRole('button', { name: 'درس‌ها', exact: true }).click()
    await clickAndSave(lessonPage, lessonPage.locator(`[data-lesson-id="${lessonOneBundle.lesson.lessonId}"] .lesson-open-button`))
    selected = await readState(lessonPage)
    assert.equal(selected.session.draft, old.session.draft)
    assert.deepEqual(selected.progress[old.session.queue[old.session.cursor].entryId], old.progress[old.session.queue[old.session.cursor].entryId])
    await lessonPage.getByRole('button', { name: 'درس‌ها', exact: true }).click()
    await clickAndSave(lessonPage, lessonPage.locator('[data-lesson-id="lesson-04"] .lesson-open-button'))
    assert.equal((await readState(lessonPage)).session.draft, 'Entwurf aus Lektion vier')
    await lessonPage.locator('.offline-pill').filter({ hasText: 'آمادهٔ آفلاین' }).waitFor()
    await isolated.setOffline(true)
    await lessonPage.reload()
    await lessonPage.getByRole('button', { name: 'ادامهٔ یادگیری', exact: true }).click()
    await lessonPage.getByLabel('پاسخ تو', { exact: true }).waitFor()
    assert.equal(await lessonPage.getByLabel('پاسخ تو', { exact: true }).inputValue(), 'Entwurf aus Lektion vier')
    await saveScreenshot(lessonPage, 'lesson-four-offline-360.png')
    const ended = await playToEnd(lessonPage)
    assert.equal(ended.session.introducedEntryIds.length, 5)
    assert.ok(ended.session.introducedEntryIds.every(id => id.startsWith('a1-l04-')))
    await isolated.close()
  })
  await checkpoint('direct lesson-four link recovers after first write abort and never reuses an unlocked writer', async () => {
    const isolated = await browser.newContext()
    observeContext(isolated)
    await isolated.addInitScript(() => {
      const original = IDBObjectStore.prototype.put
      IDBObjectStore.prototype.put = function (...args) {
        const result = original.apply(this, args)
        if (sessionStorage.getItem('first-selection-aborted') !== 'yes') {
          sessionStorage.setItem('first-selection-aborted', 'yes')
          this.transaction.abort()
        }
        return result
      }
    })
    const failed = await isolated.newPage()
    await failed.goto(`${origin}/?lesson=lesson-04`)
    await failed.getByRole('button', { name: 'تلاش دوباره', exact: true }).waitFor()
    await failed.waitForFunction(async () => !(await navigator.locks.query()).held.some(lock => lock.name === 'wortzeit-single-writer'))
    assert.equal(await readState(failed), null)
    await failed.getByRole('button', { name: 'تلاش دوباره', exact: true }).click()
    await failed.getByRole('button', { name: 'ادامهٔ یادگیری', exact: true }).waitFor()
    assert.equal((await readState(failed)).activeLessonId, 'lesson-04')
    const second = await isolated.newPage()
    await second.goto(origin)
    await second.getByRole('alert').filter({ hasText: 'تب دیگری' }).waitFor()
    await isolated.close()
  })
  await checkpoint('real IndexedDB atomic abort, optimistic concurrency and load/recovery', async () => {
    const isolated = await browser.newContext()
    observeContext(isolated)
    const storagePage = await isolated.newPage()
    await storagePage.goto(`${origin}/__test/setup`)
    const initial = createInitialState(bundle, 'Europe/Berlin')
    const first = transition(initial, { type: 'start-session', sessionId: 'storage-test', seed: 7 }, bundle, new Date().toISOString())
    const verdict = await storagePage.evaluate(async ({ first }) => {
      const { saveState, loadState } = await import('/__test/src/storage/index.ts')
      const { courseBundle } = await import('/__test/src/content/catalog.ts')
      await saveState(first, 0)
      const loaded = await loadState(courseBundle)
      const second = { ...first, revision: 2 }
      const writes = await Promise.allSettled([saveState(second, 1), saveState(second, 1)])
      const before = await loadState(courseBundle)
      const original = IDBObjectStore.prototype.put
      IDBObjectStore.prototype.put = function (...args) { const result = original.apply(this, args); this.transaction.abort(); return result }
      let aborted = false
      try { await saveState({ ...second, revision: 3 }, 2) } catch { aborted = true } finally { IDBObjectStore.prototype.put = original }
      const after = await loadState(courseBundle)
      return { paused: loaded.session.state, writes: writes.map(item => item.status), aborted, before: before.revision, after: after.revision }
    }, { first })
    assert.equal(verdict.paused, 'paused')
    assert.deepEqual(verdict.writes.sort(), ['fulfilled', 'rejected'])
    assert.equal(verdict.aborted, true)
    assert.equal(verdict.before, verdict.after)
    await isolated.close()
  })
  assert.deepEqual(pageErrors, [])
} catch (error) {
  results.push({ passed: false, error: error.message })
  for (const page of observedPages.keys()) await capture(page, 'failure')
  console.error(error.message)
  process.exitCode = 1
} finally {
  await browser?.close()
  await new Promise(resolve => server.close(resolve))
  await writeFile(path.join(directory, 'browser-report.json'), JSON.stringify({ at: new Date().toISOString(), results, diagnostics, exercisedKinds: [...exercisedKinds] }, null, 2))
}
