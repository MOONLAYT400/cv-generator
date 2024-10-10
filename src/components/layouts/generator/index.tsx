"use client"
import { FC, useState } from "react"

// import { Button } from "@/components/common/button"
import { Input } from "@/components/common/input"
import { Select } from "@/components/common/select"
import { TextArea } from "@/components/common/text-area"
import { ImageWithPreview } from "@/components/common/upload-image"
// import { useCVGenerator } from "@/hooks/useCVGenerator"
import { ICVParams, ITechItem } from "@/types/cv-data"
import { IStackData } from "@/types/stack-data"

import {
  InfoInputs,
  InfoSection,
  TechList,
  TechSection,
  Wrapper
} from "./index.styled"
import { Badge } from "@/components/common/badge"

interface IGeneratorLayout {
  file: IStackData
}

export const GeneratorLayout: FC<IGeneratorLayout> = ({ file }) => {
  const [cvData, setSVData] = useState<ICVParams>({
    fullName: "",
    shortBio: "",
    photo: "",
    languages: [],
    fe: [],
    be: [],
    databases: [],
    devops: [],
    test: [],
    additional: []
  })

  console.log(cvData)

  const updateCSVData = (key: string, value: any) => {
    setSVData({ ...cvData, [key]: value })
  }

  const updateTechArray = (type: string, name: string) => {
    const techArray = cvData[type as keyof typeof cvData]

    if (Array.isArray(techArray)) techArray.push({ type, name })

    setSVData({ ...cvData, [type]: techArray })
  }

  const handleRemoveTech = (item: ITechItem) => {
    const techArray = cvData[item.type as keyof typeof cvData]

    if (Array.isArray(techArray)) {
      const filtered = techArray.filter((entry) => entry.name === item.name)
      setSVData({ ...cvData, [item.type]: filtered })
    }
  }

  // const saveDocument = useCVGenerator(cvData)

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
      {/* <Button text="Generate CV" handleClick={saveDocument} /> */}
    </Wrapper>
  )
}
