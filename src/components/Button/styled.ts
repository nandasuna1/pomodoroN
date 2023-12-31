import { styled } from 'styled-components'

interface ButtonPropsInterface {
  isStart: boolean
}
export const BaseCountDownButton = styled.button<ButtonPropsInterface>`
  width: 100%;
  border: 0;
  padding: 1rem;
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 0.5rem;
  font-weight: bolder;

  cursor: pointer;

  color: ${(props) => props.theme.white};

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  background: ${(props) =>
    props.isStart ? props.theme.secondary_light : props.theme.primary_negative};

  &:not(disabled):hover {
    background: ${(props) =>
      props.isStart
        ? props.theme.primary_dark
        : props.theme.secondary_negative};
  }
`

export const StartCountDownButton = styled(BaseCountDownButton)`
  background: ${(props) => props.theme.secondary_light};

  &:not(disabled):hover {
    background: ${(props) => props.theme.primary_dark};
  }
`

export const StopCountDownButton = styled(BaseCountDownButton)`
  background: ${(props) => props.theme.primary_negative};

  &:not(disabled):hover {
    background: ${(props) => props.theme.secondary_negative};
  }
`
