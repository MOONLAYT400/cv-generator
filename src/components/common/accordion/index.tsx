import React, { FC, ReactNode, useState } from "react"

import { MinusSystemIcon, PlusSystemIcon } from "../icons"

import { Content, Title, Wrapper } from "./index.styled"

interface IAccordion {
  title: string
  children: ReactNode
  isActiveDefault?: boolean
}

export const Accordion: FC<IAccordion> = ({
  title,
  children,
  isActiveDefault = false
}) => {
  const [isActive, setActive] = useState(isActiveDefault)

  const toggleAccordion = () => setActive(!isActive)

  return (
    <Wrapper $isActive={isActive}>
      <Title onClick={toggleAccordion}>
        {title}
        {isActive ? <MinusSystemIcon /> : <PlusSystemIcon />}
      </Title>
      <Content $isActive={isActive}>{children}</Content>
    </Wrapper>
  )
}
