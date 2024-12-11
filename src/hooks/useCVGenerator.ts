import { Document, HeadingLevel, Packer, Paragraph, Table, TableRow, TableCell, WidthType, BorderStyle } from "docx"
import { saveAs } from "file-saver"

import { ICVParams } from "@/types/cv-data"

export const useCVGenerator = (params: ICVParams): (() => void) => {
  const { fullName, technologies, experience } = params;

  const technologiesString = technologies.map((item) => {
    return ` ${item.name.toString()}`;
  })
  // photo, shortBio, education, experience, technologies, projects
  // fullName: string
  // photo: string
  // shortBio: string
  // education: Array<IEducationItem>
  // experience: Array<IExperienceItem>
  // technologies: Array<ITechItem>
  // projects: Array<IProjectItem>

  // TODO implement file structure
  const some = experience.map((itemExperiense) => {
    return `${itemExperiense.company} даты: ${itemExperiense.startDate}-${itemExperiense.endDate}\n`
  })
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            text: fullName,
            heading: HeadingLevel.TITLE
          }),
          // начало моих экспериментов
          new Table({
            columnWidths: [3000, 6000],
            borders: {
              top: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.NONE },
              left: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE },
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({
                      text: "Навыки",
                    }
                    ),
                    new Paragraph({
                      text: technologiesString.toString(),
                    })
                    ],
                    width: {
                      size: 3000,
                      type: WidthType.DXA,
                    },
                    borders: {
                      top: { style: BorderStyle.NONE },
                      bottom: { style: BorderStyle.NONE },
                      left: { style: BorderStyle.NONE },
                      right: { style: BorderStyle.NONE },
                    },
                  }),
                  new TableCell({
                    children: [new Paragraph("Опыт работы"),
                    new Paragraph({
                      text: some.toString(),
                    }),
                    new Paragraph("Образование"),
                    ],
                    width: {
                      size: 6000,
                      type: WidthType.DXA,
                    },
                    borders: {
                      top: { style: BorderStyle.NONE },
                      bottom: { style: BorderStyle.NONE },
                      left: { style: BorderStyle.NONE },
                      right: { style: BorderStyle.NONE },
                    },
                  }),
                ],
              }),
            ],
          }),
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
