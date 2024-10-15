import { FC } from "react"

import { Accordion } from "@/components/common/accordion"
import { IProject } from "@/types/cv-data"

import { Project, ProjectList, Wrapper } from "./index.styled"

interface IProjectsSection {
  projects: Array<IProject>
}

export const ProjectsSection: FC<IProjectsSection> = ({ projects }) => {
  return (
    <Wrapper>
      <Accordion title="Проэкты">
        <ProjectList>
          {projects.map((project: IProject, index: number) => (
            <Project key={index}>
              <div>{project.name}</div>
              <div>{project.role}</div>
              <div>{project.description}</div>
            </Project>
          ))}
        </ProjectList>
      </Accordion>
    </Wrapper>
  )
}
