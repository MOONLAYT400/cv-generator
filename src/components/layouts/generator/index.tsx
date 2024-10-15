"use client"
import { FC, useState } from "react"

import { Button } from "@/components/common/button"
import { Input } from "@/components/common/input"
import {
  AddEducationModal,
  AddExperienceModal,
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
  IProject,
  ITechItem
} from "@/types/cv-data"
import { IStackData } from "@/types/stack-data"

import { Buttons, InfoInputs, InfoSection, Wrapper } from "./index.styled"

interface IGeneratorLayout {
  file: IStackData
}

export const GeneratorLayout: FC<IGeneratorLayout> = ({ file }) => {
  const [cvData, setSVData] = useState<ICVParams>({
    fullName: "",
    shortBio: "",
    photo: "",
    education: [],
    experience: [],
    languages: [],
    fe: [],
    be: [],
    databases: [],
    devops: [],
    test: [],
    additional: [],
    projects: []
  })

  const saveDocument = useCVGenerator(cvData)

  const [modals, controlModals] = useState({
    project: false,
    education: false,
    experience: false
  })

  console.log(cvData)

  const updateCVData = (key: string, value: any) => {
    setSVData({ ...cvData, [key]: value })
  }

  const updateTechArray = (type: string, name: string) => {
    const techArray = cvData[type as keyof typeof cvData]

    if (Array.isArray(techArray)) {
      //@ts-expect-error - types included
      const existing = techArray.find((item) => item.name === name)

      if (!existing) {
        //@ts-expect-error - types included
        techArray.push({ type, name })
        setSVData({ ...cvData, [type]: techArray })
      }
    }
  }

  const handleRemoveTech = (item: ITechItem) => {
    const techArray = cvData[item.type as keyof typeof cvData]

    if (Array.isArray(techArray)) {
      //@ts-expect-error - types included
      const filtered = techArray.filter((entry) => entry.name !== item.name)
      setSVData({ ...cvData, [item.type]: filtered })
    }
  }

  const handleSaveEducation = (educationData: IEducationItem) => {
    const education = { ...educationData, id: cvData.education.length + 1 }

    const updatedEducation = [...cvData.education, education]

    setSVData({ ...cvData, education: updatedEducation })
  }

  const handleDeleteEducation = (id: number) => {
    const filtered = cvData.education.filter((ed) => ed.id !== id)
    setSVData({ ...cvData, education: filtered })
  }

  const handleSaveExperience = (experienceData: IExperienceItem) => {
    const experience = { ...experienceData, id: cvData.experience.length + 1 }

    const updatedExperience = [...cvData.experience, experience]

    setSVData({ ...cvData, experience: updatedExperience })
  }

  const handleDeleteExperience = (id: number) => {
    const filtered = cvData.experience.filter((exp) => exp.id !== id)
    setSVData({ ...cvData, experience: filtered })
  }

  const handleToggleModal = (type: string, value: boolean) => {
    controlModals({ ...modals, [type]: value })
  }

  const handleAddProject = (project: IProject) => {
    const updatedProjects = [...cvData.projects, project]
    setSVData({ ...cvData, projects: updatedProjects })
  }

  const handleDeleteProject = (project: IProject) => {
    const filtered = cvData.projects.filter((p) => p.name !== project.name)
    setSVData({ ...cvData, projects: filtered })
  }

  return (
    <Wrapper>
      <CreateProjectModal
        file={file}
        isOpened={modals.project}
        saveProject={handleAddProject}
        close={() => handleToggleModal("project", false)}
      />
      <AddExperienceModal
        isOpened={modals.experience}
        saveExperience={handleSaveExperience}
        close={() => handleToggleModal("experience", false)}
      />
      <AddEducationModal
        isOpened={modals.education}
        saveEducation={handleSaveEducation}
        close={() => handleToggleModal("education", false)}
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
            handleClick={() => handleToggleModal("education", true)}
          />
          <Button
            text={"+ Опыт работы"}
            handleClick={() => handleToggleModal("experience", true)}
          />
          <Button
            text="+Проэкт"
            handleClick={() => handleToggleModal("project", true)}
          />
        </Buttons>
        <Buttons>
          <Button text="Создать резюме docx" handleClick={saveDocument} />
          <Button text="Создать резюме pdf" handleClick={saveDocument} />
        </Buttons>
      </InfoSection>
      <TechSection
        cvData={cvData}
        techList={file}
        handleRemoveTech={handleRemoveTech}
        updateTechArray={updateTechArray}
      />
      <EducationsSection
        educations={cvData.education}
        deleteEducation={handleDeleteEducation}
      />
      <ExperienceSection
        experiences={cvData.experience}
        deleteExperience={handleDeleteExperience}
      />
      <ProjectsSection
        projects={cvData.projects}
        deleteProject={handleDeleteProject}
      />
    </Wrapper>
  )
}
