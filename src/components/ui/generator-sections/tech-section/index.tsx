import { FC, useEffect, useMemo, useState } from "react"

import { Accordion } from "@/components/common/accordion"
import { Badge } from "@/components/common/badge"
import { Button } from "@/components/common/button"
import { CloseSystemIcon } from "@/components/common/icons"
import { Input } from "@/components/common/input"
import { CompareTechModal, CreateStackModal } from "@/components/common/modal"
import { techColors } from "@/constants/styles/colors"
import { ITechItem } from "@/types/cv-data"
import { IStackData } from "@/types/stack-data"

import {
  SearchResults,
  SearchSection,
  Section,
  TechList,
  Wrapper
} from "./index.styled"

interface ITechSection {
  cvData: any
  techStack: IStackData
  handleRemoveTech: (item: ITechItem) => void
  bulkUpdateTechArray: (techData: IStackData) => void
  updateTechArray: (name: string, value: ITechItem) => void
}

export const TechSection: FC<ITechSection> = ({
  cvData,
  techStack,
  updateTechArray,
  handleRemoveTech,
  bulkUpdateTechArray
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

  const handleSelectResult = (item: ITechItem): void => {
    const updated = techList[item.type as keyof typeof techList].map((tech) => {
      if (tech.value === item.value) return { ...tech, checked: true }
      return tech
    })
    setTechList({ ...techList, [item.type]: updated })
    updateTechArray(item.type, item)
  }

  const handleDeleteItem = (item: ITechItem) => {
    const updated = techList[item.type as keyof typeof techList].map((tech) => {
      if (tech.value === item.value) return { ...tech, checked: false }
      return tech
    })
    setTechList({ ...techList, [item.type]: updated })
    handleRemoveTech(item)
  }

  const handleClearInput = () => {
    setSearchResults([])
    setSearchValue("")
  }

  const updateTechList = (techData: IStackData) => {
    setTechList(techData)
    bulkUpdateTechArray(techData)
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
        updateTechList={updateTechList}
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
          {cvData.technologies.map((tech: ITechItem, index: number) => (
            <Badge
              withHelp
              item={tech}
              key={"tech_" + index}
              color={techColors[tech.type as keyof typeof techColors]}
              deleteHandler={handleDeleteItem}
            />
          ))}
        </TechList>
      </Accordion>
    </Wrapper>
  )
}
