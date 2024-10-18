"use client"
import dynamic from "next/dynamic"
import { FC, useLayoutEffect, useState } from "react"
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
import { useCVGenerator } from "@/hooks/useCVGenerator"
import {
  ICVParams,
  IEducationItem,
  IExperienceItem,
  IProjectItem,
  ITechItem
} from "@/types/cv-data"
import { IStackData } from "@/types/stack-data"

import { Buttons, InfoInputs, InfoSection, Wrapper } from "./index.styled"

const JoyRideNoSSR = dynamic(() => import("react-joyride"), { ssr: false })

interface IGeneratorLayout {
  file: IStackData
}

export const GeneratorLayout: FC<IGeneratorLayout> = ({ file }) => {
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
  // TODO Implement onboarding with layout effect

  const [modals, controlModals] = useState({
    project: null,
    education: null,
    experience: null,
    techComparison: null
  })
  const [run, setRun] = useState(false)

  useLayoutEffect(() => {
    setRun(true)
  }, [])

  const updateCVData = (key: string, value: any) => {
    setCVData({ ...cvData, [key]: value })
  }

  //tech control

  const updateTechArray = (type: string, name: string) => {
    const existing = cvData.technologies.find((item) => item.name === name)

    if (!existing) {
      setCVData({
        ...cvData,
        technologies: [...cvData.technologies, { type, name }]
      })
    }
  }

  const handleRemoveTech = (item: ITechItem) => {
    const filtered = cvData.technologies.filter(
      (entry) => entry.name !== item.name
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
      const education = { ...educationData, id: cvData.education.length + 1 }
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

  const handleDeleteEducation = (id: number) => {
    const filtered = cvData.education.filter((ed) => ed.id !== id)
    setCVData({ ...cvData, education: filtered })
  }

  // experience control

  const handleSaveExperience = (
    type: "create" | "update",
    experienceData: IExperienceItem
  ) => {
    if (type === "create") {
      const experience = { ...experienceData, id: cvData.experience.length + 1 }
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

  const handleDeleteExperience = (id: number) => {
    const filtered = cvData.experience.filter((exp) => exp.id !== id)
    setCVData({ ...cvData, experience: filtered })
  }

  // project control

  const handleAddProject = (
    type: "create" | "update",
    projectData: IProjectItem
  ) => {
    if (type === "create") {
      const project = { ...projectData, id: cvData.projects.length + 1 }
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
      // const params = onboarding
      //   ? { ...JSON.parse(onboarding), app: true }
      //   : { app: true }
      // const onboardingString = params
      // handleSetOnboarding(onboardingString)
    }
  }

  const onboardingSteps = [
    {
      title: "Генератор резюме",
      content: "Добро пожаловать в генератор резюме",
      disableBeacon: true,
      placement: "center" as const,
      target: "body",
      showSkipButton: true
    },
    {
      title: "Основная информация",
      content: "Основная информация о соискателе",
      target: ".info",
      disableBeacon: true,
      floaterProps: {
        disableAnimation: true
      },
      spotlightPadding: 1
    },
    {
      title: "Контент",
      content:
        "Здесь можно добавить информацию о соискателе - образование, данные об опыте работы и проекты, в которых соискатель принимал участие",
      target: ".content",
      disableBeacon: true,
      floaterProps: {
        disableAnimation: true
      },
      spotlightPadding: 1
    },
    {
      title: "Секция загрузки",
      content:
        "Здесь можно сравнить общий стек с автоматически суммированным стеком из проектов, а так же скачать себе готовые файлы резюме в разных форматах",
      target: ".downloads",
      disableBeacon: true,
      floaterProps: {
        disableAnimation: true
      },
      spotlightPadding: 1
    },
    {
      title: "Секция стека",
      content: "Здесь можно добавить технологии в общий стек соискателя.",
      target: ".tech",
      disableBeacon: true,
      floaterProps: {
        disableAnimation: true
      },
      spotlightPadding: 1
    },
    {
      title: "Секция образования",
      content:
        "Здесь будут отображаться этапы образования, добавленные ранее. Так же есть возможность редактировать ранее добавленные этапы",
      target: ".education",
      disableBeacon: true,
      floaterProps: {
        disableAnimation: true
      },
      spotlightPadding: 1
    },
    {
      title: "Секция опыта работы",
      content:
        "Здесь будет отображаться информация об опыте работы. Так же есть возможность редактировать ранее добавленные этапы",
      target: ".experience",
      disableBeacon: true,
      floaterProps: {
        disableAnimation: true
      },
      spotlightPadding: 1
    },
    {
      title: "Секция опыта работы",
      content:
        "Здесь будет отображаться информация о добавленных проектах. Так же есть возможность редактировать ранее добавленные проекты",
      target: ".projects",
      disableBeacon: true,
      floaterProps: {
        disableAnimation: true
      },
      spotlightPadding: 1
    },
    {
      title: "Удачи",
      content: "Спасибо за использование",
      disableBeacon: true,
      placement: "center" as const,
      target: "body",
      showSkipButton: false
    }
  ]

  const onboardingStyleOptions = {
    arrowColor: "#fff",
    backgroundColor: "#fff",
    beaconSize: 36,
    overlayColor: "rgba(0, 0, 0, 0.5)",
    primaryColor: "#7852FB",
    borderRadius: 10,
    spotlightShadow: "0 0 15px rgba(0, 0, 0, 0.5)",
    textColor: "#141414",
    fontFamily: "Inter",
    width: 450,
    zIndex: 10000
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
            text="+Проэкт"
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
            disabled
          />
          <Button
            text="Создать резюме pdf"
            handleClick={saveDocument}
            disabled
          />
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
