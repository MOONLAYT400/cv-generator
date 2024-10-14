import { FC, useState } from "react"

import { Button } from "@/components/common/button"
import { Input } from "@/components/common/input"
import { IExperienceItem } from "@/types/cv-data"

import { Buttons, Title, Wrapper } from "./index.styled"

interface IAddExperience {
  close: () => void
  saveExperience: (experience: IExperienceItem) => void
}

export const AddExperience: FC<IAddExperience> = ({
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

  const handleUpdateExperience = (key: string, value: any) => {
    updateExperience({ ...experience, [key]: value })
  }

  const handleButtonClick = (type: "save" | "close") => {
    if (type === "save") saveExperience(experience)
    updateExperience({
      company: "",
      role: "",
      duties: "",
      startDate: "",
      endDate: ""
    })
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
          text={"Добавить"}
          handleClick={() => handleButtonClick("save")}
        />
        <Button
          text={"Отмена"}
          handleClick={() => handleButtonClick("close")}
        />
      </Buttons>
    </Wrapper>
  )
}
