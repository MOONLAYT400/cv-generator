import { styled } from "styled-components"

import { COLORS } from "@/constants/styles/colors"

export const LoaderWrapper = styled.div`
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  z-index: 25;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${COLORS.BLACK_BACKGROUND};
`

export const Loader = styled.div`
  margin: auto;
  border: 5px solid ${COLORS.TURQUOISE};
  border-radius: 50%;
  border-top: 2px solid transparent;
  width: 100px;
  height: 100px;
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
