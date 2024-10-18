import { styled } from "styled-components"

import { COLORS } from "@/constants/styles/colors"

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: ${COLORS.BLACK_BACKGROUND};
  padding: 16px 24px;
  border-radius: 24px;
  max-width: 400px;
`

export const TooltipTitle = styled.p`
  font-family: Inter;
  color: ${COLORS.WHITE_87};
  font-weight: 600;
  font-size: 20px;
`

export const TooltipContent = styled.p`
  font-family: Inter;
  color: ${COLORS.WHITE_87};
  font-weight: 400;
  font-size: 16px;
`

export const TooltipFooter = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`

export const Button = styled.button`
  padding: 6px 16px;
  color: ${COLORS.WHITE_87};
  background: ${COLORS.VIOLET};
  font-weight: 600;
  font-size: 16px;
  border-radius: 24px;
  border: 1px solid ${COLORS.VIOLET};
  &:hover {
    opacity: 0.8;
  }
`

export const BackButton = styled(Button)`
  padding: 6px 16px;
  color: ${COLORS.WHITE_87};
  background: transparent;
  font-weight: 600;
  font-size: 16px;
  border-radius: 24px;
  border: 1px solid ${COLORS.WHITE_24};
  &:hover {
    opacity: 0.8;
  }
`

export const FormattedMessage = styled.div`
  color: ${COLORS.WHITE_87};
`
