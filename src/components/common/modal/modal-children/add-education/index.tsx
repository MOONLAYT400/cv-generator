import { FC, useState } from "react"

import { Button } from "@/components/common/button"
import { Input } from "@/components/common/input"
import { IEducationItem } from "@/types/cv-data"

import { Buttons, Title, Wrapper } from "./index.styled"

interface IAddEducation {
  close: () => void
  saveEducation: (education: IEducationItem) => void
}

export const AddEducation: FC<IAddEducation> = ({ close, saveEducation }) => {
  const [education, updateEducation] = useState({
    university: "",
    department: "",
    field: "",
    startDate: "",
    endDate: ""
  })

  const handleUpdateEducation = (key: string, value: any) => {
    updateEducation({ ...education, [key]: value })
  }

  const handleButtonClick = (type: "save" | "close") => {
    if (type === "save") saveEducation(education)
    updateEducation({
      university: "",
      department: "",
      field: "",
      startDate: "",
      endDate: ""
    })
    close()
  }

  return (
    <Wrapper>
      <Title>Образование</Title>
      <Input
        label="Учебное заведение"
        inputValue={education.university}
        placeholder="Введите название заведения..."
        saveInputValue={(university) =>
          handleUpdateEducation("university", university)
        }
      />
      <Input
        label="Кафедра"
        inputValue={education.department}
        placeholder="Введите название кафедры..."
        saveInputValue={(department) =>
          handleUpdateEducation("department", department)
        }
      />
      <Input
        label="Направление"
        inputValue={education.field}
        placeholder="Введите направление..."
        saveInputValue={(field) => handleUpdateEducation("field", field)}
      />
      <Input
        label="Начало учебы"
        inputValue={education.startDate}
        placeholder="Дата начала учебы..."
        saveInputValue={(startDate) =>
          handleUpdateEducation("startDate", startDate)
        }
      />
      <Input
        label="Окончание учебы"
        inputValue={education.endDate}
        placeholder="Дата окончания учебы..."
        saveInputValue={(endDate) => handleUpdateEducation("endDate", endDate)}
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
