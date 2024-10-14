import { ReactNode } from "react"

import { IStackData } from "./stack-data"
import { IProject } from "./cv-data"

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
