import styled, { css } from 'styled-components'

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success'

interface ButtonComponentProps {
  variant: ButtonVariant
}

const buttonVariant = {
  primary: 'purple',
  secondary: 'orange',
  success: 'green',
  danger: 'red',
}
export const ButtonComponent = styled.button<ButtonComponentProps>`
  height: 50px;
  width: 100px;

  border: none;
  border-radius: 10px;

  background-color: ${(props) => props.theme['green-500']};
`
