import React, { FC, ReactNode, useState } from "react"

import { Button } from "../button"
import { MinusSystemIcon, PlusSystemIcon } from "../icons"

import { ButtonsWrapper, Content, Title, Wrapper } from "./index.styled"

type TitleButtonType = {
  text: string
  click: () => void
}

interface IAccordion {
  title: string
  children: ReactNode
  isActiveDefault?: boolean
  titleButtons?: Array<TitleButtonType>
}

export const Accordion: FC<IAccordion> = ({
  title,
  children,
  titleButtons,
  isActiveDefault = false
}) => {
  const [isActive, setActive] = useState(isActiveDefault)

  const toggleAccordion = () => setActive(!isActive)

  return (
    <Wrapper $isActive={isActive}>
      <Title onClick={toggleAccordion}>
        {title}
        <ButtonsWrapper>
          {titleButtons?.length
            ? titleButtons?.map((b, i) => {
                return (
                  <Button
                    text={b.text}
                    handleClick={b.click}
                    key={`Accordion_button_${i}`}
                  />
                )
              })
            : null}
          {isActive ? <MinusSystemIcon /> : <PlusSystemIcon />}
        </ButtonsWrapper>
      </Title>
      <Content $isActive={isActive}>{children}</Content>
    </Wrapper>
  )
}
