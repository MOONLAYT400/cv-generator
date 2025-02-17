import { FC, useState } from "react"

import { Button } from "@/components/common/button"
import { Checkbox } from "@/components/common/checkbox"
import { techStackTitles } from "@/constants/generator/names"
import { IStackData } from "@/types/stack-data"

import {
  Buttons,
  SliderWrapper,
  SlideWrapper,
  Tab,
  TabsWrapper,
  TechItem,
  TechWrapper,
  Title,
  Wrapper
} from "./index.styled"

interface ICreateStack {
  techStack: IStackData
  close: () => void
  updateTechList: (techData: IStackData) => void
}

export const CreateStack: FC<ICreateStack> = ({
  techStack,
  close,
  updateTechList
}) => {
  const [activeTab, setActiveTab] = useState("languages")
  const [techList, setTechList] = useState(techStack)

  const updateTechStack = (type: string, value: string) => {
    const updated = techList[type as keyof typeof techList].map((item) => {
      if (item.value === value) {
        return { ...item, checked: !item.checked }
      }
      return item
    })
    setTechList({ ...techList, [type]: updated })
  }

  const handleSaveTech = () => {
    updateTechList(techList)
    close()
  }

  return (
    <Wrapper>
      <Title>Создать стек</Title>
      <TabsWrapper>
        {Object.keys(techList).map((key) => (
          <Tab
            key={key}
            $active={activeTab === key}
            onClick={() => setActiveTab(key)}
          >
            {techStackTitles[key as keyof typeof techStackTitles]}
          </Tab>
        ))}
      </TabsWrapper>
      <SliderWrapper>
        {Object.keys(techList).map((key) => (
          <SlideWrapper key={key} $activeTab={activeTab === key}>
            <TechWrapper>
              {techList[key as keyof typeof techList].map((item) => (
                <TechItem key={item.value}>
                  <Checkbox
                    text={item.value}
                    check={() => updateTechStack(item.type, item.value)}
                    isChecked={item.checked}
                  />
                </TechItem>
              ))}
            </TechWrapper>
          </SlideWrapper>
        ))}
      </SliderWrapper>
      <Buttons>
        <Button text={"Сохранить"} handleClick={handleSaveTech} />
        <Button text={"Закрыть"} buttonType={"danger"} handleClick={close} />
      </Buttons>
    </Wrapper>
  )
}
