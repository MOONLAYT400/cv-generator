import { styled } from "styled-components"

import { COLORS } from "@/constants/styles/colors"

export const Wrapper = styled.div`
  border: 1px solid #4f4f4f;
  border-radius: 10px;
  padding: 4px;
  display: flex;
  justify-content: space-between;
  max-width: 1000px;
`
export const ItemDescription = styled.div`
  display: flex;
  align-items: center;
  word-wrap: break-word;
  width: 90%;
  word-break: break-word;
`
export const ButtonsGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 0 1 auto;
  max-width: 90%;
`

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: auto;
  background: ${COLORS.BLUE};
  color: white;
  border: 1px solid ${COLORS.BLUE};
  border-radius: 3px;
  padding: 3px;
  margin: 2px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`
