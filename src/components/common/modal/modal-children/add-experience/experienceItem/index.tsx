import { FC } from "react"

import { IExperienceItem } from "@/types/cv-data"

import { Button, ButtonsGroup, ItemDescription, Wrapper } from "./index.styled"

//Comment - перенести файл в папку common - оптом это может бть переиспользованно
interface IExperienceDutyItem {
  item: { id: number; text: string | number } // интерфейс есть
  idx: number
  setList: (value: any) => void
  updatedItem: number | null
  setUpdatedItem: (value: number | null) => void
}

export const ListItem: FC<IExperienceDutyItem> = ({
  item: { id, text }, // Comment - деструктурировать лучше уже внутри функции, ане в пропсах
  idx,
  setList,
  updatedItem,
  setUpdatedItem
}) => {
  const isCurrentBeingUpdated = updatedItem === id // Comment - а почему это не стейт, 
  // может путь все изменения варяться внутри этого компонента?)

  // Comment - какая то мудреная типизация))) 
  //- попробуй типизировать евент, без деструкта, 
  // а вообще -к огда ты передаешь тупо велью - то его и передавац сразу)
  const handleInputChange = ({
    target: { value }
  }: {
    target: { value: string }
  }) => {
    // нельзя сделать отмену, изменения сразу сохраняются
    setList((prevList: IExperienceItem) => {
      const newDuties = prevList.duties.map((item) =>
        item.id === id ? { ...item, text: value } : item
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
      <input value={text} onChange={handleInputChange} />
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
