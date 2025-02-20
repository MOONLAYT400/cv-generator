import { FC } from "react"

import { COLORS } from "@/constants/styles/colors"

import { CheckSystemIcon } from "../icons"

import { Check, Wrapper } from "./index.styled"

export interface ICustomCheckbox {
  text?: string
  disabled?: boolean
  isChecked?: boolean
  check: (value: boolean) => void
  color?: string
}

export const Checkbox: FC<ICustomCheckbox> = ({
  text,
  disabled = false,
  isChecked = false,
  color = COLORS.DARK_BLUE,
  check
}) => {
  const handleCheck = () => {
    check(!isChecked)
  }

  return (
    <Wrapper disabled={disabled} onClick={handleCheck}>
      <Check
        $checked={isChecked}
        onClick={handleCheck}
        disabled={disabled}
        $color={color}
      >
        {isChecked ? <CheckSystemIcon /> : null}
      </Check>
      <span>{text ? text : null}</span>
    </Wrapper>
  )
}
