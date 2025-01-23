import { FC, useState } from "react"

import { CloseSystemIcon, Help24Icon } from "../icons"
import { TechHelpModal } from "../modal"

import { Help, Remove, Wrapper } from "./index.styled"

interface IBadge {
  item: any
  color?: string
  field?: string
  withHelp?: boolean
  clickHandler?: () => void
  deleteHandler?: (item: any) => void
}

export const Badge: FC<IBadge> = ({
  color,
  item,
  field = "value",
  withHelp = false,
  clickHandler,
  deleteHandler
}) => {
  const [isOpened, setIsOpened] = useState(false)

  const handleOpenHelp = () => setIsOpened(true)

  const handleCloseHelp = () => setIsOpened(false)

  console.log(item)

  return (
    <Wrapper
      $color={color}
      onClick={() => clickHandler?.()}
      $hover={!!clickHandler}
    >
      <TechHelpModal close={handleCloseHelp} data={item} isOpened={isOpened} />
      {typeof item === "object" ? item[field as keyof typeof item] : item}
      {withHelp ? (
        <Help
          onClick={(e) => {
            e.stopPropagation()
            handleOpenHelp()
          }}
        >
          <Help24Icon />
        </Help>
      ) : null}
      {deleteHandler ? (
        <Remove onClick={() => deleteHandler?.(item)}>
          <CloseSystemIcon />
        </Remove>
      ) : null}
    </Wrapper>
  )
}
