import { ICVParams, IProjectItem, ITechItem } from "@/types/cv-data"

interface IMissingTech {
  missingMainTech: Array<ITechItem>
  missingProjectTech: Array<ITechItem>
}

export const useTechComparison = (data: ICVParams): IMissingTech => {
  const { technologies, projects } = data

  const flatProjectTech = (data: Array<IProjectItem>): Array<ITechItem> =>
    data
      .reduce((techArray: ITechItem[], project: IProjectItem) => {
        return [...techArray, ...project.technologies]
      }, [])
      .filter(
        (value, index, self) =>
          index ===
          self.findIndex((t) => t.type === value.type && t.name === value.name)
      )

  const aggregateArrayToObject = (array: Array<any>, field: string) =>
    array.reduce((aggregator, current) => {
      return { ...aggregator, [current[field]]: current }
    }, {})

  const findMissingTech = (
    primary: Array<ITechItem>,
    secondary: Array<ITechItem>
  ): Array<ITechItem> => {
    const agrPrimary = aggregateArrayToObject(primary, "name")
    const agrSecondary = aggregateArrayToObject(secondary, "name")

    const missingProjectsTech: Array<ITechItem> = []

    for (const key in agrPrimary) {
      if (!(key in agrSecondary)) {
        missingProjectsTech.push(agrPrimary[key])
      }
    }

    return missingProjectsTech
  }

  const comparePrimaryTech = () => {
    const flattenedProjectTech = flatProjectTech(projects)

    return findMissingTech(technologies, flattenedProjectTech)
  }

  const missingMainTech = comparePrimaryTech()

  return {
    missingMainTech,
    missingProjectTech: []
  }
}
