import { styled } from 'styled-components'

export const LayoutContainer = styled.div`
  position: relative;
  isolation: isolate;
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  background: radial-gradient(
      ellipse at 11% 78%,
      color-mix(in srgb, var(--timer-accent) 24%, transparent),
      transparent 33%
    ),
    radial-gradient(
      ellipse at 88% 30%,
      color-mix(in srgb, var(--timer-surface) 90%, transparent),
      transparent 38%
    ),
    linear-gradient(
      130deg,
      var(--timer-background),
      var(--timer-surface) 54%,
      var(--timer-background)
    );

  &::before {
    position: absolute;
    z-index: -1;
    inset: 0;
    content: '';
    pointer-events: none;
    background: radial-gradient(
        ellipse at 6% 42%,
        color-mix(in srgb, var(--timer-accent) 18%, transparent),
        transparent 20%
      ),
      linear-gradient(
        115deg,
        transparent 26%,
        color-mix(in srgb, var(--timer-surface) 34%, transparent) 44%,
        transparent 57%
      );
    filter: blur(18px);
  }

  @media (max-width: 700px) {
    min-height: 100dvh;
  }
`
