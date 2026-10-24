import { ArrowCounterClockwise, Pause, Play } from 'phosphor-react'

interface TimerControlsProps {
  isRunning: boolean
  isComplete: boolean
  startLabel: string
  onStart: () => void
  onPause: () => void
  onReset: () => void
}

export function TimerControls({
  isRunning,
  isComplete,
  startLabel,
  onStart,
  onPause,
  onReset,
}: TimerControlsProps) {
  return (
    <div className="timer-controls" aria-label="Timer controls">
      {isRunning ? (
        <button type="button" onClick={onPause}>
          <Pause size={18} weight="fill" aria-hidden="true" />
          Pause
        </button>
      ) : (
        <button type="button" onClick={onStart} disabled={isComplete}>
          <Play size={18} weight="fill" aria-hidden="true" />
          {startLabel}
        </button>
      )}
      <button type="button" onClick={onReset}>
        <ArrowCounterClockwise size={18} aria-hidden="true" />
        Reset
      </button>
    </div>
  )
}
