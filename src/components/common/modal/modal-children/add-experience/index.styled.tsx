import { styled } from "styled-components"

import { COLORS } from "@/constants/styles/colors"
import { DEVICE_SIZE } from "@/constants/styles/device-size"

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  min-width: 400px;
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

export const Buttons = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 12px;

  @media (${DEVICE_SIZE.MOBILE}) {
    align-items: stretch;
    flex-direction: column;
  }
`
export const Description = styled.ul`
  width: 400px;
  color: ${COLORS.WHITE_48};
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  overflow: auto;
  max-height: 100px;
  overflow-wrap: break-word;
`

export const LabelTitle = styled.p`
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  padding-left: 10px;
`
