import { ButtonComponent, ButtonVariant } from './Button.style.ts'
interface ButtonProps {
  variant?: ButtonVariant
}

export function Button({ variant = 'primary' }: ButtonProps) {
  return <ButtonComponent variant={variant}>Botao</ButtonComponent>
}
