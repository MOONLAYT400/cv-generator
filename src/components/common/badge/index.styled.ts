import { styled } from "styled-components"

import { COLORS } from "@/constants/styles/colors"

interface IWrapper {
  $color?: string
}

export const Wrapper = styled.div<IWrapper>`
  display: flex;
  gap: 5px;
  align-items: center;
  background: ${({ $color }) => $color ?? COLORS.BLUE};
  padding: 8px 10px;
  border-radius: 20px;
`

export const Remove = styled.div`
  display: flex;
  &:hover {
    cursor: pointer;
    color: ${COLORS.SEMANTIC_RED};
  }
`
