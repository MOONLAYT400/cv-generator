import { FC, useEffect, useState } from "react"

import { Button } from "@/components/common/button"
import { Input } from "@/components/common/input"
import { IExperienceItem } from "@/types/cv-data"

import { ListItem } from "./experienceItem"
import {
  Description,
  Buttons,
  Title,
  Wrapper,
  DutyInputsGroup,
  LableTitle
} from "./index.styled"

interface IAddExperience {
  experienceData: IExperienceItem | null
  close: () => void
  saveExperience: (
    type: "create" | "update",
    experience: IExperienceItem
  ) => void
}

export const AddExperience: FC<IAddExperience> = ({
  experienceData,
  close,
  saveExperience
}) => {
  const [experience, updateExperience] = useState<IExperienceItem>({
    company: "",
    role: "",
    duties: [],
    startDate: "",
    endDate: ""
  })
  const [dutiesValue, setDutiesValue] = useState<string | number>("")
  const [updatedItem, setUpdatedItem] = useState<number | null>(null) //Comment 
  // - почему этот стейт не внутри лист итема, и зачем мы рендерим весь список 
  // каждый раз при изменении этого статуса?
  // Comment - ну и тут кроеться проблема не сохраняюзегося инпута помоему, 
  //если я правильно понял о чем ты, ну и вообще 
  // - такие штуки всегда нужно хранить у самого нижнего ребенка, если менно прямо не нужно обратное

  useEffect(() => {
    if (experienceData && "company" in experienceData) {
      updateExperience(experienceData)
    }
  }, [])

  const handleUpdateExperience = (key: string, value: any) => {
    updateExperience({ ...experience, [key]: value })
  }

  const handleUpdateDuties = (
    value: string | number,
    itemId?: number | undefined
  ) => {
    if (itemId) {
      const updatedDuty = {
        id: itemId,
        text: value
      }
      updateExperience({
        ...experience,
        duties: [...experience.duties, updatedDuty]
      }) //!!!!!!!!!!
    }
    const newDuty = {
      id: getDutyID(),
      text: value
    }
    updateExperience({ ...experience, duties: [...experience.duties, newDuty] })
  }

  const handleButtonClick = () => {
    saveExperience(
      experienceData && "company" in experienceData ? "update" : "create",
      experience
    )
    close()
  }
  const getDutyID = () => Math.floor(Math.random() * 1000) //а повторение то все таки возможно)))

  return (
    <Wrapper>
      <Title>Опыт работы</Title>
      <Input
        label="Наименование компании"
        inputValue={experience.company}
        placeholder="Введите название компании..."
        saveInputValue={(company) => handleUpdateExperience("company", company)}
      />
      <Input
        label="Должность"
        inputValue={experience.role}
        placeholder="Введите название должности..."
        saveInputValue={(role) => handleUpdateExperience("role", role)}
      />
      {/* Группа должностных обязанностей */}
      <>
        {/* Группа УЖЕ ДОБАВЕННЫХ должностных обязанностей */}

        {experience.duties.length > 0 && (
          <>
            <LableTitle>Должностные обязанности</LableTitle>
            <Description>
              {experience.duties.map((duty, index) => (
                <>
                  <ListItem
                    item={{ id: duty.id, text: duty.text }}
                    idx={index}
                    setList={updateExperience}
                    updatedItem={updatedItem}
                    setUpdatedItem={setUpdatedItem}
                  />
                </>
              ))}
            </Description>
          </>
        )}
        <DutyInputsGroup>
          <Input
            // label="Должностные обязанности"
            inputValue={dutiesValue}
            placeholder="Введите должностные обязанности..."
            // тут с этим нужно что-то сделать, чтобы из инпута тоже сохранялось
            saveInputValue={setDutiesValue}
          />
          <Button
            buttonType="primary"
            text="+"
            handleClick={() => {
              handleUpdateDuties(dutiesValue)
              setDutiesValue("")
            }}
          />
        </DutyInputsGroup>
      </>
      <Input
        label="Начало работы"
        inputValue={experience.startDate}
        placeholder="Дата начала работы..."
        saveInputValue={(startDate) =>
          handleUpdateExperience("startDate", startDate)
        }
      />
      <Input
        label="Окончание работы"
        inputValue={experience.endDate}
        placeholder="Дата окончания работы..."
        saveInputValue={(endDate) => handleUpdateExperience("endDate", endDate)}
      />
      <Buttons>
        <Button
          text={
            experienceData && "company" in experienceData
              ? "Обновить"
              : "Добавить"
          }
          handleClick={handleButtonClick}
        />
        <Button text={"Отмена"} buttonType={"danger"} handleClick={close} />
      </Buttons>
    </Wrapper>
  )
}
