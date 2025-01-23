import { FC } from "react"

import { techColors } from "@/constants/styles/colors"
import { ITechItem } from "@/types/cv-data"

import {
  Description,
  Secondary,
  Tech,
  TechList,
  Title,
  Wrapper
} from "./index.styled"

interface ITechHelp {
  data: ITechItem
}

export const TechHelp: FC<ITechHelp> = ({ data }) => {
  return (
    <Wrapper>
      <Title>{data.value}</Title>
      <Description>{data.description}</Description>
      {data.alternative?.length ? (
        <>
          <Secondary>Аналогичные технологии:</Secondary>
          <TechList>
            {data.alternative?.map((alt, index) => (
              <Tech
                key={index}
                $color={techColors[data.type as keyof typeof techColors]}
              >
                {alt}
              </Tech>
            ))}
          </TechList>
        </>
      ) : null}
    </Wrapper>
  )
}
