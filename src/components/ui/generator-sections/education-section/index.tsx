import { FC, useState } from "react"

import { Accordion } from "@/components/common/accordion"
import { Button } from "@/components/common/button"
import { AddEducationModal } from "@/components/common/modal"
import { IEducationItem } from "@/types/cv-data"

import { EducationItem, Wrapper, EducationsList } from "./index.styled"

interface IEducationSection {
  educations: Array<IEducationItem>
  saveEducation: (type: "create" | "update", education: IEducationItem) => void
  deleteEducation: (id: number) => void
}

export const EducationsSection: FC<IEducationSection> = ({
  educations,
  saveEducation,
  deleteEducation
}) => {
  const [education, setEducation] = useState<IEducationItem | null>(null)

  const handleOpenModal = (education: IEducationItem) => setEducation(education)
  const handleCloseModal = () => setEducation(null)

  return (
    <Wrapper className="education">
      <AddEducationModal
        education={education}
        isOpened={!!education}
        saveEducation={saveEducation}
        close={handleCloseModal}
      />
      <Accordion
        title="Образование"
        isActiveDefault
        titleButton={
          <Button
            text={"+ Образование"}
            handleClick={() => handleOpenModal({} as IEducationItem)}
          />
        }
      >
        <EducationsList>
          {educations.map((education: IEducationItem) => (
            <EducationItem
              key={education.id}
              onClick={() => handleOpenModal(education)}
            >
              <p>{education?.university}</p>
              <p>{education?.department}</p>
              <p>{education?.field}</p>
              <p>{education?.startDate}</p>
              <p>{education?.endDate}</p>
              <Button
                buttonType={"danger"}
                text="Удалить"
                handleClick={() => deleteEducation(education.id as number)}
              />
            </EducationItem>
          ))}
        </EducationsList>
      </Accordion>
    </Wrapper>
  )
}
