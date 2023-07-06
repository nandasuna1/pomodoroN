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
