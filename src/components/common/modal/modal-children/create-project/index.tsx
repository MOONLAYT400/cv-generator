import { FC, useEffect, useState } from "react"

import { Badge } from "@/components/common/badge"
import { Button } from "@/components/common/button"
import { Input } from "@/components/common/input"
import { Select } from "@/components/common/select"
import { TextArea } from "@/components/common/text-area"
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
    technologies: {
      languages: [],
      fe: [],
      be: [],
      databases: [],
      devops: [],
      test: [],
      additional: []
    }
  })

  useEffect(() => {
    if (projectData && "name" in projectData) {
      updateProject(projectData)
    }
  }, [])

  const handleUpdateProject = (field: string, value: string) =>
    updateProject({ ...project, [field]: value })

  const updateTechArray = (type: string, name: string) => {
    const techArray =
      project.technologies[type as keyof typeof project.technologies]

    if (Array.isArray(techArray)) {
      const existing = techArray.find((item) => item.name === name)

      if (!existing) {
        techArray.push({ type, name })
        updateProject({
          ...project,
          technologies: { ...project.technologies, [type]: techArray }
        })
      }
    }
  }

  const handleRemoveTech = (item: ITechItem) => {
    const techArray =
      project.technologies[item.type as keyof typeof project.technologies]

    if (Array.isArray(techArray)) {
      const filtered = techArray.filter((entry) => entry.name !== item.name)
      updateProject({
        ...project,
        technologies: { ...project.technologies, [item.type]: filtered }
      })
    }
  }

  const handleButtonClick = () => {
    saveProject(
      projectData && "name" in projectData ? "update" : "create",
      project
    )
    close()
  }

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
        {project.technologies.languages.map((language, index) => (
          <Badge
            item={language}
            key={"languge_" + index}
            color={techColors.languages}
            removeWrapper={handleRemoveTech}
          />
        ))}
        {project.technologies.fe.map((fe, index) => (
          <Badge
            item={fe}
            key={"fe_" + index}
            color={techColors.fe}
            removeWrapper={handleRemoveTech}
          />
        ))}
        {project.technologies.be.map((be, index) => (
          <Badge
            item={be}
            key={"be_" + index}
            color={techColors.be}
            removeWrapper={handleRemoveTech}
          />
        ))}
        {project.technologies.databases.map((database, index) => (
          <Badge
            item={database}
            key={"databases_" + index}
            color={techColors.databases}
            removeWrapper={handleRemoveTech}
          />
        ))}
        {project.technologies.devops.map((devops, index) => (
          <Badge
            item={devops}
            key={"devops_" + index}
            color={techColors.devops}
            removeWrapper={handleRemoveTech}
          />
        ))}
        {project.technologies.test.map((test, index) => (
          <Badge
            item={test}
            key={"test_" + index}
            color={techColors.test}
            removeWrapper={handleRemoveTech}
          />
        ))}
        {project.technologies.additional.map((additional, index) => (
          <Badge
            item={additional}
            key={"additional_" + index}
            color={techColors.additional}
            removeWrapper={handleRemoveTech}
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
