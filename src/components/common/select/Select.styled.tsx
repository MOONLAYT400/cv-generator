import { COLORS } from "@/constants/styles/colors"
import { styled } from "styled-components"

interface IInputWrapper {
  $focused?: boolean
  $loading?: boolean
  $active?: boolean
  $isOpened?: boolean
  $position?: "top" | "bottom"
  $opacity?: boolean
}

export const Wrapper = styled.div<IInputWrapper>`
  position: relative;
`

export const Label = styled.div`
  display: flex;
  gap: 2px;
  padding-left: 16px;
  color: ${COLORS.WHITE_87};
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  margin-bottom: 8px;
  span {
    color: ${COLORS.SEMANTIC_RED};
    font-size: 16px;
  }
`

export const InputWrapper = styled.div<IInputWrapper>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 13px 14px;
  border-radius: 16px;
  border: 1px solid
    ${({ $focused }) => (!$focused ? COLORS.WHITE_24 : COLORS.VIOLET)};
  background: transparent;
  color: ${COLORS.WHITE_87};
  user-select: none;

  p {
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 80%;
    white-space: nowrap;
    text-align: center;
    min-width: 20px;
    color: ${COLORS.WHITE_87};
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
  }
  cursor: pointer;
`

export const DropDown = styled.div<IInputWrapper>`
  opacity: ${({ $opacity }) => ($opacity ? 1 : 0)};
  position: absolute;
  width: 100%;
  ${({ $position }) => ($position === "top" ? "bottom: 110%;" : "top: 110%;")};
  left: 0;
  z-index: 1;
  max-height: 150px;
  overflow-y: auto;
  display: ${({ $isOpened }) => ($isOpened ? "flex" : "none")};
  flex-direction: column;
  gap: 4px;
  padding: 8px 10px;
  border-radius: 16px;
  border: 1px solid ${COLORS.WHITE_24};
  color: ${COLORS.WHITE_87};
  background: ${COLORS.BLACK_BACKGROUND};
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`
export const Item = styled.div<IInputWrapper>`
  background: ${({ $active }) => ($active ? COLORS.VIOLET : "transparent")};
  color: ${COLORS.WHITE_87};
  padding: 10px 10px;
  border-radius: 16px;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  cursor: pointer;
  user-select: none;
  &:hover {
    background: ${({ $active }) => ($active ? COLORS.VIOLET : COLORS.WHITE_24)};
  }
`
