import { FC } from "react"

import { ITechItem } from "@/types/cv-data"

import { CloseSystemIcon } from "../icons"

import { Remove, Wrapper } from "./index.styled"

interface IBadge {
  color?: string
  item: ITechItem
  deleteHandler?: (item: ITechItem) => void
}

export const Badge: FC<IBadge> = ({ color, item, deleteHandler }) => {
  const removeHandler = () => deleteHandler?.(item)

  return (
    <Wrapper $color={color}>
      {item.name}
      {deleteHandler ? (
        <Remove onClick={removeHandler}>
          <CloseSystemIcon />
        </Remove>
      ) : null}
    </Wrapper>
  )
}
