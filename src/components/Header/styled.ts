import { styled } from 'styled-components'

export const HeaderContainer = styled.header`
  position: relative;
  z-index: 1;
  min-height: 5rem;
  padding: 0 clamp(1.25rem, 4vw, 3.75rem);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
  border-bottom: 1px solid
    color-mix(in srgb, var(--timer-text) 12%, transparent);
  background: color-mix(in srgb, var(--timer-surface) 78%, transparent);
  color: var(--timer-text);
  backdrop-filter: blur(18px);

  .brand {
    display: inline-flex;
    align-items: center;
    gap: 0.65rem;
    color: inherit;
    font-size: 1.2rem;
    font-weight: 700;
    text-decoration: none;
    white-space: nowrap;
  }

  nav {
    display: flex;
    gap: 0.35rem;

    a {
      min-height: 2.75rem;
      padding: 0 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      border-radius: 999px;
      color: inherit;
      font-size: 0.9rem;
      font-weight: 600;
      text-decoration: none;
      transition: background 160ms ease, color 160ms ease;

      &.active {
        background: color-mix(in srgb, var(--timer-accent) 18%, transparent);
        color: inherit;
      }

      &:hover:not(.active) {
        background: color-mix(in srgb, var(--timer-text) 8%, transparent);
      }
    }
  }

  @media (max-width: 520px) {
    min-height: 4.25rem;
    padding: 0 1rem;
    gap: 0.5rem;

    .brand {
      gap: 0.4rem;
      font-size: 1rem;
    }

    nav {
      gap: 0;
    }
    nav a {
      min-height: 2.5rem;
      padding: 0 0.6rem;
    }
    nav a span {
      display: none;
    }
  }
`
