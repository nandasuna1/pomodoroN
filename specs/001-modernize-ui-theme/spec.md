# Feature Specification: Modernize UI & Mascot (Theme + Pomodoro Flow)

**Feature Branch**: `001-modernize-ui-theme`

**Created**: 2026-10-13

**Status**: Draft

**Input**: User description: "app modernization. lets update the ui in theme and apearence. use a coffee(brown and beige tones, maybe some green to highlights) like theme to be the light theme and some (dark blue, purple and yellow tones) to be the dark team. add a mascote cat as animation, should be a small cat animation aligned with the timer. since is a pomodoro we should have active and rest times. so add a rest time and when the user clicks on play it should start an activity time and when is over a bell sound should play and an rest time should start. when the screen is counting the rest the cat animation should change to a cat doing exercise or reading a book and a phrase like "do 10 situps" or "drink a glass of other" should be displayed (we should have 15 of these). when reset time finish a bell should ring and this should cicle up until the rounds amout (new field to be created) reaches zero"

## Clarifications

### Session 2026-10-13

- Q: Which mascot asset approach should the project adopt for v1 — SVG-driven animations or Lottie JSON animations? → A: vector-based animated assets (preferred)

(Integrated: Mascot asset approach decided — vector-based animated assets preferred for v1 to prioritize accessibility, small bundle size, and reduced-motion support.)

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Start Pomodoro Cycle (Priority: P1)

As a user, I want to start an activity timer, hear a bell when it ends, then enter a rest period automatically, so that work/rest cycles repeat until my configured rounds are complete.

**Why this priority**: Core app flow; without this the feature has no user value.

**Independent Test**: Start the timer, wait for activity duration to elapse, verify bell audio, verify rest timer starts, verify rest prompts and mascot animation change, verify bell at rest end, verify rounds decrement and cycle stops at zero.

**Acceptance Scenarios**:

1. **Given** the app is on the timer screen and rounds > 0, **When** user clicks Play, **Then** the activity timer counts down and UI shows active state.
2. **Given** activity timer reaches 0, **When** that happens, **Then** a bell audio cue plays and the rest timer starts immediately.
3. **Given** rest timer is active, **When** rest timer counts down, **Then** a rest prompt and an alternate cat animation are shown.
4. **Given** rest timer reaches 0, **When** that happens, **Then** a bell audio cue plays and rounds is decremented; if rounds > 0 a new activity session starts automatically; otherwise the cycle stops.

---

### User Story 2 - Theme Selection (Priority: P2)

As a user, I want to choose between a light "coffee" theme (brown/beige + green accent) and a dark theme (dark blue/purple + yellow accent) so the app matches my preference and environment.

**Why this priority**: Visual refresh improves usability and comfort, but secondary to core timer flow.

**Independent Test**: Toggle theme in settings or via UI control; verify colors and contrast change and that timer and mascot remain visible and accessible.

**Acceptance Scenarios**:

1. **Given** user opens theme settings, **When** user selects "Light", **Then** UI updates to coffee color palette and remains accessible.
2. **Given** user selects "Dark", **When** selection applied, **Then** UI updates to dark palette with preserved legibility.

---

### User Story 3 - Mascot & Rest Prompts (Priority: P2)

As a user, I want a small animated cat aligned with the timer that reflects active vs rest states and displays short rest prompts during rests to encourage movement or hydration.

**Why this priority**: Improves engagement and supports healthy breaks.

**Independent Test**: Trigger rest period and verify mascot animation changes, a rest prompt (from a set of 15) displays, and prompt rotates each rest.

**Acceptance Scenarios**:

1. **Given** rest period begins, **When** UI shows rest timer, **Then** cat animation switches to rest-behavior (e.g., stretching, reading) and a rest prompt is displayed.
2. **Given** multiple rest cycles, **When** prompts are shown, **Then** prompts rotate without immediate repetition until all 15 are used (or randomized with low repetition over short sequences).

---

### Edge Cases

