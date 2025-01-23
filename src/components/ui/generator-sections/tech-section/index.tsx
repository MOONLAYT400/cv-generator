import { FC, useEffect, useMemo, useState } from "react"

import { Badge } from "@/components/common/badge"
import { CloseSystemIcon } from "@/components/common/icons"
import { Input } from "@/components/common/input"
import { SearchSelect } from "@/components/common/select-with-search"
import { techColors } from "@/constants/styles/colors"
import { ITechItem } from "@/types/cv-data"
import { IStackData } from "@/types/stack-data"

import {
  SearchResults,
  SearchSection,
  TechList,
  TechSelects,
  Wrapper
} from "./index.styled"

interface ITechSection {
  techList: IStackData
  technologies: Array<ITechItem>
  updateTechArray: (name: string, value: ITechItem) => void
  handleRemoveTech: (item: ITechItem) => void
}

export const TechSection: FC<ITechSection> = ({
  technologies,
  techList,
  updateTechArray,
  handleRemoveTech
}) => {
  const flatList = useMemo(() => Object.values(techList).flat(), [techList])
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [searchValue, setSearchValue] = useState<string>("")

  useEffect(() => {
    getSearchResult()
  }, [searchValue])

  const getSearchResult = () => {
    if (searchValue) {
      const filtered = flatList.filter((li) =>
        li.value.toLowerCase().includes(searchValue)
      )
      setSearchResults(filtered)
    } else {
      setSearchResults([])
    }
  }

  const handleSelectResult = (item: ITechItem): void =>
    updateTechArray(item.type, item)

  const handleClearInput = () => {
    setSearchResults([])
    setSearchValue("")
  }

  return (
    <Wrapper className="tech">
      <SearchSection>
        <Input
          actionInput
          withDebounce
          allowClearValue
          label="Найти технологию:"
          inputValue={searchValue}
          icon={<CloseSystemIcon />}
          placeholder="Введите название..."
          actionHandler={handleClearInput}
          saveInputValue={(value) => setSearchValue(value as string)}
        />
        {searchResults?.length ? (
          <SearchResults>
            {searchResults.map((res, index) => (
              <Badge
                item={res}
                key={"res_" + index}
                clickHandler={() => handleSelectResult(res)}
                color={techColors[res.type as keyof typeof techColors]}
              />
            ))}
          </SearchResults>
        ) : null}
      </SearchSection>
      <TechSelects>
        <SearchSelect
          label={"Языки"}
          outputField={"object"}
          options={techList.languages}
          saveInputValue={(value) => updateTechArray("languages", value)}
        />
        <SearchSelect
          label="Фронтенд"
          options={techList.fe}
          outputField={"object"}
          saveInputValue={(value) => updateTechArray("fe", value)}
        />
        <SearchSelect
          label="Бекенд"
          options={techList.be}
          outputField={"object"}
          saveInputValue={(value) => updateTechArray("be", value)}
        />
        <SearchSelect
          label="Базы данных"
          outputField={"object"}
          options={techList.databases}
          saveInputValue={(value) => updateTechArray("databases", value)}
        />
        <SearchSelect
          label="Девопс"
          outputField={"object"}
          options={techList.devops}
          saveInputValue={(value) => updateTechArray("devops", value)}
        />
        <SearchSelect
          label="Тесты"
          outputField={"object"}
          options={techList.test}
          saveInputValue={(value) => updateTechArray("test", value)}
        />
        <SearchSelect
          label="Дополнительно"
          outputField={"object"}
          options={techList.additional}
          saveInputValue={(value) => updateTechArray("additional", value)}
        />
      </TechSelects>
      <TechList>
        {technologies.map((tech, index) => (
          <Badge
            item={tech}
            key={"tech_" + index}
            color={techColors[tech.type as keyof typeof techColors]}
            deleteHandler={handleRemoveTech}
          />
        ))}
      </TechList>
    </Wrapper>
  )
}
