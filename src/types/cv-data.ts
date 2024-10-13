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

export interface ICVParams {
  fullName: string
  photo: string
  shortBio: string
  education: any[]
  experience: any[]
  languages: Array<ITechItem>
  fe: Array<ITechItem>
  be: Array<ITechItem>
  databases: Array<ITechItem>
  devops: Array<ITechItem>
  test: Array<ITechItem>
  additional: Array<ITechItem>
}
