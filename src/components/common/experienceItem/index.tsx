import { FC, useState } from "react"

import { Button, ButtonsGroup, ItemDescription, Wrapper } from "./index.styled"

import { IExperienceItem, IDutyItem } from "@/types/cv-data"


interface IExperienceDutyItem {
  item: IDutyItem
  idx: number
  setList: (value: any) => void
}

export const ListItem: FC<IExperienceDutyItem> = ({
  item,
  idx,
  setList,
}) => {
  const { id, text } = item;
  const [inputValue, setInputValue] = useState(text);
  const [updatedItem, setUpdatedItem] = useState<boolean>(false) // назвать isItemUpdated?

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  }

  const saveNewItemText = () => {
    setList((prevList: IExperienceItem) => {
      const newDuties = prevList.duties.map((item) =>
        item.id === id ? { ...item, text: inputValue } : item
      )
      return { ...prevList, duties: newDuties }
    })
  }

  const handleDelete = () => {
    setList((prevList: IExperienceItem) => {
      const newDuties = prevList.duties.filter((item) => item.id !== id)
      return { ...prevList, duties: newDuties }
    })
  }

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.code === 'Enter') {
      saveNewItemText();
      setUpdatedItem(false);
    }
  }

  const handleCancel = () => {
    setUpdatedItem(false);
  }

  return (
    <Wrapper>
      <ItemDescription>
        {idx + 1}. {
          updatedItem ? (
            <input value={inputValue} onChange={handleOnChange} onKeyDown={handleOnKeyDown}/>
          ) : (
            text
          )
        }
      </ItemDescription>
      <ButtonsGroup>
        <Button
          onClick={() => {
            if (updatedItem) {
              saveNewItemText();
            }
            setUpdatedItem(!updatedItem)
          }}
        >
          {updatedItem ? "Сохранить" : <>&#9999;</>}
        </Button>
        {updatedItem ? <Button onClick={handleCancel}>Отмена</Button>
          : <Button onClick={handleDelete}>&#128465;</Button>
        }
      </ButtonsGroup>
    </Wrapper>
  )
}
