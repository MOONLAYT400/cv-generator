export interface ITechItem {
  type: string
  name: string
}

export interface ICVParams {
  fullName: string
  photo: string
  shortBio: string
  languages: Array<ITechItem>
  fe: Array<ITechItem>
  be: Array<ITechItem>
  databases: Array<ITechItem>
  devops: Array<ITechItem>
  test: Array<ITechItem>
  additional: Array<ITechItem>
}
