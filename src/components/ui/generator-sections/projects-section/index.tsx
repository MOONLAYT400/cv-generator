import { FC, useState } from "react"

import { Accordion } from "@/components/common/accordion"
import { Button } from "@/components/common/button"
import { CreateProjectModal } from "@/components/common/modal"
import { IProjectItem } from "@/types/cv-data"
import { IStackData } from "@/types/stack-data"

import { Project, ProjectList, Wrapper } from "./index.styled"

interface IProjectItemsSection {
  file: IStackData
  projects: Array<IProjectItem>
  deleteProject: (project: IProjectItem) => void
  saveProject: (type: "create" | "update", project: IProjectItem) => void
}

export const ProjectsSection: FC<IProjectItemsSection> = ({
  file,
  projects,
  saveProject,
  deleteProject
}) => {
  const [project, setProject] = useState<IProjectItem | null>(null)

  const handleOpenModal = (project: IProjectItem) => setProject(project)
  const handleCloseModal = () => setProject(null)

  return (
    <Wrapper className="projects">
      <CreateProjectModal
        file={file}
        project={project}
        isOpened={!!project}
        saveProject={saveProject}
        close={handleCloseModal}
      />
      <Accordion
        title="Проекты"
        isActiveDefault
        titleButtons={[
          {
            text: "+ Проект",
            click: () => handleOpenModal({} as IProjectItem)
          }
        ]}
      >
        <ProjectList>
          {projects.map((project: IProjectItem, index: number) => (
            <Project key={index} onClick={() => handleOpenModal(project)}>
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
