import { styled } from "styled-components"

import { COLORS } from "@/constants/styles/colors"
import { DEVICE_SIZE } from "@/constants/styles/device-size"

interface IInputWrapper {
  $focused?: boolean
  $loading?: boolean
  $isError?: boolean
  disabled?: boolean
  $value?: boolean
}

export const Wrapper = styled.div<IInputWrapper>`
  position: relative;
  width: 100%;
`

export const Label = styled.div`
  display: flex;
  gap: 2px;
  padding-left: 10px;
  color: ${COLORS.WHITE_87};
  font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  margin-bottom: 4px;
  span {
    color: ${COLORS.SEMANTIC_RED};
    font-size: 14px;
  }
  @media (${DEVICE_SIZE.TABLET}) {
    font-size: 16px;
    span {
      font-size: 16px;
    }
  }
`

export const InputWrapper = styled.div<IInputWrapper>`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px 16px;
  color: ${COLORS.WHITE_87};
  border: 1px solid ${COLORS.WHITE_24};

  ${({ $focused }) =>
    $focused ? `border: 1px solid ${COLORS.TURQUOISE}` : ""};
  ${({ $isError }) =>
    $isError ? `border: 1px solid ${COLORS.SEMANTIC_RED}` : ""};
  border-radius: 12px;
  box-shadow: 5px 5px 20px 1px ${COLORS.WHITE_24};
  @media (${DEVICE_SIZE.TABLET}) {
    border-radius: 16px;
    padding: 14px 16px;
  }
`

export const InputField = styled.input<IInputWrapper>`
  width: 100%;
  background: transparent;
  outline: none;
  color: ${COLORS.WHITE_87};
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  text-overflow: ellipsis;
  border: none;

  &:disabled {
    opacity: 0.5;
  }

  &::placeholder {
    color: ${COLORS.WHITE_48};
    font-family: Inter;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
  }

  &::-ms-input-placeholder {
    color: ${COLORS.WHITE_48};
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  text-overflow: ellipsis;

  appearance: textfield;
  -moz-appearance: textfield;
  @media (${DEVICE_SIZE.TABLET}) {
    font-size: 14px;
    line-height: 18px;
    &::placeholder {
      font-size: 14px;
      line-height: 18px;
    }
  }
`

export const InputActionWrapper = styled.div<IInputWrapper>`
  display: flex;
  gap: 8px;
  align-items: center;
`

export const InputAction = styled.div<IInputWrapper>`
  display: flex;
  gap: 8px;
  align-items: center;
  color: ${COLORS.BLUE};
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
  white-space: nowrap;
  cursor: pointer;
  svg {
    width: 18px;
    height: 18px;
    animation: spinner 1s linear infinite;
    animation-play-state: ${({ $loading }) =>
      $loading ? "running" : "paused"};
    @keyframes spinner {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
`

export const CloseButton = styled.div`
  font-size: 20px;
  color: ${COLORS.SEMANTIC_RED};
  cursor: pointer;
`

export const Error = styled.div<IInputWrapper>`
  position: absolute;
  top: 40px;
  left: 20px;
  background: ${COLORS.BLACK_BACKGROUND};
  background: linear-gradient(
    0deg,
    ${COLORS.BLACK_BACKGROUND} 0%,
    ${COLORS.BLACK_BACKGROUND} 100%
  );
  margin-top: 5px;
  padding: 0 5px;
  color: ${COLORS.SEMANTIC_RED};
  opacity: ${({ $isError }) => ($isError ? 1 : 0)};
  transition: all 0.1s linear;
`
