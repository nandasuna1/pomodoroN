import { type FormEvent, useEffect, useRef, useState } from 'react'
import { ArrowCounterClockwise } from 'phosphor-react'
import bellSound from '../assets/sounds/bell.mp3'
import { loadSettings, saveSettings } from '../utils/persistence'
import { announce } from '../utils/aria'
import { playBell } from '../utils/sound'
import { logTimerEvent } from '../utils/analytics'
import { useTimerHook } from '../hooks/useTimer'
import useRestPrompts from '../hooks/useRestPrompts'
import { Mascot } from './Mascot'
import { TimerControls } from './controls/TimerControls'
import { TimerSettings as TimerSettingsForm } from './settings/TimerSettings'
import rest from '../assets/rest-prompts.json'
import active from '../assets/active-prompts.json'


function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0')
  const remainder = (seconds % 60).toString().padStart(2, '0')
  return `${minutes}:${remainder}`
}

export function Timer() {
  const [settings, setSettings] = useState(loadSettings)
  const { timer, start, pause, reset } = useTimerHook(settings)
  const { current: currentPrompt, next: nextPrompt } = useRestPrompts(rest)
  const { current: currentActivePrompt, next: nextActivePrompt } = useRestPrompts(active)
  const previousPhase = useRef(timer.currentPhase)
  const [bellUnavailable, setBellUnavailable] = useState(false)

  useEffect(() => {
    const previous = previousPhase.current
    const current = timer.currentPhase
    if (previous === current) return

    logTimerEvent('phase-change', current)
    if (
      (previous === 'active' && current === 'rest') ||
      (previous === 'rest' && (current === 'active' || current === 'completed'))
    ) {
      playBell(bellSound).then((played) => setBellUnavailable(!played))
      if (current === 'rest') {
        announce(`Rest time. ${currentPrompt}`)
      } else {
        announce(
          current === 'completed'
            ? 'Pomodoro session complete'
            : 'Back to focus',
        )
      }
      if (previous === 'rest' && current === 'active') {
        nextPrompt()
        nextActivePrompt()
      }
    }

    previousPhase.current = current
  }, [timer.currentPhase, currentPrompt, nextPrompt])

  function handleSettingsSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const saved = saveSettings(settings)
    setSettings(saved)
    reset(saved)
  }

  function handleStart() {
    if (timer.currentPhase === 'idle' || timer.currentPhase === 'completed') {
      const saved = saveSettings(settings)
      setSettings(saved)
      reset(saved)
    }
    start()
    logTimerEvent('start', timer.currentPhase)
  }

  function handlePause() {
    pause()
    logTimerEvent('pause', timer.currentPhase)
  }

  function handleReset() {
    reset(settings)
    setBellUnavailable(false)
    logTimerEvent('reset', 'idle')
  }

  const isRest = timer.currentPhase === 'rest'
  const mascotState =
    timer.currentPhase === 'active' ? 'active' : isRest ? 'rest' : 'idle'
  const restActivity = /read|book/i.test(currentPrompt) ? 'reading' : 'exercise'
  const canEditSettings = !timer.isRunning
  const phaseDuration =
    timer.currentPhase === 'rest'
      ? settings.restDuration
      : settings.activityDuration
  const progress =
    phaseDuration > 0 ? timer.remainingSeconds / phaseDuration : 1
  const isOn = ['focus', 'active'].includes(timer.currentPhase)

  return (
    <div className="timer-workspace">
      <section className="pomodoro" aria-labelledby="timer-title">
        <div className="mascot-badge">
          <Mascot state={mascotState} restActivity={restActivity} size={48} />
        </div>
        <h1 id="timer-title">Pomodoro timer</h1>
        <p className="timer-tagline">Small steps. Big results.</p>

        <div
          className="timer-progress"
          style={{
            background: `conic-gradient(from -90deg, var(--timer-accent) ${
              Math.max(0, Math.min(progress, 1)) * 100
            }%, #ead8c7 0)`,
          }}
        >
          <div className="timer-progress-inner">
            <p className="timer-phase">
              {isRest
                ? 'Rest'
                : timer.currentPhase === 'completed'
                ? 'Complete'
                : 'Focus'}
            </p>
            <output className="timer-count" aria-label="Time remaining">
              {formatTime(timer.remainingSeconds)}
            </output>
            <p className="timer-rounds">
              {timer.roundsRemaining} rounds remaining
            </p>
            <span className="timer-tomato" aria-hidden="true">
              🍅
            </span>
          </div>
        </div>

        {timer.currentPhase === 'completed' && (
          <p className="completion-message" role="status">
            You completed all your rounds. Great work!
          </p>
        )}

        {bellUnavailable && (
          <div className="bell-fallback" role="status">
            <span>Sound was blocked by your browser.</span>
            <button
              type="button"
              onClick={() => {
                playBell(bellSound).then((played) =>
                  setBellUnavailable(!played),
                )
              }}
            >
              Play sound
            </button>
          </div>
        )}

        <TimerControls
          isRunning={timer.isRunning}
          isComplete={timer.currentPhase === 'completed'}
          startLabel={timer.currentPhase === 'idle' ? 'Start' : 'Resume'}
          onStart={handleStart}
          onPause={handlePause}
          onReset={handleReset}
        />

        <TimerSettingsForm
          settings={settings}
          disabled={!canEditSettings}
          onChange={(nextSettings) =>
            setSettings((current) => ({ ...current, ...nextSettings }))
          }
          onSubmit={handleSettingsSubmit}
        />
      </section>

      <aside className="focus-note" aria-label="Daily focus note">
        <div className="daily-tip">
          <span className="tip-icon" aria-hidden="true">
            <ArrowCounterClockwise size={25} />
          </span>
          <div>
            <strong>{isOn ? 'Focus' : 'Challenge'}</strong>
            {isOn ? <p>{currentActivePrompt}</p> : <p>{currentPrompt}</p>}
          </div>
        </div>
      </aside>
    </div>
  )
}

export default Timer
