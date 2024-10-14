"use client"
import { FC, useState } from "react"

import { Badge } from "@/components/common/badge"
import { Button } from "@/components/common/button"
import { Input } from "@/components/common/input"
import {
  AddEducationModal,
  AddExperienceModal,
  CreateProjectModal
} from "@/components/common/modal"
import { Select } from "@/components/common/select"
import { TextArea } from "@/components/common/text-area"
import { ImageWithPreview } from "@/components/common/upload-image"
import { techColors } from "@/constants/styles/colors"
import { useCVGenerator } from "@/hooks/useCVGenerator"
import {
  ICVParams,
  IEducationItem,
  IExperienceItem,
  IProject,
  ITechItem
} from "@/types/cv-data"
import { IStackData } from "@/types/stack-data"

import {
  Buttons,
  EducationItem,
  EducationSection,
  EducationsListWrapper,
  ExperienceItem,
  ExperienceListWrapper,
  ExperienceSection,
  InfoInputs,
  InfoSection,
  ProjectsWrapper,
  TechList,
  TechSection,
  Wrapper
} from "./index.styled"

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

  const [modals, controlModals] = useState({
    project: false,
    education: false,
    experience: false
  })

  console.log(cvData)

  const updateCSVData = (key: string, value: any) => {
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

  const saveDocument = useCVGenerator(cvData)

  const handleToggleModal = (type: string, value: boolean) => {
    controlModals({ ...modals, [type]: value })
  }

  const handleAddProject = (project: IProject) => {
    const updatedProjects = [...cvData.projects, project]
    setSVData({ ...cvData, projects: updatedProjects })
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
          saveImage={(photo) => updateCSVData("photo", photo)}
        />
        <InfoInputs>
          <Input
            label="ФИО"
            placeholder="Иванов Иван Иванович"
            inputValue={cvData.fullName}
            saveInputValue={(fullName) => updateCSVData("fullName", fullName)}
          />
          <TextArea
            label="Биография"
            inputValue={cvData.shortBio}
            saveInputValue={(shortBio) => updateCSVData("shortBio", shortBio)}
          />
        </InfoInputs>
        <Buttons>
          <Button
            text="+Проэкт"
            handleClick={() => handleToggleModal("project", true)}
          />
          <Button
            text={"+ Образование"}
            handleClick={() => handleToggleModal("education", true)}
          />
          <Button
            text={"+ Опыт работы"}
            handleClick={() => handleToggleModal("experience", true)}
          />
        </Buttons>
        <Buttons>
          <Button text="Создать резюме docx" handleClick={saveDocument} />
          <Button text="Создать резюме pdf" handleClick={saveDocument} />
        </Buttons>
      </InfoSection>
      <EducationSection>
        {cvData?.education?.length ? (
          <EducationsListWrapper>
            {cvData.education.map((education: IEducationItem) => (
              <EducationItem key={education.id}>
                <p>{education?.university}</p>
                <p>{education?.department}</p>
                <p>{education?.field}</p>
                <p>{education?.startDate}</p>
                <p>{education?.endDate}</p>
                <Button
                  text="Удалить"
                  handleClick={() =>
                    handleDeleteEducation(education.id as number)
                  }
                />
              </EducationItem>
            ))}
          </EducationsListWrapper>
        ) : null}
      </EducationSection>
      <ExperienceSection>
        {cvData?.experience?.length ? (
          <ExperienceListWrapper>
            {cvData.experience.map((experience: IExperienceItem) => (
              <ExperienceItem key={experience.id}>
                <p>{experience?.company}</p>
                <p>{experience?.role}</p>
                <p>{experience?.duties}</p>
                <p>{experience?.startDate}</p>
                <p>{experience?.endDate}</p>
                <Button
                  text="Удалить"
                  handleClick={() =>
                    handleDeleteExperience(experience.id as number)
                  }
                />
              </ExperienceItem>
            ))}
          </ExperienceListWrapper>
        ) : null}
      </ExperienceSection>
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
        {cvData.languages.map((language, index) => (
          <Badge
            item={language}
            key={"languge_" + index}
            color={techColors.languages}
            removeWrapper={handleRemoveTech}
          />
        ))}
        {cvData.fe.map((fe, index) => (
          <Badge
            item={fe}
            key={"fe_" + index}
            color={techColors.fe}
            removeWrapper={handleRemoveTech}
          />
        ))}
        {cvData.be.map((be, index) => (
          <Badge
            item={be}
            key={"be_" + index}
            color={techColors.be}
            removeWrapper={handleRemoveTech}
          />
        ))}
        {cvData.databases.map((database, index) => (
          <Badge
            item={database}
            key={"databases_" + index}
            color={techColors.databases}
            removeWrapper={handleRemoveTech}
          />
        ))}
        {cvData.devops.map((devops, index) => (
          <Badge
            item={devops}
            key={"devops_" + index}
            color={techColors.devops}
            removeWrapper={handleRemoveTech}
          />
        ))}
        {cvData.test.map((test, index) => (
          <Badge
            item={test}
            key={"test_" + index}
            color={techColors.test}
            removeWrapper={handleRemoveTech}
          />
        ))}
        {cvData.additional.map((additional, index) => (
          <Badge
            item={additional}
            key={"additiona l_" + index}
            color={techColors.additional}
            removeWrapper={handleRemoveTech}
          />
        ))}
      </TechList>
    </Wrapper>
  )
}
