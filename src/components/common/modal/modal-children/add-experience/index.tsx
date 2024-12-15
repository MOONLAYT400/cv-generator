import { FC, useEffect, useState } from "react"

import { Button } from "@/components/common/button"
import { Input } from "@/components/common/input"
import { IExperienceItem } from "@/types/cv-data"

import { ListItem } from "../../../experienceItem"

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

  useEffect(() => {
    if (experienceData && "company" in experienceData) {
      updateExperience(experienceData)
    }
  }, [])

  const handleUpdateExperience = (key: string, value: any) => {
    updateExperience({ ...experience, [key]: value })
  }

  const handleUpdateDuties = (value: string | number) => {
    if (value === "") {
      return
    }
    const newDuty = {
      id: getDutyID(),
      text: value
    }
    updateExperience({ ...experience, duties: [...experience.duties, newDuty] })
    setDutiesValue("")
  }

  const handleSave = () => {
    saveExperience(
      experienceData && "company" in experienceData ? "update" : "create",
      experience
    )
    close()
  }
  const getDutyID = () => Math.floor(Math.random() * 1000) //а повторение то все таки возможно)))

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLElement>,
    value: string | number
  ) => {
    if (event.code === "Enter") {
      handleUpdateDuties(value)
    }
  }

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
      <>
        {experience.duties.length > 0 && (
          <>
            <LableTitle>Должностные обязанности</LableTitle>
            <Description>
              {experience.duties.map((duty, index) => (
                <ListItem
                  item={{ id: duty.id, text: duty.text }}
                  idx={index}
                  setList={updateExperience}
                  key={duty.id}
                />
              ))}
            </Description>
          </>
        )}
        <DutyInputsGroup>
          <Input
            allowClearValue
            inputValue={dutiesValue}
            placeholder="Введите должностные обязанности..."
            saveInputValue={setDutiesValue}
            handleKeyDown={handleKeyDown}
          />
          <Button
            buttonType="primary"
            text="+"
            handleClick={() => {
              handleUpdateDuties(dutiesValue)
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
          handleClick={handleSave}
        />
        <Button text={"Отмена"} buttonType={"danger"} handleClick={close} />
      </Buttons>
    </Wrapper>
  )
}
