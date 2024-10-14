import { styled } from "styled-components"

import { COLORS } from "@/constants/styles/colors"
import { DEVICE_SIZE } from "@/constants/styles/device-size"

interface IWrapper {
  $isOpened: boolean
}

export const Wrapper = styled.div<IWrapper>`
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: ${({ $isOpened }) =>
    $isOpened ? COLORS.BLACK_48 : "transparent"};
  z-index: 9;

  animation-name: ${({ $isOpened }) =>
    $isOpened ? "openModal" : "closeModal"};
  animation-delay: 0s;
  animation-fill-mode: backwards;
  animation-duration: 0.7s;
  animation-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
  @keyframes openModal {
    0% {
      background-color: transparent;
    }
    100% {
      background-color: ${COLORS.BLACK_48};
    }
  }
  @keyframes closeModal {
    0% {
      background-color: ${COLORS.BLACK_48};
    }
    100% {
      background-color: transparent;
    }
  }
`

export const Modal = styled.div<IWrapper>`
  max-width: 98%;
  position: relative;
  padding: 30px;
  border-radius: 12px;
  background: ${COLORS.BLACK_BACKGROUND};
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${({ $isOpened }) => ($isOpened ? "1" : "0")};
  animation-timing-function: cubic-bezier(
    ${({ $isOpened }) =>
      $isOpened ? "0.455, 0.03, 0.515, 0.955" : "1,-0.24, 0, 1.25"}
  );
  animation-name: ${({ $isOpened }) => ($isOpened ? "popModal" : "stashModal")};
  animation-delay: 0s;
  animation-duration: 0.8s;
  animation-fill-mode: backwards;
  @keyframes popModal {
    0% {
      transform: translateY(-200px);
      opacity: 0;
    }
    100% {
      transform: translateY(0px);
      opacity: 1;
    }
  }
  @keyframes stashModal {
    0% {
      transform: translateY(0px);
      opacity: 1;
    }
    100% {
      transform: translateY(400px);
      opacity: 0;
    }
  }
  @media (${DEVICE_SIZE.MOBILE}) {
    padding: 32px 24px;
    min-width: 85%;
  }
`

export const CloseButton = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 20px;
  color: ${COLORS.SEMANTIC_RED};
  cursor: pointer;
  &:hover {
    transform: scale(1.3);
  }
`
