import { FC } from "react"

import { Badge } from "@/components/common/badge"
import { Select } from "@/components/common/select"
import { techColors } from "@/constants/styles/colors"
import { ITechItem } from "@/types/cv-data"
import { IStackData } from "@/types/stack-data"

import { TechList, TechSelects, Wrapper } from "./index.styled"

interface ITechSection {
  techList: IStackData
  technologies: Array<ITechItem>
  updateTechArray: (name: string, value: string) => void
  handleRemoveTech: (item: ITechItem) => void
}

export const TechSection: FC<ITechSection> = ({
  technologies,
  techList,
  updateTechArray,
  handleRemoveTech
}) => {
  return (
    <Wrapper className="tech">
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
        {technologies.map((language, index) => (
          <Badge
            item={language}
            key={"languge_" + index}
            color={techColors[language.type as keyof typeof techColors]}
            deleteHandler={handleRemoveTech}
          />
        ))}
      </TechList>
    </Wrapper>
  )
}
