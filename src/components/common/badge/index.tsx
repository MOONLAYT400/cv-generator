import { FC } from "react"
import { CloseSystemIcon } from "../icons"
import { Remove, Wrapper } from "./index.styled"
import { ITechItem } from "@/types/cv-data"

interface IBadge {
  item: ITechItem
  removeWrapper: (item: ITechItem) => void
}

export const Badge: FC<IBadge> = ({ item, removeWrapper }) => {
  const removeHandler = () => removeWrapper(item)

  return (
    <Wrapper>
      {item.name}
      <Remove onClick={removeHandler}>
        <CloseSystemIcon />
      </Remove>
    </Wrapper>
  )
}
