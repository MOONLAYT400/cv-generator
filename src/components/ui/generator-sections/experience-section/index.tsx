import { FC, useState } from "react"

import { Accordion } from "@/components/common/accordion"
import { Button } from "@/components/common/button"
import { AddExperienceModal } from "@/components/common/modal"
import { IExperienceItem } from "@/types/cv-data"

import { ExperienceItem, Wrapper, ExperienceList } from "./index.styled"

interface IExperienceSection {
  experiences: Array<IExperienceItem>
  saveExperience: (
    type: "create" | "update",
    education: IExperienceItem
  ) => void
  deleteExperience: (id: number) => void
}

export const ExperienceSection: FC<IExperienceSection> = ({
  experiences,
  saveExperience,
  deleteExperience
}) => {
  const [experience, setExperience] = useState<IExperienceItem | null>(null)

  const handleOpenModal = (experience: IExperienceItem) =>
    setExperience(experience)
  const handleCloseModal = () => setExperience(null)

  return (
    <Wrapper className="experience">
      <AddExperienceModal
        experience={experience}
        isOpened={!!experience}
        saveExperience={saveExperience}
        close={handleCloseModal}
      />
      <Accordion
        title="Опыт работы"
        isActiveDefault
        titleButtons={[
          {
            text: "+ Опыт работы",
            click: () => handleOpenModal({} as IExperienceItem)
          }
        ]}
      >
        <ExperienceList>
          {experiences?.map((experience: IExperienceItem) => (
            <ExperienceItem
              key={experience.id}
              onClick={() => handleOpenModal(experience)}
            >
              <p>{experience?.company}</p>
              <p>{experience?.role}</p>
              <div>
                {experience?.duties.map((item) => (
                  <p key={item.id}>{item.text}</p>
                ))}
              </div>
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
