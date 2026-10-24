import { useCallback, useEffect, useRef, useState } from 'react'

export type Phase = 'idle' | 'active' | 'rest' | 'completed'

export interface TimerSettings {
  activityDuration: number
  restDuration: number
  rounds: number
}

const DEFAULT_SETTINGS: TimerSettings = {
  activityDuration: 25 * 60,
  restDuration: 5 * 60,
  rounds: 4,
}

export class Timer {
  settings: TimerSettings
  currentPhase: Phase = 'idle'
  remainingSeconds: number
  roundsRemaining: number
  isRunning = false

  constructor(settings?: Partial<TimerSettings>) {
    this.settings = { ...DEFAULT_SETTINGS, ...settings }
    this.remainingSeconds = this.settings.activityDuration
    this.roundsRemaining = this.settings.rounds
  }

  start() {
    if (this.currentPhase === 'idle') {
      this.currentPhase = 'active'
      this.remainingSeconds = this.settings.activityDuration
    }
    if (this.currentPhase !== 'completed') this.isRunning = true
  }

  pause() {
    this.isRunning = false
  }

  reset(settings?: Partial<TimerSettings>) {
    if (settings) this.settings = { ...this.settings, ...settings }
    this.currentPhase = 'idle'
    this.remainingSeconds = this.settings.activityDuration
    this.roundsRemaining = this.settings.rounds
    this.isRunning = false
  }

  tick() {
    if (!this.isRunning || this.remainingSeconds <= 0) return
    this.remainingSeconds -= 1
    if (this.remainingSeconds === 0) this.onPhaseEnd()
  }

  private onPhaseEnd() {
    if (this.currentPhase === 'active') {
      this.currentPhase = 'rest'
      this.remainingSeconds = this.settings.restDuration
      return
    }

    if (this.currentPhase === 'rest') {
      this.roundsRemaining = Math.max(0, this.roundsRemaining - 1)
      if (this.roundsRemaining > 0) {
        this.currentPhase = 'active'
        this.remainingSeconds = this.settings.activityDuration
      } else {
        this.currentPhase = 'completed'
        this.remainingSeconds = 0
        this.isRunning = false
      }
    }
  }
}

export function useTimerHook(initial?: Partial<TimerSettings>) {
  const timerRef = useRef<Timer | null>(null)
  if (!timerRef.current) timerRef.current = new Timer(initial)
  const [, setRevision] = useState(0)
  const render = useCallback(() => setRevision((revision) => revision + 1), [])

  const start = useCallback(() => {
    timerRef.current?.start()
    render()
  }, [render])

  const pause = useCallback(() => {
    timerRef.current?.pause()
    render()
  }, [render])

  const reset = useCallback(
    (settings?: Partial<TimerSettings>) => {
      timerRef.current?.reset(settings)
      render()
    },
    [render],
  )

  const tick = useCallback(() => {
    timerRef.current?.tick()
    render()
  }, [render])

  useEffect(() => {
    const timer = timerRef.current
    if (!timer?.isRunning) return undefined

    const interval = window.setInterval(tick, 1000)
    return () => window.clearInterval(interval)
  }, [timerRef.current?.isRunning, timerRef.current?.currentPhase, tick])

  return {
    timer: timerRef.current,
    start,
    pause,
    reset,
    tick,
  } as const
}
