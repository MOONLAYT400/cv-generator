import { FC } from "react"

import { Badge } from "@/components/common/badge"
import { Select } from "@/components/common/select"
import { techColors } from "@/constants/styles/colors"
import { ICVParams, ITechItem } from "@/types/cv-data"
import { IStackData } from "@/types/stack-data"

import { TechList, TechSelects, Wrapper } from "./index.styled"

interface ITechSection {
  techList: IStackData
  cvData: ICVParams
  updateTechArray: (name: string, value: string) => void
  handleRemoveTech: (item: ITechItem) => void
}

export const TechSection: FC<ITechSection> = ({
  cvData,
  techList,
  updateTechArray,
  handleRemoveTech
}) => {
  return (
    <Wrapper>
      <TechSelects>
        <Select
          label="Языки"
          options={techList.languages}
          saveInputValue={(value) => updateTechArray("languages", value)}
        />
        <Select
          label="Фронтенд"
          options={techList.fe}
          saveInputValue={(value) => updateTechArray("fe", value)}
        />
        <Select
          label="Бекенд"
          options={techList.be}
          saveInputValue={(value) => updateTechArray("be", value)}
        />
        <Select
          label="Базы данных"
          options={techList.databases}
          saveInputValue={(value) => updateTechArray("databases", value)}
        />
        <Select
          label="Девопс"
          options={techList.devops}
          saveInputValue={(value) => updateTechArray("devops", value)}
        />
        <Select
          label="Тесты"
          options={techList.test}
          saveInputValue={(value) => updateTechArray("test", value)}
        />
        <Select
          label="Дополнительно"
          options={techList.additional}
          saveInputValue={(value) => updateTechArray("additional", value)}
        />
      </TechSelects>
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
