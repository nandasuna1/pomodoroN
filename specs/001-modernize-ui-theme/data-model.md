# Data Model: Focus Time App UI and Pomodoro Flow

## Entities

### TimerSettings

User preferences stored locally.

- `activityDuration`: integer seconds; positive; default 1500.
- `restDuration`: integer seconds; positive; default 300.
- `rounds`: integer; 1–99; default 4.
- `theme`: enum `coffee | dark`; default `coffee`.
- `enableSound`: boolean; default `true`.

Validation rejects invalid user input before a session starts; it must not silently turn zero rounds into a valid session.

### SessionState

Current in-memory Pomodoro execution state.

- `currentPhase`: `idle | active | rest | completed`.
- `remainingSeconds`: non-negative integer derived from the current phase deadline.
- `roundsRemaining`: non-negative integer.
- `isRunning`: boolean.
- `phaseStartedAt`: timestamp used to calculate remaining time without interval drift.

Transitions: `idle -> active` on Start; `active -> rest` at focus deadline; `rest -> active` at the rest deadline while rounds remain; final rest -> `completed` when rounds reach zero. Pause preserves remaining time; Resume continues the same phase; Reset restores configured settings.

### RestPrompt

Offline, curated prompt content.

- `id`: stable unique identifier (for example `rp-01`).
- `text`: plain text, actionable, maximum 80 characters.
- At least 15 records. Consecutive rest periods must display different prompts; prompts may recur after an intervening prompt, and the set need not be exhausted before a repeat.

### PomodoroRecord (existing History/Cycle record)

Preserve the app's existing task-oriented cycle entry and serialized shape where possible.

- `id`: stable record identifier.
- `task`: user-provided task/project name; required.
- `startDate`: session start timestamp.
- `minutesAmount`: original focus duration retained for existing History rendering.
- `finishedDate` or `interruptedDate`: existing completion state markers.
- Additional focus/rest round metadata may be added compatibly if the current record requires it; old localStorage records must still load and appear in History.

The named record remains the canonical history item. Do not create a separate list that duplicates the existing History route.

## Relationships

- A `TimerSettings` value configures one active `SessionState`.
- A `SessionState` belongs to the named `PomodoroRecord` created from the existing task input.
- Each rest phase displays one `RestPrompt`.
- Completion/interruption updates the same record rendered by the existing History page.

## Persistence

- Preserve the existing cycles storage key and accept its previously stored records.
- Persist preferences separately under the feature settings key; include theme and sound preference.
- Timer progress persistence is not required unless already provided by the existing cycle model; reload behavior must not corrupt a saved history entry.

## Layout-related validation

- Configuration values remain valid at desktop, tablet, and mobile widths.
- Long task names and prompt text wrap within bounded containers.
- No primary-screen horizontal overflow at tested viewport widths.
