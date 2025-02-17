import { ReactNode } from "react"

import {
  ICVParams,
  IEducationItem,
  IExperienceItem,
  IProjectItem,
  ITechItem
} from "./cv-data"
import { IStackData } from "./stack-data"

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

export interface IAddEducation extends IModal {
  education: IEducationItem | null
  saveEducation: (type: "create" | "update", education: IEducationItem) => void
}

export interface IAddExperience extends IModal {
  experience: IExperienceItem | null
  saveExperience: (
    type: "create" | "update",
    experience: IExperienceItem
  ) => void
}

export interface ICreateProjectModal extends IModal {
  file: IStackData
  project: IProjectItem | null
  saveProject: (type: "create" | "update", project: IProjectItem) => void
}

export interface ICompareTechModal extends IModal {
  cvData: ICVParams
}

export interface ICreateStackModal extends IModal {
  techStack: IStackData
  updateTechList: (techData: IStackData) => void
}

export interface ITechHelpModal extends IModal {
  data: ITechItem
}
