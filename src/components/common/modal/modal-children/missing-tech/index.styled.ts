import { styled } from "styled-components"

import { DEVICE_SIZE } from "@/constants/styles/device-size"

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 600px;
`

export const Title = styled.div`
  width: 100%;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
`

export const Description = styled.div`
  width: 100%;
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

export const Buttons = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 12px;

  @media (${DEVICE_SIZE.MOBILE}) {
    align-items: stretch;
    flex-direction: column;
  }
`
