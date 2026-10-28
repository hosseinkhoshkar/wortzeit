import { useEffect, useRef, useState } from 'react'
import type { AppState, LearningCommand, OfflineStatus } from './contracts/index.ts'
import { lessonOneBundle } from './content/lesson-one.ts'
import { validateContent } from './content/validate.ts'
import { createInitialState, getEntryStatus, getHomeStats, summarizeSession } from './learning/engine.ts'
import { CommandWriter } from './controller/writer.ts'
import { loadState, saveState } from './storage/index.ts'
import { prepareOffline } from './pwa/offline.ts'
import { WortzeitUI } from './features/WortzeitUI.tsx'

const bundle = lessonOneBundle
const message = (error: unknown) => error instanceof Error ? error.message : 'ذخیره انجام نشد؛ دوباره تلاش کنید.'

export default function App() {
  const [state, setState] = useState<AppState | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [offlineStatus, setOfflineStatus] = useState<OfflineStatus>('checking')
  const [now, setNow] = useState(() => new Date().toISOString())
  const writer = useRef<CommandWriter | null>(null)

  useEffect(() => {
    let disposed = false
    let release: (() => void) | undefined
    const hold = new Promise<void>(resolve => { release = resolve })
    const boot = async () => {
      const errors = validateContent(bundle)
      if (errors.length) throw new Error(`بستهٔ درس معتبر نیست: ${errors.join('؛ ')}`)
      const loaded = await loadState(bundle)
      if (disposed) return
      const initial = loaded ?? createInitialState(bundle, Intl.DateTimeFormat().resolvedOptions().timeZone)
      writer.current = new CommandWriter(initial, {
        bundle, now: () => new Date().toISOString(), save: saveState,
        onSaved: saved => { if (!disposed) { setState(saved); setNow(new Date().toISOString()) } },
        onBusy: value => { if (!disposed) setBusy(value) },
        onError: failure => { if (!disposed) setError(failure ? message(failure) : null) },
      })
      setState(initial)
    }
    if (!navigator.locks) {
      setError('این مرورگر امکان ذخیرهٔ امن جلسه را ندارد. برنامه را در مرورگر به‌روز و با HTTPS یا localhost باز کنید.')
    } else {
      void navigator.locks.request('wortzeit-single-writer', { ifAvailable: true }, async lock => {
        if (disposed) return
        if (!lock) {
          setError('Wortzeit در تب دیگری باز است. آن تب را ببندید و دوباره تلاش کنید.')
          return
        }
        try { await boot(); await hold } catch (failure) { if (!disposed) setError(message(failure)) }
      }).catch(failure => { if (!disposed) setError(message(failure)) })
    }
    return () => { disposed = true; release?.() }
  }, [])

  useEffect(() => {
    let disposed = false
    const check = () => { void prepareOffline().then(status => { if (!disposed) setOfflineStatus(status) }) }
    check()
    window.addEventListener('online', check)
    navigator.serviceWorker?.addEventListener('controllerchange', check)
    const timer = window.setInterval(() => setNow(new Date().toISOString()), 30_000)
    return () => {
      disposed = true; window.clearInterval(timer); window.removeEventListener('online', check)
      navigator.serviceWorker?.removeEventListener('controllerchange', check)
    }
  }, [])

  const onCommand = (command: LearningCommand): Promise<void> => {
    return writer.current?.submit(command) ?? Promise.resolve()
  }

  const retry = () => {
    if (!writer.current) { window.location.reload(); return }
    void writer.current.retry().catch(() => {})
  }

  if (!state) return <main className="boot-screen" dir="rtl" lang="fa">
    <div className="boot-mark" aria-hidden="true">W</div><h1>Wortzeit</h1>
    {error ? <><p role="alert">{error}</p><button type="button" onClick={retry}>تلاش دوباره</button></>
      : <p role="status">در حال آماده‌کردن واژه‌ها…</p>}
  </main>

  return <WortzeitUI bundle={bundle} state={state} stats={getHomeStats(state, bundle, now)}
    summary={summarizeSession(state, now)} statuses={Object.fromEntries(bundle.entries.map(entry =>
      [entry.entryId, getEntryStatus(state, entry.entryId, now)]))} now={now} busy={busy}
    error={error} offlineStatus={offlineStatus} onCommand={onCommand} onRetry={retry} />
}
