import { styled } from "styled-components"

import { COLORS } from "@/constants/styles/colors"

export const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 20px;
  padding: 0 10px;
`

export const ProjectList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 250px;
  overflow: auto;
`

export const Project = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
  border: 1px solid ${COLORS.WHITE_24};
  border-radius: 8px;
  padding: 2px 2px 2px 10px;

  p {
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 80%;
    white-space: nowrap;
  }

  &:hover {
    cursor: pointer;
    border: 1px solid ${COLORS.TURQUOISE};
  }
`
