import { FC, ReactNode } from "react"

import { Wrapper, Loader } from "./Button.styled"

export interface ICustomButton {
  icon?: ReactNode
  text?: string
  disabled?: boolean
  isLoading?: boolean
  buttonType?: "primary" | "secondary" | "danger" | "ghost"
  handleClick: () => void
  handleKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void
}

export const Button: FC<ICustomButton> = ({
  icon,
  text,
  disabled = false,
  isLoading = false,
  buttonType = "primary",
  handleClick,
  handleKeyDown
}) => {
  return (
    <Wrapper
      $buttonType={buttonType}
      onClick={handleClick}
      disabled={disabled}
      onKeyDown={handleKeyDown}
    >
      {isLoading ? <Loader $buttonType={buttonType} /> : null}
      {icon && !isLoading ? icon : null}
      {text ? text : null}
    </Wrapper>
  )
}
