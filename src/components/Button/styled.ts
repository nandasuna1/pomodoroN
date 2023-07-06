import styled, { css } from 'styled-components'

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success'

interface ButtonComponentProps {
  variant: ButtonVariant
}

export const ButtonComponent = styled.button<ButtonComponentProps>`
  height: 30px;
  width: fit-content;
  padding: 0 2%;

  border: none;
  border-radius: 10px;

  color: ${(props) => props.theme.primary_light};

  background-color: ${(props) => props.theme.primary_dark};
`
