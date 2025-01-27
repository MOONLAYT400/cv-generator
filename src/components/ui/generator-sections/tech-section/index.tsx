import { FC, useEffect, useMemo, useState } from "react"

import { Badge } from "@/components/common/badge"
import { Button } from "@/components/common/button"
import { CloseSystemIcon } from "@/components/common/icons"
import { Input } from "@/components/common/input"
import { CompareTechModal } from "@/components/common/modal"
import { SearchSelect } from "@/components/common/select-with-search"
import { techColors } from "@/constants/styles/colors"
import { ITechItem } from "@/types/cv-data"
import { IStackData } from "@/types/stack-data"

import {
  SearchResults,
  SearchSection,
  Section,
  TechList,
  TechSelects,
  Wrapper
} from "./index.styled"

interface ITechSection {
  cvData: any
  techList: IStackData
  technologies: Array<ITechItem>
  updateTechArray: (name: string, value: ITechItem) => void
  handleRemoveTech: (item: ITechItem) => void
}

export const TechSection: FC<ITechSection> = ({
  cvData,
  techList,
  technologies,
  updateTechArray,
  handleRemoveTech
}) => {
  const flatList = useMemo(() => Object.values(techList).flat(), [techList])
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [searchValue, setSearchValue] = useState<string>("")
  const [isModalOpen, setIsModalOpen] = useState(false)

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

  const handleToggleModal = (value: boolean) => setIsModalOpen(value)

  return (
    <Wrapper className="tech">
      <CompareTechModal
        cvData={cvData}
        isOpened={isModalOpen}
        close={() => handleToggleModal(false)}
      />
      <SearchSection>
        <Section>
          <Input
            actionInput
            withDebounce
            allowClearValue
            inputValue={searchValue}
            icon={<CloseSystemIcon />}
            label={"Найти технологию:"}
            actionHandler={handleClearInput}
            placeholder={"Введите название..."}
            saveInputValue={(value) => setSearchValue(value as string)}
          />
          <Button
            text="Сравнить технологии"
            handleClick={() => handleToggleModal(true)}
          />
        </Section>
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
            withHelp
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
