import { FC, useState } from "react"

import { Badge } from "@/components/common/badge"
import { SearchSelect } from "@/components/common/select-with-search"
import { techColors } from "@/constants/styles/colors"
import { ITechItem } from "@/types/cv-data"
import { IStackData } from "@/types/stack-data"

import { SearchSection, TechList, TechSelects, Wrapper } from "./index.styled"

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
    const [searchValue, setSearchValue] = useState<string>("")
  return (
    <Wrapper className="tech">
      <SearchSection>
        Search section
        <input type="text" value={searchValue} onChange={event => setSearchValue(event.target.value)}/>
      </SearchSection>
      <TechSelects>
        <SearchSelect
          label="Языки"
          options={techList.languages}
          saveInputValue={(value) => updateTechArray("languages", value)}
        />
        <SearchSelect
          label="Фронтенд"
          options={techList.fe}
          saveInputValue={(value) => updateTechArray("fe", value)}
        />
        <SearchSelect
          label="Бекенд"
          options={techList.be}
          saveInputValue={(value) => updateTechArray("be", value)}
        />
        <SearchSelect
          label="Базы данных"
          options={techList.databases}
          saveInputValue={(value) => updateTechArray("databases", value)}
        />
        <SearchSelect
          label="Девопс"
          options={techList.devops}
          saveInputValue={(value) => updateTechArray("devops", value)}
        />
        <SearchSelect
          label="Тесты"
          options={techList.test}
          saveInputValue={(value) => updateTechArray("test", value)}
        />
        <SearchSelect
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
