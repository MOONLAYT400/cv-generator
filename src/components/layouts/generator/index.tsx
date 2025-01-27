"use client"
import { nanoid } from "nanoid"
import dynamic from "next/dynamic"
import React, { FC, useLayoutEffect, useRef, useState } from "react"
import { STATUS } from "react-joyride"

import { Button } from "@/components/common/button"
import { Input } from "@/components/common/input"
import {
  AddEducationModal,
  AddExperienceModal,
  CompareTechModal,
  CreateProjectModal
} from "@/components/common/modal"
import { OnboardingTooltip } from "@/components/common/onboarding-tooltip"
import { TextArea } from "@/components/common/text-area"
import { ImageWithPreview } from "@/components/common/upload-image"
import { EducationsSection } from "@/components/ui/generator-sections/education-section"
import { ExperienceSection } from "@/components/ui/generator-sections/experience-section"
import { ProjectsSection } from "@/components/ui/generator-sections/projects-section"
import { TechSection } from "@/components/ui/generator-sections/tech-section"
import { onboardingSteps } from "@/constants/onboarding/steps"
import { onboardingStyleOptions } from "@/constants/onboarding/styles"
import { useCVGenerator } from "@/hooks/useCVGenerator"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import {
  ICVParams,
  IEducationItem,
  IExperienceItem,
  IProjectItem,
  ITechItem
} from "@/types/cv-data"
import { IStackData } from "@/types/stack-data"

import {
  Buttons,
  InfoInputs,
  InfoSection,
  Wrapper,
  FileInputs
} from "./index.styled"

const JoyRideNoSSR = dynamic(() => import("react-joyride"), { ssr: false })

interface IGeneratorLayout {
  file: IStackData
}

