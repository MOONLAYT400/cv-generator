import { styled } from "styled-components"

interface IAccordionStyled {
  $isActive?: boolean
}

export const Wrapper = styled.div<IAccordionStyled>`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.shadow};
`

export const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  user-select: none;
  
  font-family: Inter;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 32px;
`

export const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

export const Content = styled.div<IAccordionStyled>`
  overflow: hidden;
  max-height: ${({ $isActive }) => ($isActive ? "100rem" : 0)};
  padding-bottom: ${({ $isActive }) => ($isActive ? "32px" : 0)};
  transition: all 0.4s ease-in;
`
