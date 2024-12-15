"use client"

import { NavWrapper } from "@/components/features/nav-wrapper"
import { Header } from "@/components/ui/header"

import { ChildrenWrapper, Wrapper } from "./layout.styled"

export default function PublicLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Wrapper>
      <NavWrapper>
        <Header />
        <ChildrenWrapper>{children}</ChildrenWrapper>
      </NavWrapper>
    </Wrapper>
  )
}
