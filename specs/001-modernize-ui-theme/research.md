# Research: Focus Time App UI and Pomodoro Flow

## Decisions

### 1. Preserve named Pomodoro history

**Decision**: Keep the existing task-name field, cycle context/reducer, localStorage cycle state, and History route. Integrate the new focus/rest/round experience with these records rather than replacing the existing task-based timer.

**Rationale**: The requested task name and Pomodoro register already have a project implementation and persistent user data. Replacing that model would remove user-visible functionality and risk making previously stored cycle records unreadable.

**Alternatives considered**:
- Replace the cycle page and history with a timer-only screen — rejected because it removes task names and saved history.
- Maintain a second independent Pomodoro history — rejected because it creates conflicting records and duplicate sources of truth.

### 2. Responsive layout without overflow

**Decision**: Use a bounded, fluid Home content area with CSS grid/flex, `min-width: 0`, wrapping and mobile stacking. Keep the configuration in one row where the viewport permits, with a documented narrow-screen wrap/stack fallback.

**Rationale**: A rigid one-line layout at every width would force overflow on phones and zoomed interfaces. Desktop/tablet keeps the requested one-line settings row, while small screens preserve usability without horizontal scrolling.

**Alternatives considered**:
- Fixed pixel widths or `min-width`-based timer panels — rejected because viewport and long-text overflow.
- Always stack all controls — rejected because it fails the requested desktop arrangement.

### 3. Browser audio reliability

**Decision**: Bundle the supplied MP3 through Vite, preload it, and initialize/unlock playback synchronously from the Start button gesture. At phase boundaries, play the unlocked audio and show a visible bell status. If playback rejects or the asset cannot load, expose an explicit retry action and an audio setting.

**Rationale**: Browsers may block sound initiated only by a delayed timer callback. The user click is the reliable permission boundary; phase transitions can then use the unlocked player. Visible feedback covers restricted browsers and hardware mute.

**Alternatives considered**:
- Construct a fresh `Audio` instance only at phase end — rejected because playback may be rejected by autoplay policy and path handling is error-prone.
- Silent failure or a visual-only bell — rejected because the user specifically reports missing sound.
- Web Audio synthesized sound — unnecessary while a supplied MP3 is available; retain as a fallback only if supported asset playback fails.

### 4. Accurate timer behavior and test coverage

**Decision**: Base remaining time on an absolute wall-clock deadline, not interval callback counts. Time continues to elapse while the browser is backgrounded or the device sleeps. Pause stores the remaining duration and Resume establishes a new deadline. Use fake timers for transitions, rendered component tests for full phase flow and existing history integration, and viewport-based DOM checks for overflow.

**Rationale**: Background tabs throttle intervals; decrementing once per callback causes timer drift. A wall-clock deadline tracks elapsed time even when callbacks are delayed or the device sleeps. A system clock adjustment can affect the deadline, which is an accepted tradeoff for this user-facing countdown. Pure class tests do not prove visible controls, prompt/audio behavior, or preservation of named records.

**Alternatives considered**:
- Count one second per interval callback — rejected because throttling causes drift.
- Use a monotonic clock — rejected for v1 because sleep behavior varies by platform and the desired behavior is to let time continue across sleep.
- Unit-only state-transition tests — rejected as insufficient for the reported UI and audio regressions.

### 5. Rest prompt rotation

**Decision**: Ensure that consecutive rest periods show different prompts; a prompt may recur after at least one different prompt has appeared. A no-repeat-until-exhaustion queue is not required.

**Rationale**: The clarified acceptance criterion prohibits immediate repetition only. This gives prompt rotation a deterministic, small validation target without promising full-set coverage in a random sequence.

**Alternatives considered**:
- Shuffle all 15 prompts without replacement — rejected because the clarified behavior permits repeats before all prompts appear.
- Randomize freely — rejected because it could repeat the same instruction in consecutive rests.

### 6. Theme palette and focus treatment

**Decision**: Implement a four-or-more-token beige/brown light palette without green and preserve dark blue/purple with yellow accent. Validate text and interactive control contrast in both themes; retain visible keyboard focus.

**Rationale**: The palette constraint is explicit, and colors used only in the background are insufficient to verify actual text/button readability.

**Alternatives considered**:
- Reuse green accent from the prior feature request — rejected in favor of the latest explicit no-green constraint.
- Check only token names — rejected because actual foreground/background pairings determine contrast.

## Research sources

- Existing project implementation inspected: `src/context/CyclesContext.tsx`, `src/reducers/cycles/`, `src/pages/History/`, `src/pages/Home/`, `src/components/Header/`, and the current timer and sound modules.
- Browser autoplay and timer-throttling behavior are treated as platform constraints and covered by explicit user-gesture audio initialization, failure fallback, and elapsed-time design.
- Platform references: [WHATWG timers](https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers), [Chrome timer throttling](https://developer.chrome.com/blog/timer-throttling-in-chrome-88), [Page Visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API), [Chrome autoplay policy](https://developer.chrome.com/blog/autoplay), and [MDN media playback](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play).
- Accessibility references: [WCAG 2.2 status messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html), [WCAG pause, stop, hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html), and [reduced motion media query](https://www.w3.org/TR/mediaqueries-5/#prefers-reduced-motion).

## Resolution

No implementation unknowns remain for this design pass. The explicit new layout and presentation requirements take precedence over the previous green-highlight light-theme choice. Prompt rotation is limited to avoiding consecutive repeats; other Pomodoro cycle, accessibility, storage, and mascot requirements remain in scope.
