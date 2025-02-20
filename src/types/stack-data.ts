type TechItemType = {
  alternative: Array<string>
  description: string
  type:
    | "fe"
    | "be"
    | "languages"
    | "databases"
    | "devops"
    | "test"
    | "additional"
  value: string
  checked: boolean
}

export interface IStackData {
  languages: Array<TechItemType>
  fe: Array<TechItemType>
  be: Array<TechItemType>
  databases: Array<TechItemType>
  test: Array<TechItemType>
  devops: Array<TechItemType>
  additional: Array<TechItemType>
}
