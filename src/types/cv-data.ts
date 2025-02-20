export interface ITechItem {
  value: string
  description: string
  alternative: Array<string>
  type: string
  checked: boolean
}

export interface IEducationItem {
  id?: string | number
  university: string
  department: string
  field: string
  startDate: string
  endDate: string
}

export interface IDutyItem {
  id: string | number
  text: string | number
}

export interface IResponsibilityItem extends IDutyItem {}

export interface IExperienceItem {
  id?: string | number
  company: string
  role: string
  duties: Array<IDutyItem>
  startDate: string
  endDate: string
}

export interface IProjectItem {
  id?: string | number
  name: string
  description: string
  responsibilities: Array<IResponsibilityItem>
  role: string
  industry: string
  period: string
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
