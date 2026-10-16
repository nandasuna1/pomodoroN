export interface TimerSettings {
  activityDuration: number
  restDuration: number
  rounds: number
}

export interface AppSettings extends TimerSettings {
  theme: 'light' | 'dark'
}

export const DEFAULTS: AppSettings = {
  activityDuration: 1500,
  restDuration: 300,
  rounds: 4,
  theme: 'light',
}

function clampInt(value: number, min: number, max: number) {
  if (!Number.isFinite(value)) return min
  return Math.max(min, Math.min(max, Math.floor(value)))
}

export function validateSettings(input?: Partial<AppSettings>): AppSettings {
  return {
    activityDuration: clampInt(
      input?.activityDuration ?? DEFAULTS.activityDuration,
      60,
      60 * 60,
    ),
    restDuration: clampInt(
      input?.restDuration ?? DEFAULTS.restDuration,
      30,
      60 * 60,
    ),
    rounds: clampInt(input?.rounds ?? DEFAULTS.rounds, 1, 100),
    theme: input?.theme === 'dark' ? 'dark' : 'light',
  }
}

const STORAGE_KEY = 'pomodoron:settings'

export function saveSettings(settings: Partial<AppSettings>): AppSettings {
  const validated = validateSettings(settings)
  try {
    globalThis.localStorage?.setItem(STORAGE_KEY, JSON.stringify(validated))
  } catch {
    // Storage can be unavailable in private browsing or restricted environments.
  }
  return validated
}

export function loadSettings(): AppSettings {
  try {
    const raw = globalThis.localStorage?.getItem(STORAGE_KEY)
    if (raw) return validateSettings(JSON.parse(raw) as Partial<AppSettings>)
  } catch {
    // Invalid stored values or unavailable storage fall back to the documented defaults.
  }
  return { ...DEFAULTS }
}
