import { FC, useEffect, useState } from "react"

import { Badge } from "@/components/common/badge"
import { Button } from "@/components/common/button"
import { Input } from "@/components/common/input"
import { SearchSelect } from "@/components/common/select-with-search"
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

  const updateTechArray = (type: string, tech: ITechItem) => {
    const techArray = project.technologies
    const existing = techArray.find((item) => item.value === tech.value)

    if (!existing) {
      const lastIndex = techArray.findLastIndex((item) => item.type === type)

      if (lastIndex === -1) {
        techArray.push(tech)
      } else techArray.splice(lastIndex + 1, 0, tech)

      updateProject({
        ...project,
        technologies: techArray
      })
    }
  }

  const handleRemoveTech = (item: ITechItem) => {
    const filtered = project.technologies.filter(
      (entry) => entry.value !== item.value
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
            label="Период работы"
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
        <SearchSelect
          label="Языки"
          outputField="object"
          options={file.languages}
          saveInputValue={(value) => updateTechArray("languages", value)}
        />
        <SearchSelect
          label="Фронтенд"
          outputField="object"
          options={file.fe}
          saveInputValue={(value) => updateTechArray("fe", value)}
        />
        <SearchSelect
          label="Бекенд"
          options={file.be}
          outputField="object"
          saveInputValue={(value) => updateTechArray("be", value)}
        />
        <SearchSelect
          label="Базы данных"
          outputField="object"
          options={file.databases}
          saveInputValue={(value) => updateTechArray("databases", value)}
        />
      </TechSection>
      <TechSection>
        <SearchSelect
          label="Девопс"
          outputField="object"
          options={file.devops}
          saveInputValue={(value) => updateTechArray("devops", value)}
        />
        <SearchSelect
          label="Тесты"
          outputField="object"
          options={file.test}
          saveInputValue={(value) => updateTechArray("test", value)}
        />
        <SearchSelect
          label="Дополнительно"
          outputField="object"
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
