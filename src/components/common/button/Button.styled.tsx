import { COLORS } from "@/constants/styles/colors"
import { DEVICE_SIZE } from "@/constants/styles/device-size"
import { styled } from "styled-components"

interface ButtonStyles {
  $buttonType: "primary" | "secondary" | "danger" | "ghost"
}

const buttonStyles = {
  primary: {
    border: COLORS.VIOLET,
    background: COLORS.VIOLET,
    color: COLORS.WHITE
  }
}

export const Wrapper = styled.button<ButtonStyles>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
  padding: 8px 16px;
  border-radius: 5px;
  border: 1px solid
    ${({ $buttonType }) =>
      buttonStyles[$buttonType as keyof typeof buttonStyles].border ??
      COLORS.VIOLET};

  background: ${({ $buttonType }) =>
    buttonStyles[$buttonType as keyof typeof buttonStyles].background ??
    COLORS.VIOLET};
  color: ${({ $buttonType }) =>
    buttonStyles[$buttonType as keyof typeof buttonStyles].color ??
    COLORS.WHITE};

  outline: none;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
  white-space: nowrap;
  transition: all 0.2s ease;
  font-family: Inter;
  svg {
    font-size: 16px;
  }

  &:hover:enabled {
    opacity: 0.85;
  }

  &:disabled {
    opacity: 0.48;
    cursor: not-allowed;
  }

  @media (${DEVICE_SIZE.TABLET}) {
    font-size: 16px;
    line-height: 18px;
  }
  @media (${DEVICE_SIZE.MOBILE}) {
    font-weight: 400;
  }
`

export const Loader = styled.div<ButtonStyles>`
  margin: auto;
  border: 2px solid
    ${({ $buttonType }) =>
      buttonStyles[$buttonType as keyof typeof buttonStyles].color ??
      COLORS.WHITE};
  border-radius: 50%;
  border-top: 2px solid transparent;
  width: 16px;
  height: 16px;
  animation: spinner 1s linear infinite;

  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
