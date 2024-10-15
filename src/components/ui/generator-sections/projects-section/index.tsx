import { FC } from "react"

import { Accordion } from "@/components/common/accordion"
import { Button } from "@/components/common/button"
import { IProjectItem } from "@/types/cv-data"

import { Project, ProjectList, Wrapper } from "./index.styled"

interface IProjectItemsSection {
  projects: Array<IProjectItem>
  updateProject: (project: IProjectItem) => void
  deleteProject: (project: IProjectItem) => void
}

export const ProjectsSection: FC<IProjectItemsSection> = ({
  projects,
  updateProject,
  deleteProject
}) => {
  return (
    <Wrapper>
      <Accordion title="Проэкты">
        <ProjectList>
          {projects.map((project: IProjectItem, index: number) => (
            <Project key={index} onClick={() => updateProject(project)}>
              <p>{project.name}</p>
              <p>{project.role}</p>
              <p>{project.description}</p>
              <Button
                buttonType={"danger"}
                text="Удалить"
                handleClick={() => deleteProject(project)}
              />
            </Project>
          ))}
        </ProjectList>
      </Accordion>
    </Wrapper>
  )
}
