export interface ITechItem {
  type: string
  name: string
}

export interface IEducationItem {
  id?: number
  university: string
  department: string
  field: string
  startDate: string
  endDate: string
}

export interface IExperienceItem {
  id?: number
  company: string
  role: string
  duties: string
  startDate: string
  endDate: string
}

export interface IProjectItem {
  id?: number
  name: string
  description: string
  role: string
  technologies: Array<ITechItem>
}

export interface ICVParams {
  fullName: string
  photo: string
  shortBio: string
  education: Array<IEducationItem>
  experience: Array<IExperienceItem>
  technologies: Array<ITechItem>
  projects: Array<IProjectItem>
}
