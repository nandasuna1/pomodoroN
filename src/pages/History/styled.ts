import { styled } from 'styled-components'

export const HistoryContainer = styled.main`
  flex: 1;
  height: 70%;

  display: flex;
  flex-direction: column;

  h1 {
    font-size: 1.5rem;
    color: ${(props) => props.theme.white};
  }

  @media only screen and (max-width: 650px) {
    padding: 10% 0;
    width: 100vw;
    height: 100%;
    margin: 0;
  }
`

export const HistoryList = styled.div`
  height: 100%;
  overflow-y: auto;

  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  table {
    width: 100%;
    border-collapse: collapse;

    min-width: 600px;

    th {
      background-color: ${(props) => props.theme.primary_dark};
      padding: 1rem;
      text-align: left;
      color: ${(props) => props.theme.primary_light};
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
      background-color: ${(props) => props.theme.primary_dark};
      border-top: 4px solid ${(props) => props.theme.secondary_light};
      padding: 1rem;
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        width: 50%;
        padding-left: 1.5rem;
      }

      &:last-child {
        padding-right: 1.5rem;
      }
    }
  }

  @media only screen and (max-width: 650px) {
    margin: 0;
    width: 80%;
    overflow-y: auto;

    table {
      th {
        text-align: center;
        line-height: 1.4;

        &:first-child {
          padding-left: 0;
        }

        &:last-child {
          padding-right: 0;
        }
      }

      td {
        width: 100vw;
        border-top: 0;
        line-height: 1.4;

        &:first-child {
          padding-left: 3%;
        }

        &:last-child {
          padding-right: 3%;
        }
      }
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
