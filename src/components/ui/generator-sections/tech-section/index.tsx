import { FC, useEffect, useMemo, useState } from "react"

import { Accordion } from "@/components/common/accordion"
import { Badge } from "@/components/common/badge"
import { Button } from "@/components/common/button"
import { CloseSystemIcon } from "@/components/common/icons"
import { Input } from "@/components/common/input"
import { CompareTechModal, CreateStackModal } from "@/components/common/modal"
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
  techStack: IStackData
  technologies: Array<ITechItem>
  updateTechArray: (name: string, value: ITechItem) => void
  handleRemoveTech: (item: ITechItem) => void
}

export const TechSection: FC<ITechSection> = ({
  cvData,
  techStack,
  technologies,
  updateTechArray,
  handleRemoveTech
}) => {
  const flatList = useMemo(() => Object.values(techStack).flat(), [techStack])
  const [techList, setTechList] = useState<IStackData>(techStack)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [searchValue, setSearchValue] = useState<string>("")
  const [isModalOpen, setIsModalOpen] = useState({
    compare: false,
    add: false
  })

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

  const handleToggleModal = (name: string, value: boolean) =>
    setIsModalOpen({ ...isModalOpen, [name]: value })

  return (
    <Wrapper className="tech">
      <CompareTechModal
        cvData={cvData}
        isOpened={isModalOpen.compare}
        close={() => handleToggleModal("compare", false)}
      />
      <CreateStackModal
        techStack={techList}
        isOpened={isModalOpen.add}
        close={() => handleToggleModal("add", false)}
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
            text="Добавить технологии"
            handleClick={() => handleToggleModal("add", true)}
          />
          <Button
            text="Сравнить технологии"
            handleClick={() => handleToggleModal("compare", true)}
          />{" "}
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
      <Accordion
        title="Технологии"
        isActiveDefault
        titleButtons={[
          {
            text: "Добавить технологии",
            click: () => handleToggleModal("add", true)
          },
          {
            text: "Сравнить технологии",
            click: () => handleToggleModal("compare", true)
          }
        ]}
      >
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
      </Accordion>
    </Wrapper>
  )
}
