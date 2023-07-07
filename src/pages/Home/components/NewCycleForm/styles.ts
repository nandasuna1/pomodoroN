import { styled } from 'styled-components'

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: ${(props) => props.theme.primary_light};
  font-size: 1.125rem;
  font-weight: bold;
  flex-wrap: wrap;

  @media only screen and (max-width: 650px) {
    width: 100%;
    font-size: 80%;
    gap: 10% 20%;

    display: flex;
    align-content: center;
    justify-content: start;
  }
`

const BaseInput = styled.input`
  background: transparent;
  height: 2.5 rem;
  border: 0;
  border-bottom: 2px solid ${(props) => props.theme.secondary_light};
  font-weight: 1.125rem;
  padding: 0 0.5rem;

  color: ${(props) => props.theme.primary_light};

  &:focus {
    box-shadow: none;
    border-color: ${(props) => props.theme.secondary_light};
  }

  &::placeholder {
    color: ${(props) => props.theme.secondary_light};
  }

  @media only screen and (max-width: 650px) {
    height: 40%;
    padding: 0;
  }
`

export const TaskInput = styled(BaseInput)`
  flex: 1;
  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`

export const MinutsInput = styled(BaseInput)`
  width: 4rem;
`
