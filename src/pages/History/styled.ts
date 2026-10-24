import { styled } from 'styled-components'

export const HistoryContainer = styled.main`
  flex: 1;
  width: min(100% - 3rem, 68rem);
  min-height: 0;
  margin: auto;
  display: flex;
  flex-direction: column;
  padding: 2.5rem 0;

  h1 {
    margin-bottom: 1.25rem;
    color: var(--timer-text);
    font-size: clamp(1.5rem, 3vw, 2rem);
  }
`

export const HistoryList = styled.div`
  max-height: 100%;
  overflow-y: auto;
  border: 1px solid color-mix(in srgb, var(--timer-text) 12%, transparent);
  border-radius: 1rem;
  background: color-mix(in srgb, var(--timer-surface) 88%, transparent);
  box-shadow: 0 1rem 3rem rgb(76 48 27 / 10%);

  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  table {
    width: 100%;
    border-collapse: collapse;

    min-width: 560px;

    th {
      background-color: color-mix(
        in srgb,
        var(--timer-accent) 12%,
        var(--timer-surface)
      );
      padding: 1rem;
      text-align: left;
      color: var(--timer-text);
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 1.5rem;
      }

      &:last-child {
        border-top-right-radius: 8px;
        padding-right: 1.5rem;
      }
    }

    td {
      background-color: transparent;
      border-top: 1px solid
        color-mix(in srgb, var(--timer-text) 10%, transparent);
      padding: 1rem;
      font-size: 0.875rem;
      line-height: 1.6;
      color: var(--timer-text);

      &:first-child {
        width: 50%;
        padding-left: 1.5rem;
      }

      &:last-child {
        padding-right: 1.5rem;
      }
    }
  }

  @media (max-width: 650px) {
    width: calc(100vw - 2rem);
    margin-left: -1rem;

    table th,
    table td {
      padding: 0.75rem;
    }
  }
`
const STATUS_COLOR = {
  yellow: 'yellow',
  green: 'green',
  red: 'red',
} as const

interface StatusProps {
  statuscolor: keyof typeof STATUS_COLOR
}

export const Status = styled.span<StatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: max-content;

  &::before {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: ${(props) => props.theme[`${props.statuscolor}`]};
  }

  @media only screen and (max-width: 650px) {
    gap: 10px;
    &::before {
      content: '';
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: ${(props) => props.theme[`${props.statuscolor}`]};
    }
  }
`
