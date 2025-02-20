import { styled } from "styled-components"

import { COLORS } from "@/constants/styles/colors"
import { DEVICE_SIZE } from "@/constants/styles/device-size"

type Wrapper = {
  disabled: boolean
}

type Check = {
  $checked: boolean
  $color?: string
  disabled: boolean
}

export const Wrapper = styled.div<Wrapper>`
  width: max-content;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  user-select: none;

  &:hover {
    span {
      opacity: 0.6;
    }
  }

  ${({ disabled }) =>
    disabled &&
    `
    color:${COLORS.BLACK_16};
    pointer-events:none;
    &:hover {
      cursor:not-allowed;
    }
    `}

  @media (${DEVICE_SIZE.MOBILE}) {
    font-size: 14px;
    span {
      max-width: 250px;
    }
  }
`

export const Check = styled.div<Check>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  width: 20px;
  background: ${({ $checked, $color }) => ($checked ? $color : "transparent")};
  border-radius: 7px;
  border: 2px solid
    ${({ $checked, $color }) => ($checked ? $color : COLORS.WHITE_24)};
  color: ${({ $checked }) =>
    $checked ? COLORS.BLACK_BACKGROUND : "transparent"};
  transform: ${({ $checked }) =>
    $checked ? "rotate(0deg)" : "rotate(360deg)"};
  transition: all 0.5s linear;

  svg {
    stroke-width: 4px;
  }

  &:hover {
    color: ${({ $checked, $color }) => ($checked ? $color : "")};
    background: ${({ $checked }) =>
      $checked ? COLORS.BLACK_BACKGROUND : COLORS.WHITE_87};
  }

  &:active {
    background: ${COLORS.BLUE};
  }

  ${({ disabled }) =>
    disabled &&
    `
    color:${COLORS.WHITE_24};
    background:${COLORS.WHITE_24};
    border: 2px solid transparent;
    pointer-events:none;
    &:hover {
      color:${COLORS.WHITE_24};
      background:${COLORS.WHITE_24};
      cursor:not-allowed;
    }
    `}
`
