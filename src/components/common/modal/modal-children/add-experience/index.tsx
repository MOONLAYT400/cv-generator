import { FC, useEffect, useState } from "react"

import { Button } from "@/components/common/button"
import { Input } from "@/components/common/input"
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
  const [experience, updateExperience] = useState({
    company: "",
    role: "",
    duties: "",
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

  const handleButtonClick = () => {
    saveExperience(
      experienceData && "company" in experienceData ? "update" : "create",
      experience
    )
    close()
  }

  return (
    <Wrapper>
      <Title>Опыт работы</Title>
      <Input
        label="Учебное заведение"
        inputValue={experience.company}
        placeholder="Введите название заведения..."
        saveInputValue={(company) => handleUpdateExperience("company", company)}
      />
      <Input
        label="Кафедра"
        inputValue={experience.role}
        placeholder="Введите название кафедры..."
        saveInputValue={(role) => handleUpdateExperience("role", role)}
      />
      <Input
        label="Направление"
        inputValue={experience.duties}
        placeholder="Введите направление..."
        saveInputValue={(duties) => handleUpdateExperience("duties", duties)}
      />
      <Input
        label="Начало учебы"
        inputValue={experience.startDate}
        placeholder="Дата начала учебы..."
        saveInputValue={(startDate) =>
          handleUpdateExperience("startDate", startDate)
        }
      />
      <Input
        label="Окончание учебы"
        inputValue={experience.endDate}
        placeholder="Дата окончания учебы..."
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
