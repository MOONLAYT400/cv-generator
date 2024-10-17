"use client"
import { FC, useState } from "react"

import { Button } from "@/components/common/button"
import { Input } from "@/components/common/input"
import {
  AddEducationModal,
  AddExperienceModal,
  CompareTechModal,
  CreateProjectModal
} from "@/components/common/modal"
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

  return (
    <Wrapper>
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
        <InfoInputs>
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
        <Buttons>
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
        <Buttons>
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
