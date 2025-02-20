import { styled } from "styled-components"

import { COLORS } from "@/constants/styles/colors"
import { DEVICE_SIZE } from "@/constants/styles/device-size"
import { Theme } from "@/styles/themes.styled"

interface ButtonStyles {
  $buttonType: "primary" | "secondary" | "danger" | "ghost"
}

const buttonStyles = {
  primary: {
   border: (theme: Theme) => theme.colors.button,
   color: (theme: Theme) => theme.colors.text
  },
  danger: {
    border: (theme: Theme) => theme.colors.buttonD,
    background: COLORS.ORANGE,
    color: (theme: Theme) => theme.colors.text
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
  ${({ theme }) => theme.colors.button};
  background: ${({ theme, $buttonType }) => 
    buttonStyles[$buttonType as keyof typeof buttonStyles].border(theme) ??
     COLORS.VIOLET}; 
  
  color: ${({ theme, $buttonType }) => 
    buttonStyles[$buttonType as keyof typeof buttonStyles].color(theme) ??
     COLORS.VIOLET};

  outline: none;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  white-space: nowrap;
  transition: all 0.2s ease;
  font-family: Inter;
  svg {
    font-size: 16px;
  }

  &:hover:enabled {
    opacity: 0.85;
    cursor: pointer;
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
    ${({ theme, $buttonType }) =>
      buttonStyles[$buttonType as keyof typeof buttonStyles].color(theme) ??
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
