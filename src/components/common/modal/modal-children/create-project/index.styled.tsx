import { styled } from "styled-components"

import { COLORS } from "@/constants/styles/colors"
import { DEVICE_SIZE } from "@/constants/styles/device-size"

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  min-width: 800px;
  max-height: 650px;
  overflow-y: auto;
`

export const Title = styled.div`
  width: 100%;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 40px;
`

export const InputsSection = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
`

export const Inputs = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const TechSection = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  margin-bottom: 20px;
  padding: 0 10px;
`

export const TechList = styled.div`
  max-width: 800px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
  padding: 0 10px;
`

interface ITechItemStyled {
  $color?: string
}

export const TechItem = styled.div<ITechItemStyled>`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 8px 10px;
  border-radius: 20px;
  background-color: ${({ $color }) => $color ?? COLORS.BLUE};
`

export const Remove = styled.div`
  display: flex;
  &:hover {
    cursor: pointer;
    color: ${COLORS.SEMANTIC_RED};
  }
`

export const Buttons = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 12px;

  @media (${DEVICE_SIZE.MOBILE}) {
    align-items: stretch;
    flex-direction: column;
  }
`
