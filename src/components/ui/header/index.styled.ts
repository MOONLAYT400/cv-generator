import { styled } from "styled-components"

import { COLORS } from "@/constants/styles/colors"

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: ${COLORS.BLACK_48};
`

export const Title = styled.p`
  font-size: 20px;
  font-weight: 800;
`
export const Group = styled.div`
display: flex;
flex-direction: row;
`

export const Version = styled.span``
