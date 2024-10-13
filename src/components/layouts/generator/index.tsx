"use client"
import { FC, useState } from "react"

import { Badge } from "@/components/common/badge"
import { Button } from "@/components/common/button"
import { Input } from "@/components/common/input"
import { Select } from "@/components/common/select"
import { TextArea } from "@/components/common/text-area"
import { ImageWithPreview } from "@/components/common/upload-image"
import { useCVGenerator } from "@/hooks/useCVGenerator"
import {
  ICVParams,
  IEducationItem,
  IExperienceItem,
  ITechItem
} from "@/types/cv-data"
import { IStackData } from "@/types/stack-data"

import {
  CreateEducationWrapper,
  CreateExperienceWrapper,
  EducationItem,
  EducationSection,
  EducationsListWrapper,
  ExperienceItem,
  ExperienceListWrapper,
  ExperienceSection,
  InfoInputs,
  InfoSection,
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
    additional: []
  })
  const [showAddEducation, setShowAddEducation] = useState<boolean>(false)
  const [educationData, setEducationData] = useState({
    university: "",
    department: "",
    field: "",
    startDate: "",
    endDate: ""
  })

  const [showAddExperience, setShowAddExperience] = useState<boolean>(false)
  const [experienceData, setExperienceData] = useState({
    company: "",
    role: "",
    duties: "",
    startDate: "",
    endDate: ""
  })

  console.log(cvData)

  const updateCSVData = (key: string, value: any) => {
    setSVData({ ...cvData, [key]: value })
  }

  const updateTechArray = (type: string, name: string) => {
    const techArray = cvData[type as keyof typeof cvData]

    if (Array.isArray(techArray)) {
      const existing = techArray.find((item) => item.name === name)

      if (!existing) {
        techArray.push({ type, name })
        setSVData({ ...cvData, [type]: techArray })
      }
    }
  }

  const handleRemoveTech = (item: ITechItem) => {
    const techArray = cvData[item.type as keyof typeof cvData]

    if (Array.isArray(techArray)) {
      const filtered = techArray.filter((entry) => entry.name !== item.name)
      setSVData({ ...cvData, [item.type]: filtered })
    }
  }

  const handleAddEducation = () => {
    if (showAddEducation) {
      setEducationData({
        university: "",
        department: "",
        field: "",
        startDate: "",
        endDate: ""
      })
    }
    setShowAddEducation(!showAddEducation)
  }

  const handleSetEducationData = (key: string, value: any) => {
    setEducationData({ ...educationData, [key]: value })
  }

  const handleSaveEducation = () => {
    const education = { ...educationData, id: cvData.education.length + 1 }

    const updatedEducation = [...cvData.education, education]

    setSVData({ ...cvData, education: updatedEducation })
  }

  const handleDeleteEducation = (id: number) => {
    const filtered = cvData.education.filter((ed) => ed.id !== id)
    setSVData({ ...cvData, education: filtered })
  }

  const handleAddExperience = () => {
    if (showAddExperience) {
      setExperienceData({
        company: "",
        role: "",
        duties: "",
        startDate: "",
        endDate: ""
      })
    }
    setShowAddExperience(!showAddExperience)
  }

  const handleSetExperienceData = (key: string, value: any) => {
    setExperienceData({ ...experienceData, [key]: value })
  }

  const handleSaveExperience = () => {
    const experience = { ...experienceData, id: cvData.experience.length + 1 }

    const updatedExperience = [...cvData.experience, experience]

    setSVData({ ...cvData, experience: updatedExperience })
  }

  const handleDeleteExperience = (id: number) => {
    const filtered = cvData.experience.filter((exp) => exp.id !== id)
    setSVData({ ...cvData, experience: filtered })
  }

  const saveDocument = useCVGenerator(cvData)

  return (
    <Wrapper>
      <InfoSection>
        <ImageWithPreview
          label={"Photo"}
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
            label="Short bio"
            inputValue={cvData.shortBio}
            saveInputValue={(shortBio) => updateCSVData("shortBio", shortBio)}
          />
        </InfoInputs>
      </InfoSection>
      <EducationSection>
        <Button
          text={showAddEducation ? "Закрыть" : "+ Образование"}
          handleClick={handleAddEducation}
        />
        {showAddEducation ? (
          <CreateEducationWrapper>
            <Input
              label="Учебное заведение"
              inputValue={educationData.university}
              placeholder="Введите название заведения..."
              saveInputValue={(university) =>
                handleSetEducationData("university", university)
              }
            />
            <Input
              label="Кафедра"
              inputValue={educationData.department}
              placeholder="Введите название кафедры..."
              saveInputValue={(department) =>
                handleSetEducationData("department", department)
              }
            />
            <Input
              label="Направление"
              inputValue={educationData.field}
              placeholder="Введите направление..."
              saveInputValue={(field) => handleSetEducationData("field", field)}
            />
            <Input
              label="Начало учебы"
              inputValue={educationData.startDate}
              placeholder="Дата начала учебы..."
              saveInputValue={(startDate) =>
                handleSetEducationData("startDate", startDate)
              }
            />
            <Input
              label="Окончание учебы"
              inputValue={educationData.endDate}
              placeholder="Дата окончания учебы..."
              saveInputValue={(endDate) =>
                handleSetEducationData("endDate", endDate)
              }
            />
            <Button text="Сохранить" handleClick={handleSaveEducation} />
          </CreateEducationWrapper>
        ) : null}
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
        <Button
          text={showAddExperience ? "Закрыть" : "+ Опыт работы"}
          handleClick={handleAddExperience}
        />
        {showAddExperience ? (
          <CreateExperienceWrapper>
            <Input
              label="Учебное заведение"
              inputValue={experienceData.company}
              placeholder="Введите название заведения..."
              saveInputValue={(company) =>
                handleSetExperienceData("company", company)
              }
            />
            <Input
              label="Кафедра"
              inputValue={experienceData.role}
              placeholder="Введите название кафедры..."
              saveInputValue={(role) => handleSetExperienceData("role", role)}
            />
            <Input
              label="Направление"
              inputValue={experienceData.duties}
              placeholder="Введите направление..."
              saveInputValue={(duties) =>
                handleSetExperienceData("duties", duties)
              }
            />
            <Input
              label="Начало учебы"
              inputValue={experienceData.startDate}
              placeholder="Дата начала учебы..."
              saveInputValue={(startDate) =>
                handleSetExperienceData("startDate", startDate)
              }
            />
            <Input
              label="Окончание учебы"
              inputValue={experienceData.endDate}
              placeholder="Дата окончания учебы..."
              saveInputValue={(endDate) =>
                handleSetExperienceData("endDate", endDate)
              }
            />
            <Button text="Сохранить" handleClick={handleSaveExperience} />
          </CreateExperienceWrapper>
        ) : null}
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
            key={"languge_" + index}
            item={language}
            removeWrapper={handleRemoveTech}
          />
        ))}
        {cvData.fe.map((fe, index) => (
          <Badge
            key={"fe_" + index}
            item={fe}
            removeWrapper={handleRemoveTech}
          />
        ))}
        {cvData.be.map((be, index) => (
          <Badge
            key={"be_" + index}
            item={be}
            removeWrapper={handleRemoveTech}
          />
        ))}
        {cvData.databases.map((database, index) => (
          <Badge
            key={"databases_" + index}
            item={database}
            removeWrapper={handleRemoveTech}
          />
        ))}
        {cvData.devops.map((devops, index) => (
          <Badge
            key={"devops_" + index}
            item={devops}
            removeWrapper={handleRemoveTech}
          />
        ))}
        {cvData.test.map((test, index) => (
          <Badge
            key={"test_" + index}
            item={test}
            removeWrapper={handleRemoveTech}
          />
        ))}
        {cvData.additional.map((additional, index) => (
          <Badge
            key={"additional_" + index}
            item={additional}
            removeWrapper={handleRemoveTech}
          />
        ))}
      </TechList>
      <Button text="Generate CV" handleClick={saveDocument} />
    </Wrapper>
  )
}
