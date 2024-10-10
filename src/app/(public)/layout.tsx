"use client"

import { Header } from "@/components/ui/header"

import { ChildrenWrapper, Wrapper } from "./layout.styled"

export default function PublicLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Wrapper>
      <Header />
      <ChildrenWrapper>{children}</ChildrenWrapper>
    </Wrapper>
  )
}
