import type { Entry } from '../contracts/index.ts'

export type PronunciationRate = 1 | 0.8
export const PRONUNCIATION_RATE_KEY = 'wortzeit-pronunciation-rate'
export const speechMessages = {
  unsupported: 'این مرورگر از پخش تلفظ پشتیبانی نمی‌کند.',
  noVoice: 'صدای آلمانی در دسترس نیست؛ تنظیمات صدای دستگاه را بررسی کن.',
  failed: 'پخش تلفظ انجام نشد؛ دوباره امتحان کن.',
}
type PreferenceStorage = Pick<Storage, 'getItem' | 'setItem'>
type Synthesis = Pick<SpeechSynthesis, 'getVoices' | 'speak' | 'cancel' | 'addEventListener' | 'removeEventListener'>
export interface SpeechEnvironment {
  synthesis?: Synthesis
  createUtterance?: (text: string) => SpeechSynthesisUtterance
  storage?: PreferenceStorage
}
interface SpeechSnapshot {
  activeId: string | null
  rate: PronunciationRate
  message: string | null
}

export function wordPronunciation(entry: Entry): string {
  return entry.nounData ? `${entry.nounData.article} ${entry.lemma}` : entry.lemma
}

export function selectGermanVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | undefined {
  const lang = (voice: SpeechSynthesisVoice) => voice.lang.toLowerCase().replaceAll('_', '-')
  return voices.find(voice => lang(voice) === 'de-de') ?? voices.find(voice => /^de(?:-|$)/u.test(lang(voice)))
}

// No learning commands or storage snapshots enter this controller. Identity is
// per button and per surface, so canceled native callbacks cannot affect a successor.
export function createPronunciation(environment: SpeechEnvironment) {
  const { synthesis, createUtterance, storage } = environment
  let rate: PronunciationRate = 1
  try { if (storage?.getItem(PRONUNCIATION_RATE_KEY) === '0.8') rate = 0.8 } catch { /* Optional preference. */ }
  let snapshot: SpeechSnapshot = { activeId: null, rate, message: null }
  let current: { id: string; scope: string; utterance: SpeechSynthesisUtterance } | null = null
  let voices: SpeechSynthesisVoice[] = []
  const listeners = new Set<() => void>()
  const publish = (change: Partial<SpeechSnapshot>) => {
    snapshot = { ...snapshot, ...change }
    listeners.forEach(listener => listener())
  }
  const readVoices = () => {
    try { voices = synthesis?.getVoices() ?? [] } catch { voices = [] }
    if (selectGermanVoice(voices) && snapshot.message === speechMessages.noVoice) publish({ message: null })
  }
  const stop = () => {
    if (!current) return
    // Invalidate before cancel(): some engines synchronously emit an error.
    current = null
    try { synthesis?.cancel() } catch { /* Still clear the local playback state. */ }
    publish({ activeId: null })
  }
  return {
    getSnapshot: () => snapshot,
    subscribe: (listener: () => void) => { listeners.add(listener); return () => { listeners.delete(listener) } },
    connect: () => {
      readVoices()
      synthesis?.addEventListener('voiceschanged', readVoices)
      return () => { synthesis?.removeEventListener('voiceschanged', readVoices); stop() }
    },
    setRate: (value: PronunciationRate) => {
      stop()
      publish({ rate: value })
      try { storage?.setItem(PRONUNCIATION_RATE_KEY, String(value)) } catch { /* Keep the in-memory setting usable. */ }
    },
    toggle: (id: string, scope: string, text: string) => {
      if (current?.id === id) { stop(); return }
      stop()
      if (!synthesis || !createUtterance) { publish({ message: speechMessages.unsupported }); return }
      readVoices()
      const voice = selectGermanVoice(voices)
      if (!voice) { publish({ message: speechMessages.noVoice }); return }
      try {
        const utterance = createUtterance(text)
        utterance.voice = voice
        utterance.lang = voice.lang
        utterance.rate = snapshot.rate
        current = { id, scope, utterance }
        utterance.onend = () => {
          if (current?.utterance !== utterance) return
          current = null
          publish({ activeId: null })
        }
        utterance.onerror = () => {
          if (current?.utterance !== utterance) return
          current = null
          publish({ activeId: null, message: speechMessages.failed })
        }
        publish({ activeId: id, message: null })
        synthesis.speak(utterance)
      } catch {
        stop()
        publish({ message: speechMessages.failed })
      }
    },
    stop,
    stopButton: (id: string) => { if (current?.id === id) stop() },
    stopScope: (scope: string) => { if (current?.scope === scope) stop() },
  }
}
export type Pronunciation = ReturnType<typeof createPronunciation>

export function browserPronunciation(): Pronunciation {
  if (typeof window === 'undefined') return createPronunciation({})
  let storage: PreferenceStorage | undefined
  try { storage = window.localStorage } catch { /* Blocked browser storage. */ }
  return createPronunciation({
    synthesis: window.speechSynthesis,
    createUtterance: typeof window.SpeechSynthesisUtterance === 'function' ? text => new window.SpeechSynthesisUtterance(text) : undefined,
    storage,
  })
}
