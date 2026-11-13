import { TARGET_ACTIVE_MS } from '../contracts/index.ts'
import type { AppState } from '../contracts/index.ts'

export const STREAK_TARGET_MS = TARGET_ACTIVE_MS
export const DEFAULT_STUDY_TIME_ZONE = 'Europe/Berlin'

export interface DailyStreak {
  date: string
  days: number
  activeMs: number
  completedToday: boolean
}

function calendarDate(now: string, timeZone: string): string {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone, year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date(now))
  const get = (type: string) => parts.find(part => part.type === type)!.value
  return `${get('year')}-${get('month')}-${get('day')}`
}
function previousDate(date: string): string {
  const day = new Date(`${date}T12:00:00.000Z`)
  day.setUTCDate(day.getUTCDate() - 1)
  return day.toISOString().slice(0, 10)
}

/** Derive achievements from committed activity; never duplicate or migrate learning progress. */
export function getDailyStreak(state: Pick<AppState, 'dailyActivity' | 'settings'>, now: string): DailyStreak {
  const date = calendarDate(now, state.settings.studyTimeZone)
  const activeMs = state.dailyActivity[date] ?? 0
  const completedToday = activeMs >= STREAK_TARGET_MS
  let cursor = completedToday ? date : previousDate(date)
  let days = 0
  while ((state.dailyActivity[cursor] ?? 0) >= STREAK_TARGET_MS) {
    days++
    cursor = previousDate(cursor)
  }
  return { date, days, activeMs, completedToday }
}
