import { FC, useState } from "react"

import { Edit16Icon, Trash16Icon } from "@/components/common/icons"
import { IExperienceItem, IDutyItem } from "@/types/cv-data"

import { Button, ButtonsGroup, ItemDescription, Wrapper } from "./index.styled"

interface IExperienceDutyItem {
  item: IDutyItem
  idx: number
  type: string
  setList: (value: any) => void
}

export const ListItem: FC<IExperienceDutyItem> = ({
  item,
  idx,
  type,
  setList
}) => {
  const { id, text } = item
  const [inputValue, setInputValue] = useState(text)
  const [updatedItem, setUpdatedItem] = useState<boolean>(false)
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
  }

  const saveNewItemText = () => {
    setList((prevList: IExperienceItem) => {
      //@ts-expect-error - normal
      const newDuties = prevList[type as keyof typeof prevList]?.map((item) =>
        item.id === id ? { ...item, text: inputValue } : item
      )
      return { ...prevList, [type]: newDuties }
    })
  }

  const handleDelete = () => {
    setList((prevList: IExperienceItem) => {
      //@ts-expect-error - normal
      const newDuties = prevList[type as keyof typeof prevList]?.filter(
        (item: any) => item.id !== id
      )
      return { ...prevList, [type]: newDuties }
    })
  }

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      saveNewItemText()
      setUpdatedItem(false)
    }
  }

  const handleCancel = () => {
    setUpdatedItem(false)
  }

  return (
    <Wrapper>
      <ItemDescription>
        {idx + 1}.&nbsp;
        {updatedItem ? (
          <input
            value={inputValue}
            onChange={handleOnChange}
            onKeyDown={handleOnKeyDown}
          />
        ) : (
          <div onDoubleClick={() => setUpdatedItem(true)}>{text}</div>
        )}
      </ItemDescription>
      <ButtonsGroup>
        <Button
          onClick={() => {
            if (updatedItem) {
              saveNewItemText()
            }
            setUpdatedItem(!updatedItem)
          }}
        >
          {updatedItem ? "Сохранить" : <Edit16Icon />}
        </Button>
        {updatedItem ? (
          <Button onClick={handleCancel}>Отмена</Button>
        ) : (
          <Button onClick={handleDelete}>
            <Trash16Icon />
          </Button>
        )}
      </ButtonsGroup>
    </Wrapper>
  )
}
