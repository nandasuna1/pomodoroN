# Implementation Plan: Focus Time App UI and Pomodoro Flow

**Branch**: `001-modernize-ui-theme` | **Spec**: [spec.md](spec.md)

**Input**: Feature specification plus the user's requested UI corrections: prevent overflow; brand the top-left as “Focus Time App”; put a single-line configuration row above a timer centered in the left content area with the cat to its left; place Resume and Reset below; show “Focus” during focus and an actionable prompt during rest; preserve task names and completed Pomodoro history; use a four-or-more-token beige/brown light theme without green; retain a theme switch; and make bell playback reliable.

## Summary

Deliver the Pomodoro work/rest cycle and its existing task/history workflow as one cohesive, responsive screen. Keep the current React, TypeScript, Vite, styled-components, and localStorage stack. The page header places the product name at the upper left and a persistent theme control at the right. The work area is constrained to the viewport: settings form a single row above a timer group centered within the left-side content area; the cat sits directly left of the timer. Resume and Reset controls sit below the timer, and the existing task-name entry/history navigation and records remain available. At narrow widths the layout wraps or stacks without horizontal overflow.

During focus, display the phase label “Focus”; during rest, display one of 15 concise prompts and a distinct rest mascot behavior. Activity/rest transitions play the supplied bell after a user gesture has unlocked audio; if playback is unavailable, show a visible status and a user-operated Play Sound control. Preserve existing cycle names and history records, and add completed focus/rest rounds without replacing the existing task-history feature.

## Technical Context

**Language/Version**: TypeScript, React 18, Vite.

**Primary Dependencies**: Existing React, styled-components, date-fns, and React context/reducer patterns. Jest, React Testing Library, jsdom, and axe are used for validation.

**Storage**: Existing cycle-history localStorage record plus a separate versioned preferences record for focus duration, rest duration, rounds, theme, and sound preference. Preserve backward compatibility with stored cycles.

**Testing**: Jest unit tests for timer/settings/prompts, rendered component tests for interaction and history preservation, integration tests for a complete cycle and audio fallback, axe checks for each theme, and responsive overflow checks at desktop/tablet/mobile viewport widths.

**Target Platform**: Web browsers, desktop and tablet first, responsive mobile.

**Performance Goals**: Start/pause/reset/theme interactions under 100ms; phase and mascot update within 500ms. Timer accuracy must be based on elapsed time rather than assuming interval callbacks are punctual.

**Constraints**:
- Constitution requirements are binding: accessible semantic controls, visible keyboard focus, contrast, component-first boundaries, and automated tests before non-trivial behavior.
- No horizontal page overflow at supported viewport widths; long task names/prompts wrap or clip within their own bounded region without pushing controls off-screen.
- Light theme uses at least four beige/brown tokens and no green; dark theme retains dark blue/purple with yellow accent.
- Browser audio policies must be handled explicitly. Start sound from a user gesture to unlock playback; report failure visibly and allow retry.
- No backend or remote persistence.

**Scope**: Existing Home, Header, History, Cycle context/reducer, theme context, and feature timer components. Keep the existing task-entry and History route; do not replace or discard prior named Pomodoro records.

## Architecture and UI Decisions

1. **Header**: show “Focus Time App” at top-left on all app routes. Keep the theme switch visible and keyboard-operable in the header.
2. **Timer layout**: the Home content is a responsive bounded grid. The configuration row (task name, focus duration, rest duration, rounds) appears above the timer on one line when space allows. The timer group is aligned centrally within the left content column; the mascot is immediately left of the time/phase/round display. Resume and Reset appear together below the timer.
3. **Phase feedback**: focus status reads “Focus”; rest status reads the current actionable break prompt. Screen-reader announcements report phase changes and meaningful time updates without announcing every second unnecessarily.
4. **History preservation**: use the current cycle/history context and reducer as the source for task names and saved records. A completed round/session is added without breaking pre-existing history data or the `/history` route.
5. **Theme tokens**: define named background, surface, raised surface, primary text, and accent tokens for both palettes. Coffee light tokens are beige/brown only; verify readable foreground/background and control contrast.
6. **Audio**: import the supplied MP3 through Vite so its emitted URL is valid. Preload it and prime/unlock audio from the Start user gesture; play at each phase boundary. Handle rejected playback and missing assets as explicit state, with visual bell feedback and a retry control.
7. **Responsive behavior**: use min-width: 0, max-width constraints, flexible grid/flex wrapping, and bounded content. At mobile widths stack the configuration and mascot/timer as needed; never require horizontal scrolling for the primary timer UI.
8. **Mascot**: keep vector/CSS animation small, non-blocking, and reduced-motion aware. Render distinct reading/exercise rest states, with adjacent prompt text as the authoritative instruction.

## Constitution Check

- **Simplicity & User Focus**: PASS — one compact settings row and a focused timer screen; existing history is preserved rather than duplicated.
- **Component-First Design**: PASS — keep Header, Home, Timer, Mascot, controls, settings, History, contexts, and reducer responsibilities separated with typed interfaces.
- **Test-First Development**: PASS — add/update behavior tests before implementation; CI must run tests and lint.
- **Accessibility & Inclusivity**: PASS WITH GATES — semantic labels, keyboard operation, visible focus, contrast tests, live phase feedback, reduced motion, and axe checks are required.
- **Observability & Versioning**: PASS — retain event instrumentation and update the changelog for user-visible changes.
- **Stack and performance constraints**: PASS — existing stack only; responsiveness and interval accuracy are explicitly tested.

No unjustified constitution violations. UI acceptance gates are no horizontal overflow at representative desktop/tablet/mobile viewports, named brand and theme control visible, focus/rest state copy correct, and existing named history remains accessible.

## Phase 0: Research Decisions

See [research.md](research.md). Key decisions: maintain the existing cycle/history store; use responsive CSS grid/flex rather than fixed viewport sizing; use a single user gesture to prime browser audio and expose a retry fallback; use elapsed-time timer updates; and test overflow, theme contrast, accessibility, and a rendered full cycle.

## Phase 1: Design Artifacts

- [data-model.md](data-model.md): timer preferences, session state, prompts, and compatibility-preserving cycle history.
- [contracts/timer-ui-contract.md](contracts/timer-ui-contract.md): UI layout, component callbacks, accessibility, audio, and responsive behavior.
- [quickstart.md](quickstart.md): manual and automated verification scenarios.

## Project Structure and Touch Points

```text
src/
├── AppContent.tsx
├── components/
│   ├── Header/
│   ├── Timer.tsx
│   ├── Mascot.tsx
│   ├── controls/TimerControls.tsx
│   └── settings/{TimerSettings,ThemeSettings}.tsx
├── context/{CyclesContext,ThemeContext}.tsx
├── hooks/{useTimer,useRestPrompts}.ts
├── pages/{Home,History}/
├── reducers/cycles/
├── styles/{accessibility.css,global.ts,theme.ts,theme/default.ts}
└── utils/{persistence,sound,aria}.ts
tests/
├── unit/
├── integration/
├── accessibility/
└── perf/
```

## Complexity Tracking

No constitution exceptions or additional infrastructure are required.
