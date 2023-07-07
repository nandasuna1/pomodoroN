import { HTMLProps } from 'react'
import { BaseCountDownButton } from './styled'

interface ButtonPropsInterface extends HTMLProps<HTMLButtonElement> {
  isStart?: boolean
  handleOnClick?: () => void
}

export function ButtonComponent({
  isStart = true,
  handleOnClick,
}: ButtonPropsInterface) {
  return (
    <>
      <BaseCountDownButton isStart={isStart} onClick={handleOnClick}>
        {isStart ? 'Começar' : 'Interromper'}
      </BaseCountDownButton>
    </>
  )
}
