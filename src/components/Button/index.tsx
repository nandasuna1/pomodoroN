import { ButtonHTMLAttributes } from 'react'
import { ButtonComponent, ButtonVariant } from './styled.ts'
interface ButtonProps extends ButtonHTMLAttributes {
  variant?: ButtonVariant
  text?: string
}

export function Button({ variant = 'primary', text, rest }: ButtonProps) {
  return (
    <ButtonComponent variant={variant} {...rest}>
      {text}
    </ButtonComponent>
  )
}
