# Quickstart: Focus Time App

## Prerequisites

- Node.js and npm installed.
- Install dependencies with `npm ci` if they are not already installed.

## Run locally

1. Start the Vite app:

   ```sh
   npm run dev
   ```

2. Open the local URL in a browser.
3. Confirm **Focus Time App** is at the top-left and the theme control is visible.
4. Enter a task/project name. Set focus and rest durations to 1 minute and rounds to 1; save configuration.
5. Confirm the configuration appears on one line above the timer at desktop width. The cat should sit left of the timer, with Resume/Reset below.
6. Start focus. Confirm the visible **Focus** label, countdown, and sound unlock from the click. At one minute, confirm the bell plays and rest begins with one prompt.
7. At rest completion, confirm the second bell, completed state, and that the named Pomodoro appears in History. Reset must not erase that record.
8. Switch to Coffee and Dark themes. Confirm the choice persists after reload; Coffee uses beige/brown tones without green.
9. Resize to tablet and mobile widths and zoom the browser. Confirm all settings and controls remain usable and the page has no horizontal overflow.
10. Simulate blocked audio if possible; confirm a visible explanation and Play Sound retry appear.

## Automated validation

```sh
npm test -- --runInBand
npm run test:accessibility
npm run test:perf
npm run lint
npm run build
```

Expected outcomes: tests, lint, and build pass; accessibility checks report no critical timer-screen violations; interaction latency and mascot phase updates remain within their defined thresholds; responsive layout tests report no horizontal overflow.

## Design references

- [Timer screen contract](contracts/timer-ui-contract.md)
- [Settings, session, prompt, and history model](data-model.md)
