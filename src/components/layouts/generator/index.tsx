"use client"
import { FC, useState } from "react"

import { Button } from "@/components/common/button"
import { useCVGenerator } from "@/hooks/useCVGenerator"
import { ICVParams } from "@/types/cv-data"

import { Wrapper } from "./index.styled"
interface IGeneratorLayout {
  file: { [key: string]: string[] }
}

export const GeneratorLayout: FC<IGeneratorLayout> = ({ file }) => {
  console.log(file)

  const [cvData, setSVData] = useState<ICVParams>({
    fullName: "test"
  })

  const saveDocument = useCVGenerator(cvData)

  return (
    <Wrapper>
      {/* <Button text="Generate CV" handleClick={saveDocument} /> */}
    </Wrapper>
  )
}
