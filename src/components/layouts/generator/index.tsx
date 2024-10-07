"use client"

import { Select } from "@/components/common/select/Select"
import { FC } from "react"

interface IGeneratorLayout {
  file: { [key: string]: string[] }
}

export const GeneratorLayout: FC<IGeneratorLayout> = ({ file }) => {
  console.log(file)

  return (
    <div>
      <Select options={file.databases} />
    </div>
  )
}
