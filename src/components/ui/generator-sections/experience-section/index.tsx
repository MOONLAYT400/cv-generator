import { FC } from "react"

import { Accordion } from "@/components/common/accordion"
import { Button } from "@/components/common/button"
import { IExperienceItem } from "@/types/cv-data"

import { ExperienceItem, Wrapper, ExperienceList } from "./index.styled"

interface IExperienceSection {
  experiences: Array<IExperienceItem>
  deleteExperience: (id: number) => void
}

export const ExperienceSection: FC<IExperienceSection> = ({
  experiences,
  deleteExperience
}) => {
  return (
    <Wrapper>
      <Accordion title="Опыт работы">
        <ExperienceList>
          {experiences?.map((experience: IExperienceItem) => (
            <ExperienceItem key={experience.id}>
              <p>{experience?.company}</p>
              <p>{experience?.role}</p>
              <p>{experience?.duties}</p>
              <p>{experience?.startDate}</p>
              <p>{experience?.endDate}</p>
              <Button
                text="Удалить"
                handleClick={() => deleteExperience(experience.id as number)}
              />
            </ExperienceItem>
          ))}
        </ExperienceList>
      </Accordion>
    </Wrapper>
  )
}
