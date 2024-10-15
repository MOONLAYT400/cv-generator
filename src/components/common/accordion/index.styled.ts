import { styled } from "styled-components"

import { COLORS } from "@/constants/styles/colors"

interface IAccordionStyled {
  $isActive?: boolean
}

export const Wrapper = styled.div<IAccordionStyled>`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;
  border-bottom: 1px solid ${COLORS.WHITE_24};
`

export const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  user-select: none;
  color: ${COLORS.WHITE_87};
  font-family: Inter;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 32px;
`

export const Content = styled.div<IAccordionStyled>`
  overflow: hidden;
  max-height: ${({ $isActive }) => ($isActive ? "100rem" : 0)};
  padding-bottom: ${({ $isActive }) => ($isActive ? "32px" : 0)};
  transition: all 0.4s ease-in;
`
