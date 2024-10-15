import { FC } from "react"

import { Accordion } from "@/components/common/accordion"
import { Button } from "@/components/common/button"
import { IEducationItem } from "@/types/cv-data"

import { EducationItem, Wrapper, EducationsList } from "./index.styled"

interface IEducationSection {
  educations: Array<IEducationItem>
  deleteEducation: (id: number) => void
}

export const EducationsSection: FC<IEducationSection> = ({
  educations,
  deleteEducation
}) => {
  return (
    <Wrapper>
      <Accordion title="Образование">
        <EducationsList>
          {educations.map((education: IEducationItem) => (
            <EducationItem key={education.id}>
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
