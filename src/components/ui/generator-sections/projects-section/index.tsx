import { FC } from "react"

import { Accordion } from "@/components/common/accordion"
import { Button } from "@/components/common/button"
import { IProject } from "@/types/cv-data"

import { Project, ProjectList, Wrapper } from "./index.styled"

interface IProjectsSection {
  projects: Array<IProject>
  deleteProject: (project: IProject) => void
}

export const ProjectsSection: FC<IProjectsSection> = ({
  projects,
  deleteProject
}) => {
  return (
    <Wrapper>
      <Accordion title="Проэкты">
        <ProjectList>
          {projects.map((project: IProject, index: number) => (
            <Project key={index}>
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
