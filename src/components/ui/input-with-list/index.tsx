import { FC, useState } from "react"

import { PlusSystemIcon } from "@/components/common/icons"
import { Input } from "@/components/common/input"

import { List, Wrapper } from "./index.styled"
import { ListItem } from "./list-item"

interface IListInput {
  items: any[]
  type: string
  title: string
  saveItem: (value: string | number) => void
  updateItem: (value: any) => void
}

export const ListInput: FC<IListInput> = ({
  items,
  type,
  title,
  saveItem,
  updateItem
}) => {
  const [inputValue, setInputValue] = useState<string | number>("")

  const handleSaveItem = () => {
    if (!inputValue) return
    saveItem(inputValue)
    setInputValue("")
  }

  const handleKeyDown = (
    _event: React.KeyboardEvent<HTMLElement>,
    value: string | number
  ) => {
    if (!value) return
    saveItem(value)
    setInputValue("")
  }

  return (
    <Wrapper>
      <Input
        actionInput
        allowClearValue
        clearAfterAction
        inputValue={inputValue}
        placeholder="Введите должностные обязанности..."
        saveInputValue={setInputValue}
        handleKeyDown={handleKeyDown}
        icon={<PlusSystemIcon />}
        actionHandler={handleSaveItem}
        label={title}
      />
      {items?.length > 0 && (
        <List>
          {items?.map((duty, index) => (
            <ListItem
              type={type}
              item={{ id: duty.id, text: duty.text }}
              idx={index}
              setList={updateItem}
              key={duty.id}
            />
          ))}
        </List>
      )}
    </Wrapper>
  )
}
