import { Document, HeadingLevel, Packer, Paragraph, Table, TableRow, TableCell, WidthType, BorderStyle, TextRun } from "docx"
import { saveAs } from "file-saver"

import { ICVParams } from "@/types/cv-data"

export const useCVGenerator = (params: ICVParams): (() => void) => {
  const { fullName, technologies, experience, education } = params;

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
  const experienceDescription = experience.map((itemExperiense) => {
    return new Paragraph({
      children: [new TextRun({ text: `${itemExperiense.company}`, break: 0 }),
      new TextRun({ text: `${itemExperiense.role}`, break: 1 }),
      new TextRun({ text: `даты: ${itemExperiense.startDate}-${itemExperiense.endDate}`, break: 1 }),
      new TextRun({ text: "Должностные обязанности:", break: 1 }),
      new TextRun({ text: `${itemExperiense.duties.map((duty) => duty.text)}`, break: 1 })
      ],
    })
  });

  const educationDescription = education.map((education) => {
    return new Paragraph({
      children: [new TextRun({ text: `${education.university}`, break: 0 }),
      new TextRun({ text: `${education.field}`, break: 1 }),
      new TextRun({ text: `даты: ${education.startDate || ''}-${education.endDate || ''}`, break: 1 }),
      ],
    })
  });


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
                    children: [
                      new Paragraph({text: "Опыт работы"}),
                      ...experienceDescription,// заменить копирование на что-то более элегантное, на объединение массивов?
                      new Paragraph("Образование"),
                      ...educationDescription,
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
