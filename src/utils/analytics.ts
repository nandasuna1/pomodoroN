export type TimerEventType = 'start' | 'pause' | 'phase-change' | 'reset'

export interface TimerEvent {
  type: TimerEventType
  phase?: string
  timestamp: number
}

export function logTimerEvent(type: TimerEventType, phase?: string) {
  if (typeof window === 'undefined') return
  window.dispatchEvent(
    new CustomEvent<TimerEvent>('pomodoro:timer-event', {
      detail: { type, phase, timestamp: Date.now() },
    }),
  )
}
