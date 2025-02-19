import { styled } from "styled-components"

import { COLORS } from "@/constants/styles/colors"
import { DEVICE_SIZE } from "@/constants/styles/device-size"

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 800px;
  max-height: 650px;
  overflow-y: auto;
`

export const Title = styled.div`
  width: 100%;
  color: ${COLORS.WHITE_87};
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 40px;
`

type TabWrapperType = {
  $margin?: boolean
}

export const TabsWrapper = styled.div<TabWrapperType>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${({ $margin }) => ($margin ? "margin-bottom: 10px;" : "")};
  border-bottom: 1px solid ${COLORS.WHITE_16};
`

type TabType = {
  $active: boolean
}

export const Tab = styled.div<TabType>`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 8px;
  background: ${({ $active }) => ($active ? COLORS.DARK_BLUE : "transparent")};
  color: ${COLORS.WHITE_87};
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  border: 1px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.1s ease-in;
  &:hover {
    border: 1px solid ${COLORS.WHITE_16};
  }
`

export const SliderWrapper = styled.div`
  display: grid;
  height: 100%;
  width: 100%;
  overflow: hidden;
  grid-template-columns: 1fr 1fr 1fr;
`

type SlideType = {
  $activeTab: boolean
}

export const SlideWrapper = styled.div<SlideType>`
  grid-column-start: 1;
  grid-row-start: 1;
  grid-column-end: span 3;
  transform: translateX(${({ $activeTab }) => ($activeTab ? "0%" : "100%")});
  opacity: ${({ $activeTab }) => ($activeTab ? 1 : 0)};
  transition: all 0.5s;
  color: ${COLORS.WHITE_87};
`

export const InputsSection = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  margin-bottom: 10px;
`

export const Inputs = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const TechWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  overflow-y: auto;
  max-height: 400px;
`

export const TechItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  background: ${COLORS.WHITE_16};
  border-radius: 4px;
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
