import { FC, useEffect, useState } from "react"

import { Badge } from "@/components/common/badge"
import { Button } from "@/components/common/button"
import { Input } from "@/components/common/input"
import { Select } from "@/components/common/select"
import { TextArea } from "@/components/common/text-area"
import { ListInput } from "@/components/ui/input-with-list"
import { techColors } from "@/constants/styles/colors"
import { IProjectItem, ITechItem } from "@/types/cv-data"
import { IStackData } from "@/types/stack-data"

import {
  Buttons,
  Inputs,
  InputsSection,
  TechList,
  TechSection,
  Title,
  Wrapper
} from "./index.styled"

interface ICreateProject {
  file: IStackData
  projectData: IProjectItem | null
  close: () => void
  saveProject: (type: "create" | "update", project: IProjectItem) => void
}

export const CreateProject: FC<ICreateProject> = ({
  file,
  projectData,
  close,
  saveProject
}) => {
  const [project, updateProject] = useState<IProjectItem>({
    name: "",
    description: "",
    role: "",
    technologies: [],
    responsibilities: []
  })

  useEffect(() => {
    if (projectData && "name" in projectData) {
      updateProject(projectData)
    }
  }, [])

  const handleUpdateProject = (field: string, value: string) =>
    updateProject({ ...project, [field]: value })

  const updateTechArray = (type: string, name: string) => {
    const existing = project.technologies.find((item) => item.name === name)

    if (!existing) {
      updateProject({
        ...project,
        technologies: [...project.technologies, { type, name }]
      })
    }
  }

  const handleRemoveTech = (item: ITechItem) => {
    const filtered = project.technologies.filter(
      (entry) => entry.name !== item.name
    )
    updateProject({
      ...project,
      technologies: filtered
    })
  }

  const handleButtonClick = () => {
    saveProject(
      projectData && "name" in projectData ? "update" : "create",
      project
    )
    close()
  }

  const handleUpdateResponsibilities = (value: string | number) => {
    const newDuty = {
      id: getDutyID(),
      text: value
    }
    updateProject({
      ...project,
      responsibilities: [...project.responsibilities, newDuty]
    })
  }

  const getDutyID = () => Math.floor(Math.random() * 1000)

  return (
    <Wrapper>
      <Title>Добавить проект</Title>
      <InputsSection>
        <Inputs>
          <Input
            label="Название"
            inputValue={project.name}
            saveInputValue={(name) =>
              handleUpdateProject("name", name as string)
            }
          />
          <Input
            label="Роль"
            inputValue={project.role}
            saveInputValue={(role) =>
              handleUpdateProject("role", role as string)
            }
          />
        </Inputs>
        <TextArea
          label="Описание"
          inputValue={project.description}
          saveInputValue={(description) =>
            handleUpdateProject("description", description as string)
          }
        />
      </InputsSection>
      <ListInput
        title={"Над чем я работал"}
        type={"responsibilities"}
        items={project.responsibilities}
        saveItem={handleUpdateResponsibilities}
        updateItem={updateProject}
      />
      <TechSection>
        <Select
          label="Языки"
          options={file.languages}
          saveInputValue={(value) => updateTechArray("languages", value)}
        />
        <Select
          label="Фронтенд"
          options={file.fe}
          saveInputValue={(value) => updateTechArray("fe", value)}
        />
        <Select
          label="Бекенд"
          options={file.be}
          saveInputValue={(value) => updateTechArray("be", value)}
        />
        <Select
          label="Базы данных"
          options={file.databases}
          saveInputValue={(value) => updateTechArray("databases", value)}
        />
      </TechSection>
      <TechSection>
        <Select
          label="Девопс"
          options={file.devops}
          saveInputValue={(value) => updateTechArray("devops", value)}
        />
        <Select
          label="Тесты"
          options={file.test}
          saveInputValue={(value) => updateTechArray("test", value)}
        />
        <Select
          label="Дополнительно"
          options={file.additional}
          saveInputValue={(value) => updateTechArray("additional", value)}
        />
      </TechSection>
      <TechList>
        {project.technologies.map((tech, index) => (
          <Badge
            item={tech}
            key={"languge_" + index}
            color={techColors[tech.type as keyof typeof techColors]}
            deleteHandler={handleRemoveTech}
          />
        ))}
      </TechList>
      <Buttons>
        <Button
          text={projectData && "name" in projectData ? "Обновить" : "Добавить"}
          handleClick={handleButtonClick}
        />
        <Button text={"Отмена"} buttonType={"danger"} handleClick={close} />
      </Buttons>
    </Wrapper>
  )
}
