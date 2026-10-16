# Timer Screen UI Contract

## Page shell

- The application header shows **Focus Time App** at the upper left on both timer and history routes.
- A visible, keyboard-operable theme control lets users switch between Coffee (beige/brown only) and Dark (dark blue/purple with yellow accent).
- The prior task-name and Pomodoro history navigation/record remain present and usable.

## Home layout

- The configuration row appears above the timer and contains the task/project name, focus duration, rest duration, and rounds.
- On desktop/tablet, configuration controls form one horizontal row.
- The timer group is centered within the left content area. The cat illustration is immediately to the timer's left and vertically aligned with the time display.
- The phase label and time remain legible at all supported sizes. Focus phase text is exactly **Focus**. Rest phase text includes the current actionable prompt.
- **Resume** and **Reset** controls are shown below the timer; Resume toggles to Pause while running.
- At mobile widths, settings may wrap/stack and the cat may move above or beside the timer, but no horizontal viewport overflow is permitted.
- No fixed viewport-height sizing may clip controls; long task names/prompts are constrained and wrap.

## Timer behavior

- Start validates configuration and requires a non-empty task name. Zero rounds is invalid and produces visible validation feedback.
- Focus completion plays the bell and enters rest. Rest completion plays the bell and advances rounds; remaining rounds start focus again automatically; zero rounds shows completion.
- Pause/Resume preserves phase and remaining time; Reset returns to configured initial state without deleting history.
- The task name is associated with the completed Pomodoro record shown on the existing History route.

## Sound behavior

- The bundled MP3 resolves through the build system and is preloaded.
- Start invokes audio unlock/prime from the user's click. Phase-boundary playback uses the prepared player.
- Playback success has a visible bell cue. Rejection, decode failure, or missing audio exposes a visible explanation and user-operated **Play Sound** retry; never swallow the failure without feedback.
- A persisted sound preference controls whether automatic bell playback is enabled.

## Theme and accessibility

- Coffee has at least four distinct beige/brown tokens; it contains no green token or green highlight.
- Dark uses dark blue/purple with yellow highlights.
- Text and control colors meet WCAG AA contrast for applicable text sizes; focus is visible under both themes.
- Phase changes and meaningful timer state are exposed to assistive technology without flooding announcements every second.
- Mascot descriptions are accessible; animation honors `prefers-reduced-motion`.

## Component integration contract

The timer UI must preserve component composition and existing cycle/history integration. Typed callbacks represent settings changes, start, pause, reset, phase changes, and timer ticks where component boundaries require them. The implementation may expose these through props or a typed controller hook, but controls and the existing Home/history consumer must use one coherent session state.

## Acceptance checks

- Desktop/tablet: configuration on one line above the timer; cat left of timer; controls below; brand upper left; theme control visible.
- Mobile and browser zoom: no horizontal overflow; controls remain reachable and labels wrap.
- Focus shows “Focus”; rest shows one of the curated instructions.
- A full cycle preserves the task name in History and produces both bell cues or an explicit retry fallback.
- Theme toggle is keyboard-accessible, persists after reload, and has adequate contrast.
