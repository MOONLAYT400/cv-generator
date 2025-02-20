import { createGlobalStyle } from "styled-components"

import { themes } from './themes.styled'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: Open-Sans, Helvetica, Sans-Serif; 
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
  }

.light {
  background-color: ${themes.light.colors.header};
}
.dark {
  background-color: ${themes.dark.colors.header};
}

.active{
    border: 3px solid ${({ theme }) => theme.colors.button};
}
`

export default GlobalStyle;
