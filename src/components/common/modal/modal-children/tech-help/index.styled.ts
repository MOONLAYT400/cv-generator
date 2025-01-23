import { styled } from "styled-components"

import { COLORS } from "@/constants/styles/colors"

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 600px;
`

export const Title = styled.div`
  width: 100%;
  color: ${COLORS.WHITE_87};
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
`

export const Secondary = styled.div`
  width: 100%;
  color: ${COLORS.WHITE_87};
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
`

export const Description = styled.div`
  width: 100%;
  color: ${COLORS.WHITE_48};
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 18px;
`

export const TechList = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
  padding: 0 10px;
`

interface ITech {
  $color?: string
}

export const Tech = styled.div<ITech>`
  display: flex;
  gap: 5px;
  align-items: center;
  background: ${({ $color }) => $color ?? COLORS.BLUE};
  padding: 8px 10px;
  border-radius: 20px;
`