export const GeneratorLayout: FC<IGeneratorLayout> = ({ file }) => {
  const [onboarding, handleSetOnboarding] = useLocalStorage("onboarding")

  const [cvData, setCVData] = useState<ICVParams>({
    fullName: "",
    shortBio: "",
    photo: "",
    education: [],
    experience: [],
    projects: [],
    technologies: []
  })

  const saveDocument = useCVGenerator(cvData)

  const [modals, controlModals] = useState({
    project: null,
    education: null,
    experience: null,
    techComparison: null
  })
  const [run, setRun] = useState(false)

  useLayoutEffect(() => {
    if (typeof window === "undefined") return
    const localOnboarding = localStorage.getItem("onboarding")
    const parsedOnboarding = JSON.parse(localOnboarding ?? "false")
    if (!parsedOnboarding) {
      setRun(true)
    }
  }, [onboarding])

  const updateCVData = (key: string, value: any) => {
    if (key === "fullName" && typeof value === "string") {
      return setCVData({ ...cvData, [key]: value.toUpperCase() })
    }
    setCVData({ ...cvData, [key]: value })
  }

  //tech control

  const updateTechArray = (type: string, tech: ITechItem) => {
    const techArray = cvData.technologies
    const existing = techArray.find((item) => item.value === tech.value)

    if (!existing) {
      const lastIndex = techArray.findLastIndex((item) => item.type === type)
      if (lastIndex === -1) {
        techArray.push(tech)
      } else techArray.splice(lastIndex + 1, 0, tech)
      setCVData({ ...cvData, technologies: techArray })
    }
  }

  const handleRemoveTech = (item: ITechItem) => {
    const filtered = cvData.technologies.filter(
      (entry) => entry.value !== item.value
    )
    setCVData({
      ...cvData,
      technologies: filtered
    })
  }

  // educations controls
  const handleSaveEducation = (
    type: "create" | "update",
    educationData: IEducationItem
  ) => {
    if (type === "create") {
      const education = { ...educationData, id: nanoid() }
      const updatedEducations = [...cvData.education, education]
      setCVData({ ...cvData, education: updatedEducations })
      return
    }

    const updatedEducations = cvData.education.map((education) => {
      if (education.id === educationData.id) {
        return educationData
      }
      return education
    })
    setCVData({ ...cvData, education: updatedEducations })
  }

  const handleDeleteEducation = (id: string | number) => {
    const filtered = cvData.education.filter((ed) => ed.id !== id)
    setCVData({ ...cvData, education: filtered })
  }

  // experience control

  const handleSaveExperience = (
    type: "create" | "update",
    experienceData: IExperienceItem
  ) => {
    if (type === "create") {
      const experience = { ...experienceData, id: nanoid() }
      const updatedExperience = [...cvData.experience, experience]
      setCVData({ ...cvData, experience: updatedExperience })
      return
    }

    const updatedExperience = cvData.experience.map((experience) => {
      if (experience.id === experienceData.id) {
        return experienceData
      }
      return experience
    })
    setCVData({ ...cvData, experience: updatedExperience })
  }

  const handleDeleteExperience = (id: string | number) => {
    const filtered = cvData.experience.filter((exp) => exp.id !== id)
    setCVData({ ...cvData, experience: filtered })
  }

  // project control

  const handleAddProject = (
    type: "create" | "update",
    projectData: IProjectItem
  ) => {
    if (type === "create") {
      const project = { ...projectData, id: nanoid() }
      const updatedProjects = [...cvData.projects, project]
      setCVData({ ...cvData, projects: updatedProjects })
      return
    }

    const updatedProjects = cvData.projects.map((project) => {
      if (project.id === projectData.id) {
        return projectData
      }
      return project
    })
    setCVData({ ...cvData, projects: updatedProjects })
  }

  const handleDeleteProject = (project: IProjectItem) => {
    const filtered = cvData.projects.filter((p) => p.id !== project.id)
    setCVData({ ...cvData, projects: filtered })
  }

  //modal controls
  const handleToggleModal = (
    type: string,
    value: IProjectItem | IEducationItem | IExperienceItem | null
  ) => {
    controlModals({ ...modals, [type]: value })
  }

  const handleJoyrideCallback = (data: any) => {
    const { status } = data

    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED]

    if (finishedStatuses.includes(status)) {
      setRun(false)
      handleSetOnboarding(true)
    }
  }

  const downloadJSON = (obj: ICVParams) => {
    const name = obj.fullName
    const dataUri =
      "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj))
    const anchorElement = document.createElement("a")
    anchorElement.href = dataUri
    anchorElement.download = `${name}.json`
    document.body.appendChild(anchorElement)
    anchorElement.click()
    document.body.removeChild(anchorElement)
  }

  const handleExportFile = () => {
    downloadJSON(cvData)
  }

  const filePicker = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0]
    if (!file) {
      return
    }
    const reader = new FileReader()
    reader.readAsText(file)
    reader.onload = function () {
      const data: ICVParams = JSON.parse(reader.result as string)
      setCVData(data)
    }
  }

  const handlePick = () => {
    filePicker?.current?.click()
  }

  return (
    <Wrapper>
      <JoyRideNoSSR
        callback={handleJoyrideCallback}
        steps={onboardingSteps}
        run={run}
        continuous
        disableScrolling
        hideCloseButton
        showProgress
        showSkipButton
        scrollToFirstStep
        tooltipComponent={OnboardingTooltip}
        styles={{
          options: onboardingStyleOptions
        }}
      />
      <AddEducationModal
        education={modals.education}
        isOpened={!!modals.education}
        saveEducation={handleSaveEducation}
        close={() => handleToggleModal("education", null)}
      />
      <AddExperienceModal
        experience={modals.experience}
        isOpened={!!modals.experience}
        saveExperience={handleSaveExperience}
        close={() => handleToggleModal("experience", null)}
      />
      <CreateProjectModal
        file={file}
        project={modals.project}
        isOpened={!!modals.project}
        saveProject={handleAddProject}
        close={() => handleToggleModal("project", null)}
      />
      <CompareTechModal
        cvData={cvData}
        isOpened={!!modals.techComparison}
        close={() => handleToggleModal("techComparison", null)}
      />
      <InfoSection>
        <ImageWithPreview
          label={"Фото"}
          imageSrc={cvData.photo}
          saveImage={(photo) => updateCVData("photo", photo)}
        />
        <InfoInputs className="info">
          <Input
            label="ФИО"
            placeholder="Иванов Иван Иванович"
            inputValue={cvData.fullName}
            saveInputValue={(fullName) => updateCVData("fullName", fullName)}
          />
          <TextArea
            label="Биография"
            inputValue={cvData.shortBio}
            saveInputValue={(shortBio) => updateCVData("shortBio", shortBio)}
          />
        </InfoInputs>
        <Buttons className="content">
          <Button
            text={"+ Образование"}
            handleClick={() =>
              handleToggleModal("education", {} as IEducationItem)
            }
          />
          <Button
            text={"+ Опыт работы"}
            handleClick={() =>
              handleToggleModal("experience", {} as IExperienceItem)
            }
          />
          <Button
            text="+ Проект"
            handleClick={() => handleToggleModal("project", {} as IProjectItem)}
          />
        </Buttons>
        <Buttons className="downloads">
          <Button
            text="Сравнить технологии"
            handleClick={() =>
              handleToggleModal("techComparison", {} as IEducationItem)
            }
          />
          <Button
            text="Создать резюме docx"
            handleClick={saveDocument}
            // disabled
          />
          <Button
            text="Создать резюме pdf"
            handleClick={saveDocument}
            disabled
          />
        </Buttons>
        <Buttons className="downloads">
          <Button text={"Выгрузить файл"} handleClick={handleExportFile} />
          <FileInputs>
            <input
              type="file"
              onChange={handleChange}
              accept=".json"
              ref={filePicker}
            />
          </FileInputs>
          <Button text={"Загрузить файл"} handleClick={handlePick} />
        </Buttons>
      </InfoSection>
      <TechSection
        technologies={cvData.technologies}
        techList={file}
        handleRemoveTech={handleRemoveTech}
        updateTechArray={updateTechArray}
      />
      <EducationsSection
        educations={cvData.education}
        updateEducation={(education) =>
          handleToggleModal("education", education)
        }
        deleteEducation={handleDeleteEducation}
      />
      <ExperienceSection
        experiences={cvData.experience}
        updateExperience={(experience) =>
          handleToggleModal("experience", experience)
        }
        deleteExperience={handleDeleteExperience}
      />
      <ProjectsSection
        projects={cvData.projects}
        updateProject={(project) => handleToggleModal("project", project)}
        deleteProject={handleDeleteProject}
      />
    </Wrapper>
  )
}
