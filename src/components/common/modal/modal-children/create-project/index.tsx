import { nanoid } from "nanoid"
import { FC, useEffect, useState } from "react"

import { Button } from "@/components/common/button"
import { Checkbox } from "@/components/common/checkbox"
import { Input } from "@/components/common/input"
import { TextArea } from "@/components/common/text-area"
import { ListInput } from "@/components/ui/input-with-list"
import { techStackTitles } from "@/constants/generator/names"
import { IProjectItem, ITechItem } from "@/types/cv-data"
import { IStackData } from "@/types/stack-data"

import {
  Buttons,
  Inputs,
  InputsSection,
  SliderWrapper,
  SlideWrapper,
  Tab,
  TabsWrapper,
  TechItem,
  TechWrapper,
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
    industry: "",
    period: "",
    technologies: [],
    responsibilities: []
  })
  const [activeTab, setActiveTab] = useState("info")
  const [activeTechTab, setActiveTechTab] = useState("languages")
  const [techList, setTechList] = useState<IStackData>(file)

  useEffect(() => {
    if (projectData && "name" in projectData) {
      updateProject(projectData)
      updateProjectTech()
    }
  }, [])

  const updateProjectTech = () => {
    projectData?.technologies.forEach((tech) => {
      const index = techList[tech.type as keyof typeof techList].findIndex(
        (i) => i.value === tech.value
      )
      if (index) {
        techList[tech.type as keyof typeof techList][index].checked =
          tech.checked
      }
    })
  }

  const handleUpdateProject = (field: string, value: string) =>
    updateProject({ ...project, [field]: value })

  const handleSaveProject = () => {
    const techArray: ITechItem[] = []

    Object.keys(techList).forEach((key) => {
      techList[key as keyof typeof techList].forEach((tech) => {
        if (tech.checked) techArray.push(tech)
      })
    })
    saveProject(projectData && "name" in projectData ? "update" : "create", {
      ...project,
      technologies: techArray
    })
    close()
  }

  const handleUpdateResponsibilities = (value: string | number) => {
    const newResponsibilitiy = {
      id: nanoid(),
      text: value
    }
    updateProject({
      ...project,
      responsibilities: [...project.responsibilities, newResponsibilitiy]
    })
  }

  const isEmtyProject = Object.values(project).every(
    (value) => value.length === 0
  )

  const updateTechStack = (type: string, value: string) => {
    const updated = techList[type as keyof typeof techList].map((item) => {
      if (item.value === value) {
        return { ...item, checked: !item.checked }
      }
      return item
    })
    setTechList({ ...techList, [type]: updated })
  }

  return (
    <Wrapper>
      <Title>Добавить проект</Title>
      <TabsWrapper>
        <Tab
          $active={activeTab === "info"}
          onClick={() => setActiveTab("info")}
        >
          Основные данные
        </Tab>
        <Tab
          $active={activeTab === "tech"}
          onClick={() => setActiveTab("tech")}
        >
          Технологии
        </Tab>
      </TabsWrapper>
      <SliderWrapper>
        <SlideWrapper $activeTab={activeTab === "info"}>
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
                inputValue={project.period}
                saveInputValue={(period) =>
                  handleUpdateProject("period", period as string)
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
          <InputsSection>
            <Input
              label="Отрасль"
              inputValue={project.industry}
              saveInputValue={(industry) =>
                handleUpdateProject("industry", industry as string)
              }
            />{" "}
            <Input
              label="Роль"
              inputValue={project.role}
              saveInputValue={(role) =>
                handleUpdateProject("role", role as string)
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
        </SlideWrapper>
        <SlideWrapper $activeTab={activeTab === "tech"}>
          <TabsWrapper>
            {Object.keys(techList).map((key) => (
              <Tab
                key={key}
                $active={activeTechTab === key}
                onClick={() => setActiveTechTab(key)}
              >
                {techStackTitles[key as keyof typeof techStackTitles]}
              </Tab>
            ))}
          </TabsWrapper>
          <SliderWrapper>
            {Object.keys(techList).map((key) => (
              <SlideWrapper key={key} $activeTab={activeTechTab === key}>
                <TechWrapper>
                  {techList[key as keyof typeof techList].map((item) => (
                    <TechItem key={item.value}>
                      <Checkbox
                        text={item.value}
                        check={() => updateTechStack(item.type, item.value)}
                        isChecked={item.checked}
                      />
                    </TechItem>
                  ))}
                </TechWrapper>
              </SlideWrapper>
            ))}
          </SliderWrapper>
        </SlideWrapper>
      </SliderWrapper>
      <Buttons>
        <Button
          text={projectData && "name" in projectData ? "Обновить" : "Добавить"}
          handleClick={handleSaveProject}
          disabled={isEmtyProject}
        />
        <Button text={"Отмена"} buttonType={"danger"} handleClick={close} />
      </Buttons>
    </Wrapper>
  )
}
