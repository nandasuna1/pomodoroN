# Timer interaction performance harness

`interaction.test.tsx` mounts the real Timer component in jsdom and measures the
synchronous start interaction and a fake-timer focus-to-rest transition. The
checks fail at the feature thresholds: start under 100ms and mascot phase update
under 500ms. These are synthetic CI regression thresholds, not a substitute for
profiling on representative browsers and hardware.

Run the harness with `npm run test:perf`.
