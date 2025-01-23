import { styled } from "styled-components"

import { COLORS } from "@/constants/styles/colors"

interface IWrapper {
  $color?: string
  $hover?: boolean
}

export const Wrapper = styled.div<IWrapper>`
  display: flex;
  gap: 5px;
  align-items: center;
  background: ${({ $color }) => $color ?? COLORS.BLUE};
  padding: 8px 10px;
  border-radius: 20px;
  ${({ $hover }) =>
    $hover
      ? `  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }`
      : ``}
`

export const Help = styled.div`
  display: flex;
  align-items: center;
  align-items: center;
  height: 20px;
  width: 20px;
  &:hover {
    opacity: 0.5;
    cursor: pointer;
  }
`

export const Remove = styled.div`
  display: flex;
  &:hover {
    cursor: pointer;
    color: ${COLORS.SEMANTIC_RED};
  }
`
