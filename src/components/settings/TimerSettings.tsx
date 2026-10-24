import { FormEvent } from 'react'
import { TimerSettings as TimerSettingsValues } from '../../utils/persistence'

interface TimerSettingsProps {
  settings: TimerSettingsValues
  disabled: boolean
  onChange: (settings: TimerSettingsValues) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export function TimerSettings({
  settings,
  disabled,
  onChange,
  onSubmit,
}: TimerSettingsProps) {
  function update<K extends keyof TimerSettingsValues>(
    key: K,
    value: TimerSettingsValues[K],
  ) {
    onChange({ ...settings, [key]: value })
  }

  return (
    <form className="timer-settings" onSubmit={onSubmit}>
      <h2>Session settings</h2>
      <label>
        Focus minutes
        <input
          type="number"
          min={1}
          max={60}
          value={Math.round(settings.activityDuration / 60)}
          disabled={disabled}
          onChange={(event) =>
            update('activityDuration', Number(event.target.value) * 60)
          }
        />
      </label>
      <label>
        Rest minutes
        <input
          type="number"
          min={1}
          max={60}
          value={Math.round(settings.restDuration / 60)}
          disabled={disabled}
          onChange={(event) =>
            update('restDuration', Number(event.target.value) * 60)
          }
        />
      </label>
      <label>
        Rounds
        <input
          type="number"
          min={1}
          max={100}
          value={settings.rounds}
          disabled={disabled}
          onChange={(event) => update('rounds', Number(event.target.value))}
        />
      </label>
      <button type="submit" disabled={disabled}>
        Save settings
      </button>
    </form>
  )
}
