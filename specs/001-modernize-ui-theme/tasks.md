---
description: "Implementation tasks for the Focus Time App UI and Pomodoro flow"
---

# Tasks: Focus Time App UI and Pomodoro Flow

**Input**: Design documents in `specs/001-modernize-ui-theme/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, and `contracts/timer-ui-contract.md`

**Organization**: Tasks are grouped by user story. Tests are included because the feature specification and project constitution require automated coverage and test-first development.

**Format**: `- [ ] T### [P?] [US#?] Action with exact file path`

## Phase 1: Setup

**Purpose**: Prepare shared test fixtures and responsive verification helpers.

- [ ] T001 [P] Create legacy cycle/history test fixtures in `tests/fixtures/cycles.ts` from the current `Cycle` shape in `src/reducers/cycles/reducer.ts`
- [ ] T002 [P] Configure shared Jest fake-timer and asset mocks in `tests/jest.setup.ts`
- [ ] T003 [P] Create viewport-based overflow test helpers in `tests/helpers/responsive.tsx` for 1440px, 768px, and 375px viewports

## Phase 2: Foundational

**Purpose**: Establish shared persisted settings and validation before story UI work.

- [ ] T004 [P] Extend `AppSettings` in `src/utils/persistence.ts` with `enableSound: boolean` defaulting to true and `theme: coffee | dark` defaulting to coffee; enforce `rounds` in the inclusive range 1–99
- [ ] T005 [P] Add settings schema tests in `tests/unit/defaults.test.ts` asserting focus 1500 seconds, rest 300 seconds, rounds 4, coffee theme, enabled sound, and rejection of invalid values
- [ ] T006 Load and save the persisted coffee/dark theme and sound preference through `src/context/ThemeContext.tsx` without changing the existing cycle-history storage key

## Phase 3: User Story 1 — Reliable Pomodoro cycle and preserved history (Priority: P1) 🎯 MVP

**Goal**: Restore the named task workflow and history while delivering a responsive, configurable focus/rest cycle with reliable audible or visible phase feedback.

**Independent Test**: Enter a task name and valid settings, start a short cycle, observe Focus → rest prompt → next Focus or completion, verify both phase-boundary sound attempts/fallback, and confirm the named record remains in the existing History route after reset and reload. Check no horizontal overflow at desktop, tablet, and mobile widths.

### Tests for User Story 1

- [ ] T007 [P] [US1] Test elapsed-time focus/rest transitions, rounds decrement, pause/resume, and reset in `tests/unit/useTimer.test.ts`
- [ ] T008 [P] [US1] Test settings reject zero rounds, require a task name, and accept supported duration/round bounds in `tests/unit/timer-settings.test.tsx`
- [ ] T009 [P] [US1] Test rendered full-cycle phase labels, prompt visibility, Resume/Reset controls, and completion in `tests/integration/timer-cycle.test.tsx`
- [ ] T010 [P] [US1] Test named task creation, completion persistence, existing History rendering, and reset preserving records using `tests/integration/timer-history.test.tsx` and `tests/fixtures/cycles.ts`
- [ ] T011 [P] [US1] Test desktop/tablet/mobile viewport layout and assert document scroll width does not exceed viewport width in `tests/integration/responsive-layout.test.tsx`
- [ ] T012 [P] [US1] Test audio priming from Start, both phase-boundary playback calls, rejected playback fallback, and manual retry in `tests/integration/timer-sound.test.tsx`

### Implementation for User Story 1

