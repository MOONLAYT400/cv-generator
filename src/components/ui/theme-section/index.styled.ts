import { styled } from "styled-components";

export const ThemeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: right;
  align-items: center;
`;

export const ThemeButton = styled.button`
  margin: 0 5px;
  padding-left: 10px;
  color: ${({ theme }) => theme.colors.text};
  background: transparent;
  border: none;

  &:hover {
    opacity: 0.85;
    cursor: pointer;
  }
`;
