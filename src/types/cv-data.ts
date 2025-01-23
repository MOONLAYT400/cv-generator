export interface ITechItem {
  value: string
  description: string
  alternative: Array<string>
  type: string
}

export interface IEducationItem {
  id?: number
  university: string
  department: string
  field: string
  startDate: string
  endDate: string
}

export interface IDutyItem {
  id: number
  text: string | number
}

export interface IResponsibilityItem extends IDutyItem {}

export interface IExperienceItem {
  id?: number
  company: string
  role: string
  duties: Array<IDutyItem>
  startDate: string
  endDate: string
}

export interface IProjectItem {
  id?: number
  name: string
  description: string
  responsibilities: Array<IResponsibilityItem>
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