- [ ] T013 [US1] Restore the named task input and connect form submission to the existing cycle context in `src/pages/Home/index.tsx`
- [ ] T014 [US1] Build the task/focus/rest/round configuration fields and visible validation errors in `src/components/settings/TimerSettings.tsx`
- [ ] T015 [US1] Implement deadline-based elapsed-time countdown, phase transitions, pause/resume, reset, and completion in `src/hooks/useTimer.ts`
- [ ] T016 [US1] Connect Pomodoro start, finish, and interruption events to the existing `Cycle` reducer/context and preserve old serialized records in `src/context/CyclesContext.tsx` and `src/reducers/cycles/reducer.ts`
- [ ] T017 [US1] Render the exact Focus label, current rest prompt slot, remaining rounds, and completion status in `src/components/Timer.tsx`
- [ ] T018 [US1] Render Resume/Pause and Reset below the timer and preserve the remaining phase state on resume in `src/components/controls/TimerControls.tsx`
- [ ] T019 [US1] Restore existing task-history navigation and show “Focus Time App” at the upper left on timer and history routes in `src/components/Header/index.tsx` and `src/components/Header/styled.ts`
- [ ] T020 [US1] Arrange the one-line desktop configuration above the left-centered timer with bounded width, wrapping long labels, and mobile stacking without overflow in `src/pages/Home/styled.ts` and `src/styles/accessibility.css`
- [ ] T021 [US1] Preload the bundled MP3, prime playback from the Start gesture, play at focus/rest boundaries, and return explicit success/failure from `src/utils/sound.ts`
- [ ] T022 [US1] Show visible bell status and a user-operated Play Sound retry when automatic playback fails in `src/components/Timer.tsx`
- [ ] T023 [US1] Announce phase changes and meaningful timer status accessibly without announcing every second in `src/utils/aria.ts` and `src/components/Timer.tsx`

**Checkpoint**: Named task entry, the full cycle, reliable sound fallback, responsive layout, and existing history all work without requiring theme or mascot polish.

## Phase 4: User Story 2 — Theme selection (Priority: P2)

**Goal**: Allow users to choose and persist Coffee beige/brown or Dark blue/purple themes while preserving contrast and visible focus.

**Independent Test**: Toggle the header control by keyboard and pointer, verify theme persistence after reload, verify no green appears in Coffee tokens, and verify text/control contrast in both themes.

### Tests for User Story 2

- [ ] T024 [P] [US2] Test Coffee/Dark theme toggle, localStorage persistence, keyboard activation, and focus visibility in `tests/unit/theme.test.tsx`
- [ ] T025 [P] [US2] Test WCAG AA foreground/control contrast against actual theme token pairs and assert the Coffee palette contains no green tokens in `tests/unit/theme-contrast.test.ts`

### Implementation for User Story 2

- [ ] T026 [P] [US2] Define at least four beige/brown Coffee tokens with no green and dark blue/purple tokens with yellow accent in `src/styles/theme.ts` and `src/styles/theme/default.ts`
- [ ] T027 [US2] Restore the visible, keyboard-operable theme switch in `src/components/settings/ThemeSettings.tsx` and `src/components/Header/index.tsx`
- [ ] T028 [US2] Apply theme tokens to page surfaces, inputs, buttons, links, and focus outlines in `src/styles/global.ts` and `src/styles/accessibility.css`
- [ ] T029 [US2] Persist Coffee/Dark selection while leaving an active timer and mascot phase unchanged in `src/context/ThemeContext.tsx`

**Checkpoint**: Theme switching, persistence, contrast, and focus work independently of a running Pomodoro.

## Phase 5: User Story 3 — Rest mascot and rotating prompts (Priority: P2)

**Goal**: Show an accessible animated cat beside the timer that changes to distinct rest behaviors and a unique actionable prompt each rest.

**Independent Test**: Simulate at least 15 rest transitions, verify every prompt has a unique stable ID and each appears before any prompt repeats, verify reading/exercise visual states, and verify static behavior with reduced motion enabled.

### Tests for User Story 3

- [ ] T030 [P] [US3] Test prompt records have unique IDs and no rotation repeats until all 15 prompts are used in `tests/unit/useRestPrompts.test.ts`
- [ ] T031 [P] [US3] Test accessible cat descriptions and distinct reading/exercise rest states in `tests/unit/mascot.test.tsx`
- [ ] T032 [P] [US3] Test reduced-motion preference removes mascot animation while keeping its accessible label in `tests/unit/mascot-motion.test.tsx`

### Implementation for User Story 3

