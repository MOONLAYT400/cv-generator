import { FC } from "react"

import { ITechItem } from "@/types/cv-data"

import { CloseSystemIcon } from "../icons"

import { Remove, Wrapper } from "./index.styled"

interface IBadge {
  color?: string
  item: ITechItem
  removeWrapper: (item: ITechItem) => void
}

export const Badge: FC<IBadge> = ({ color, item, removeWrapper }) => {
  const removeHandler = () => removeWrapper(item)

  return (
    <Wrapper $color={color}>
      {item.name}
      <Remove onClick={removeHandler}>
        <CloseSystemIcon />
      </Remove>
    </Wrapper>
  )
}
