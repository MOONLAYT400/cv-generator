import { FC, useEffect, useState } from "react"

import { Button } from "@/components/common/button"
import { Input } from "@/components/common/input"
import { ListInput } from "@/components/ui/input-with-list"
import { IExperienceItem } from "@/types/cv-data"

import { Buttons, Title, Wrapper } from "./index.styled"

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

  useEffect(() => {
    if (experienceData && "company" in experienceData) {
      updateExperience(experienceData)
    }
  }, [])

  const handleUpdateExperience = (key: string, value: any) => {
    updateExperience({ ...experience, [key]: value })
  }

  const handleUpdateDuties = (value: string | number) => {
    const newDuty = {
      id: getDutyID(),
      text: value
    }
    updateExperience({ ...experience, duties: [...experience.duties, newDuty] })
  }

  const handleSave = () => {
    saveExperience(
      experienceData && "company" in experienceData ? "update" : "create",
      experience
    )
    close()
  }
  const getDutyID = () => Math.floor(Math.random() * 1000)

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
      <ListInput
        title={"Должностные обязанности"}
        type={"duties"}
        items={experience.duties}
        saveItem={handleUpdateDuties}
        updateItem={updateExperience}
      />
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