- [ ] T033 [P] [US3] Store the 15 concise actionable prompts as stable `{ id, text }` records in `src/assets/rest-prompts.json`
- [ ] T034 [US3] Implement a shuffled prompt queue with no repeat until exhaustion and no boundary repeat in `src/hooks/useRestPrompts.ts`
- [ ] T035 [US3] Implement distinct reading and exercise/rest vector states with accessible names in `src/components/Mascot.tsx`
- [ ] T036 [US3] Align the cat immediately left of the timer and connect rest prompt/type to its visual state in `src/components/Timer.tsx` and `src/styles/accessibility.css`
- [ ] T037 [US3] Respect `prefers-reduced-motion` and provide a static mascot presentation in `src/styles/accessibility.css`

**Checkpoint**: Rest prompts and mascot states work when driven by the timer, and remain accessible with motion disabled.

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Verify the integrated stories and document their run/acceptance criteria.

- [ ] T038 [P] Add axe checks for the rendered timer under both themes and keyboard focus in `tests/accessibility/timer.accessibility.test.tsx`
- [ ] T039 [P] Add interaction performance checks for start/pause/reset under 100ms and mascot phase updates under 500ms in `tests/perf/interaction.test.tsx`
- [ ] T040 Configure CI to run lint, unit/integration, accessibility, responsive, performance, and production build checks in `.github/workflows/ci.yml`
- [ ] T041 Update local run instructions and manual overflow/audio/history acceptance steps in `specs/001-modernize-ui-theme/quickstart.md`
- [ ] T042 Document the final UI, theme, audio, history preservation, and asset attribution in `README.md`, `CHANGELOG.md`, and `ASSETS.md`
- [ ] T043 Run `npm test -- --runInBand`, `npm run lint`, and `npm run build`; fix feature-related failures and record the passing commands in `specs/001-modernize-ui-theme/quickstart.md`

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Independent test helpers; may begin immediately.
- **Foundational (Phase 2)**: Settings storage and validation must finish before UI stories consume preferences.
- **US1 (Phase 3)**: Depends on Phase 2; delivers the P1 MVP including task/history integration.
- **US2 (Phase 4)**: Depends on shared settings foundation; can proceed alongside US1 after Phase 2, but final theme integration must not reset a running session.
- **US3 (Phase 5)**: Prompt/mascot tests and assets can start after Phase 1; timer wiring depends on the US1 Timer screen.
- **Polish (Phase 6)**: Integrates and gates all desired user stories.

### User Story Dependencies

- **US1 (P1)**: No dependency on another story; relies on shared settings/storage foundation.
- **US2 (P2)**: No dependency on US1 behavior; consumes the shared persisted settings contract.
- **US3 (P2)**: Mascot and prompt data are independently testable; timer placement and phase wiring depend on US1 UI.

### Within Each User Story

- Write the listed tests first and verify they fail for the missing behavior before implementation.
- Keep each task scoped to its exact file set and complete prerequisite tasks before integration.
- Run the story's independent test criteria at its checkpoint.

## Parallel Opportunities

- **Setup**: T001, T002, and T003 can run in parallel; they write separate fixture/setup/helper files.
- **US1 tests**: T007–T012 can be authored in parallel before the implementation tasks; implementation tasks sharing `Timer.tsx` or `Home/index.tsx` must be sequenced.
- **US2**: T024 and T025 can run in parallel; T026 can run alongside tests because it owns theme-token files.
- **US3**: T030–T032 and T033 can run in parallel; T034 follows prompt data, T035 follows test coverage, T036 follows US1 timer markup.
- **Polish**: T038 and T039 can run in parallel; T040 follows test scripts being present.

## Implementation Strategy

### MVP First

1. Complete Setup and Foundational phases.
2. Complete US1 tasks T007–T023 to deliver named Pomodoro sessions, task history, responsive layout, focus/rest flow, and audio fallback.
3. Run the US1 independent test criteria before proceeding.

### Incremental Delivery

1. Add US2 theme selection and verify both palettes independently.
2. Add US3 rest prompts and mascot behaviors.
3. Complete cross-cutting accessibility, performance, responsive CI, documentation, and final validation.

## Format Validation

Every task uses an unchecked checkbox, sequential `T###` ID, an optional `[P]` marker only when file-level parallelism is safe, a required `[US#]` marker for user-story tasks, and a concrete repository path.
