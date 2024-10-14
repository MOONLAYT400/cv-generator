import { ReactNode } from "react"

import { IStackData } from "./stack-data"
import { IEducationItem, IExperienceItem, IProject } from "./cv-data"

export interface IModalWrapper {
  id: string
  children: ReactNode
  isOpened: boolean
  closeButton?: boolean
  close: () => void
}

export interface IModal {
  isOpened: boolean
  close: () => void
}

export interface ICreateProjectModal extends IModal {
  file: IStackData
  saveProject: (project: IProject) => void
}

export interface IAddExperience extends IModal {
  saveExperience: (experience: IExperienceItem) => void
}

export interface IAddEducation extends IModal {
  saveEducation: (education: IEducationItem) => void
}
