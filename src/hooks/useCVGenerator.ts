import { Document, HeadingLevel, Packer, Paragraph } from "docx"
import { saveAs } from "file-saver"

import { ICVParams } from "@/types/cv-data"

export const useCVGenerator = (params: ICVParams): (() => void) => {
  const { fullName } = params

  // TODO implement file structure

  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            text: fullName,
            heading: HeadingLevel.TITLE
          })
        ]
      }
    ]
  })

  const saveDocument = () => {
    Packer.toBlob(doc).then((blob) => {
      console.log(blob)
      saveAs(blob, "example.docx")
      console.log("Document created successfully")
    })
  }

  return saveDocument
}
