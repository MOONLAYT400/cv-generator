import { styled } from "styled-components"

import { COLORS } from "@/constants/styles/colors"

export const Wrapper = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  background: ${COLORS.BLUE};
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
