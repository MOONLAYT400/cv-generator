"use client"
import { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components"

import GlobalStyle from '../../styles/global-styled'
import { themes, defaultTheme, Theme } from '../../styles/themes.styled'

import { ChildrenWrapper, Wrapper } from "./layout.styled"

import { NavWrapper } from "@/components/features/nav-wrapper"
import { Header } from "@/components/ui/header"

export default function PublicLayout({
  children
}: Readonly<{
  children: React.ReactNode,
}>) {
  const [selectedTheme, setSelectedTheme] = useState<Theme>(themes[defaultTheme]);
  const handleThemeChange = (theme: Theme): void => {
    setSelectedTheme(theme);
    localStorage.setItem("current-theme", JSON.stringify(theme));
  };
  useEffect(() => {
    const currentTheme = JSON.parse(localStorage.getItem("current-theme") || '');
    if (currentTheme) {
      setSelectedTheme(currentTheme);
    }
  }, []);

  return (
    <Wrapper>
      <NavWrapper>
        <ThemeProvider theme={selectedTheme}>
          <GlobalStyle />
          <Header handleThemeChange={handleThemeChange} actualTheme={selectedTheme} />
          <ChildrenWrapper>{children}</ChildrenWrapper>
        </ThemeProvider>
      </NavWrapper>
    </Wrapper>
  )
}