- If audio playback is blocked by browser autoplay policies, show a visible bell indicator and a manual "Play Sound" affordance in settings.
- If rounds is set to 0 at start, do not start cycles; show a validation error.
- If user switches theme mid-cycle, timers and animations must continue uninterrupted.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The timer UI MUST allow configuring activity duration, rest duration, and number of rounds (rounds > 0).
- **FR-002**: When the user clicks Play, the activity timer MUST start counting down from the configured activity duration.
- **FR-003**: When the activity timer reaches 0, the app MUST play a bell sound (or show bell indicator if audio unavailable) and immediately start the rest timer.
- **FR-004**: When the rest timer is active, the mascot animation MUST change to a rest/encouragement animation and a rest prompt (from a curated set of 15) MUST be visible.
- **FR-005**: When the rest timer reaches 0, the app MUST play a bell sound (or show indicator) and decrement rounds by 1; if rounds > 0, start the next activity timer, otherwise stop cycles and show completion state.
- **FR-006**: The UI MUST expose a theme control with two presets: Coffee (light) and Dark (blue/purple). Theme change MUST maintain accessibility (contrast and keyboard focus).
- **FR-007**: Mascot animation MUST be non-blocking: it MUST not prevent the timer or controls from operating or block assistive tech (always include accessible text alternatives).
- **FR-008**: The default configuration (if user has not customized) MUST be: activity 25 minutes, rest 5 minutes, rounds 4.
- **FR-009**: The app MUST provide a simple settings save so user preferences (durations, theme, rounds) persist between sessions (assumption: using client-side persistence).
- **FR-010**: Provide at least 15 distinct rest prompts (short phrases) and ensure phrases are concise and actionable.

### Key Entities

- **TimerSettings**: { activityDuration, restDuration, rounds, theme }
- **RestPrompt**: { id, text }
- **SessionState**: { currentPhase: [active|rest|idle], remainingSeconds, roundsRemaining }

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of acceptance scenarios in User Story 1 must pass in manual QA (timers, bells, rounds cycle).
- **SC-002**: Theme toggling MUST preserve contrast and keyboard accessibility. Automated accessibility checks MUST report zero critical violations for the timer screen in CI; any non-critical violations MUST be documented with justification.
- **SC-003**: Mascot appears and updates animation within 500ms of phase change (perceptual responsiveness requirement).
- **SC-004**: At least 15 rest prompts are available; during a sequence of 15 rest cycles, prompts must not repeat more than once.
- **SC-005**: Default configuration (25/5/4) MUST be applied for first-time users. Persistence MUST be verifiable by unit/integration tests that assert settings are correctly restored after a reload; these tests MUST pass deterministically in CI.

## Assumptions

- Assets (mascot animation frames and bell sound) will be provided by design, or acceptable open-source assets will be sourced with proper licensing.
- Persistence is local (client-side persistence) unless product decides to sync to an account later (out of scope for this feature).
- Mobile-responsive styling is desirable but primary acceptance focuses on desktop and tablet form factors in v1.
- Accessibility is a hard requirement per project constitution; all UI changes must meet baseline accessibility.

## UI / UX Notes (user-facing, non-implementation)

- Light theme: coffee palette — warm browns and beige backgrounds with soft green highlights for actionable elements.
- Dark theme: deep blue / purple backgrounds with yellow accents for emphasis.
- Mascot: small, unobtrusive cat placed adjacent to the timer; in active phase the cat may appear attentive/idle; in rest the cat shows short animation (stretching, reading, exercising) and a short prompt appears below or beside it. Mascot asset approach chosen for v1: vector-based animated assets to prioritize accessibility, small bundle size, and reduced-motion support.
- Provide clear audible and visual bell cues at phase boundaries; always show a visible label so users who cannot hear can observe state transitions.

## 15 Rest Prompts (curated set)

1. Do 10 sit-ups
2. Stand up and stretch
3. Drink a glass of water
4. Look away for 20 seconds
5. Take 3 deep breaths
6. Do 10 jumping jacks
7. Walk around the room
8. Roll your shoulders
9. Do a neck stretch
10. Stand on tip-toes for 30s
11. Do 15 squats
12. Touch your toes slowly
13. Close eyes and relax for 30s
14. Tidy your desk for 2 minutes
15. Read a page of a book

## Acceptance / Test cases (high level)

- Manual QA: Run a full cycle with default settings and verify bells and animations at each phase transition.
- Theme tests: Toggle theme and validate contrast and layout.
- Prompt rotation: Simulate 15 rest cycles and verify minimal repetition.

## Open Questions & [Assumptions]

- No critical clarifications required; defaults chosen (25/5/4) per standard Pomodoro practice. If you prefer different defaults, specify and spec will be updated.

---

**Spec file**: specs/001-modernize-ui-theme/spec.md
