import { styled } from "styled-components"

import { COLORS } from "@/constants/styles/colors"
import { DEVICE_SIZE } from "@/constants/styles/device-size"

interface IInputWrapper {
  width?: string
  $focused?: boolean
  $value?: boolean
}

export const Wrapper = styled.div<IInputWrapper>`
  position: relative;
  width: 100%;
`

export const Label = styled.p`
  padding-left: 16px;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  margin-bottom: 4px;
  @media (${DEVICE_SIZE.TABLET}) {
    font-size: 16px;
    span {
      font-size: 16px;
    }
  }
`

type IInput = {
  disabled?: boolean
  $error?: boolean
}

export const InputWrapper = styled.div<IInputWrapper>`
  padding: 8px 16px;
  border-radius: 12px;
  border: 1px solid ${({theme})=>theme.colors.shadow};
  background: transparent;
  ${({ $focused }) =>
    $focused ? `border: 1px solid ${COLORS.TURQUOISE};` : ""};
  &:focus {
    border: 1px solid ${COLORS.TURQUOISE};
  }
  @media (${DEVICE_SIZE.TABLET}) {
    border-radius: 16px;
    padding: 14px 16px;
  }
`

export const InputField = styled.textarea<IInput>`
  width: 100%;
  background: transparent;
  border-radius: 8px;
  outline: none;
  color: ${({theme})=> theme.colors.text};
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  resize: none;
  border: none;
  height: 7em;
  &:disabled {
    opacity: 0.5;
  }

  &::placeholder {
    color: ${COLORS.WHITE_48};
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
  }
  &::-ms-input-placeholder {
    color: ${COLORS.WHITE_48};
  }
  @media (${DEVICE_SIZE.TABLET}) {
    font-size: 14px;
    line-height: 18px;
    &::placeholder {
      font-size: 14px;
      line-height: 18px;
    }
  }
`
