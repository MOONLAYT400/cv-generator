import { FC } from "react"

import { CloseSystemIcon } from "../icons"

import { Remove, Wrapper } from "./index.styled"

interface IBadge {
  color?: string
  item: any
  field?: string
  clickHandler?: () => void
  deleteHandler?: (item: any) => void
}

export const Badge: FC<IBadge> = ({
  color,
  item,
  field = "value",
  clickHandler,
  deleteHandler
}) => {
  return (
    <Wrapper
      $color={color}
      onClick={() => clickHandler?.()}
      $hover={!!clickHandler}
    >
      {item[field as keyof typeof item]}
      {deleteHandler ? (
        <Remove onClick={() => deleteHandler?.(item)}>
          <CloseSystemIcon />
        </Remove>
      ) : null}
    </Wrapper>
  )
}
