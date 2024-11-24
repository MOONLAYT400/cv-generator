import { FC, useState } from "react"

import { IExperienceItem, IDutyItem } from "@/types/cv-data"

import { Button, ButtonsGroup, ItemDescription, Wrapper } from "./index.styled"

//Comment - перенести файл в папку common - оптом это может бть переиспользованно
interface IExperienceDutyItem {
  item: IDutyItem
  idx: number
  setList: (value: any) => void
  updatedItem: number | null
  setUpdatedItem: (value: number | null) => void
}

export const ListItem: FC<IExperienceDutyItem> = ({
  item,
  idx,
  setList,
  updatedItem,
  setUpdatedItem
}) => {
  const { id, text } = item;
  const [inputValue, setInputValue] = useState(text);


  const isCurrentBeingUpdated = updatedItem === id // Comment - а почему это не стейт, 
  // может путь все изменения варяться внутри этого компонента?)

  // Comment - какая то мудреная типизация))) 
  //- попробуй типизировать евент, без деструкта, 
  // а вообще -к огда ты передаешь тупо велью - то его и передавац сразу)
const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
const value = e.target.value;
setInputValue(value);
}

  const handleInputChange = () => {
    // сделать отмену 
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

  // Comment - есил уже используешь такой кондишнл рендеринг - то делай его в верстке. 
  // оно будет там нативно понятнее, ты же не свич-кейс модуль на несколько элементов пишешь
  const renderTextOrInput = () => {
    return isCurrentBeingUpdated ? (
      //Comment - еще момент с рендерами - как думаешь, что происходит когда ты меняешь этот текст?)
      <input value={inputValue} onChange={handleOnChange} /> // handleInputChange
    ) : (
      text
    )
  }

  return (
    <Wrapper>
      <ItemDescription>
        {idx + 1}. {renderTextOrInput()}
      </ItemDescription>
      <ButtonsGroup>
        <Button
          onClick={() => {
            console.log("id ", id)
            setUpdatedItem(isCurrentBeingUpdated ? null : id)
            if(isCurrentBeingUpdated) {
              handleInputChange();
            }
          }}
        >
          {isCurrentBeingUpdated ? "Сохранить" : <>&#9999;</>}
        </Button>
        {!isCurrentBeingUpdated && (
          <Button onClick={handleDelete}>&#128465;</Button>
        )}
      </ButtonsGroup>
    </Wrapper>
  )
}
