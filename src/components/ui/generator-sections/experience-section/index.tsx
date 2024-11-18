import { FC } from "react"

import { Accordion } from "@/components/common/accordion"
import { Button } from "@/components/common/button"
import { IExperienceItem } from "@/types/cv-data"

import { ExperienceItem, Wrapper, ExperienceList } from "./index.styled"

interface IExperienceSection {
  experiences: Array<IExperienceItem>
  updateExperience: (education: IExperienceItem) => void
  deleteExperience: (id: number) => void
}

export const ExperienceSection: FC<IExperienceSection> = ({
  experiences,
  updateExperience,
  deleteExperience
}) => {
  return (
    <Wrapper className="experience">
      <Accordion title="Опыт работы" isActiveDefault>
        <ExperienceList>
          {experiences?.map((experience: IExperienceItem) => (
            <ExperienceItem
              key={experience.id}
              onClick={() => updateExperience(experience)}
            >
              <p>{experience?.company}</p>
              <p>{experience?.role}</p>
              <div>{experience?.duties.map((item)=><p key={item.id}>{item.text}</p>)}</div>
              <p>{experience?.startDate}</p>
              <p>{experience?.endDate}</p>
              <Button
                buttonType="danger"
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
