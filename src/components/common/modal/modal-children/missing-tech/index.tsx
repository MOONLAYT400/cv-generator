import { FC } from "react"

import { Badge } from "@/components/common/badge"
import { Button } from "@/components/common/button"
import { techColors } from "@/constants/styles/colors"
import { useTechComparison } from "@/hooks/useTechComparison"
import { ICVParams } from "@/types/cv-data"

import { Buttons, Description, TechList, Title, Wrapper } from "./index.styled"

interface ICompareTech {
  cvData: ICVParams
  close: () => void
}

export const CompareTech: FC<ICompareTech> = ({ cvData, close }) => {
  const { missingMainTech } = useTechComparison(cvData)

  return (
    <Wrapper>
      <Title>Сравнение технологий</Title>
      <Description>
        Список технологий, которых не хватает в проектах, по сравнению с общим
        стеком
      </Description>
      <TechList>
        {missingMainTech?.map((tech, index) => (
          <Badge
            item={tech}
            key={"languge_" + index}
            color={techColors[tech.type as keyof typeof techColors]}
          />
        ))}
      </TechList>
      <Buttons>
        <Button text={"Закрыть"} buttonType={"danger"} handleClick={close} />
      </Buttons>{" "}
    </Wrapper>
  )
}
