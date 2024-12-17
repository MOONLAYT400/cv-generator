import { Document, HeadingLevel, Packer, Paragraph, Table, TableRow, TableCell, WidthType, BorderStyle, TextRun, PageBreak, UnderlineType, AlignmentType, convertInchesToTwip } from "docx"
import { saveAs } from "file-saver"

import { ICVParams, IEducationItem, IExperienceItem, IProjectItem } from "@/types/cv-data"

const styleForDocument = {
  default: {
    heading1: {
        run: {
            size: "45pt",
            bold: true,
            italics: false,
            color: "548ab7",
        },
        paragraph: {
            spacing: {
                after: 120,
            },
            alignment: AlignmentType.RIGHT,
        },
    },
    heading2: {
        run: {
            size: 26,
            bold: true,
            color: "548ab7",
            underline: {
                type: UnderlineType.DOUBLE,
                color: "548ab7",
            },
        },
        paragraph: {
            spacing: {
                before: 240,
                after: 120,
            },
        },
    },
    listParagraph: {
        run: {
            color: "#FF0000",
        },
    },
    document: {
        run: {
            size: "12pt",
            font: "Century Gothic",
            color: "000000",
        },
        paragraph: {
            alignment: AlignmentType.LEFT,
        },
    },
}
};

const getExperienceDescription = (experience: Array<IExperienceItem>): Paragraph[] => {
  return experience.map((itemExperiense) => {
    return new Paragraph({
      children: [new TextRun({ text: `${itemExperiense.company}`, break: 0 }),
      new TextRun({ text: `${itemExperiense.role}`, break: 1 }),
      new TextRun({ text: `даты: ${itemExperiense.startDate}-${itemExperiense.endDate}`, break: 1 }),
      new TextRun({ text: "Должностные обязанности:", break: 1 }),
      new TextRun({ text: itemExperiense.duties.join(", "), break: 1 })
      ],
    })
  });
}

const getEducationDescription = (education: Array<IEducationItem>): Paragraph[] => {
  return education.map((education) => {
    return new Paragraph({
      children: [new TextRun({ text: `${education.university}`, break: 0 }),
      new TextRun({ text: `${education.field}`, break: 1 }),
      new TextRun({ text: `даты: ${education.startDate || ''}-${education.endDate || ''}`, break: 1 }),
      ],
    })
  });
}

const getProjectDescription = (projects: Array<IProjectItem>): Paragraph[] => {
  const projectsDescriptionArr = projects.map((project) => {
    console.log(project);
    const projectDescriptionParagraph = [];
    const progectName = new Paragraph({ text: project.name, heading: "Heading2"});
    const projectDescription = new Paragraph(project.description);
    const technologies = project.technologies.map((technology) => technology.name);
    const projectTechnologies = new Paragraph({ children: [new TextRun('Стек: '), new TextRun(technologies.join(", "))] });
    projectDescriptionParagraph.push(progectName, projectDescription, projectTechnologies)
    return projectDescriptionParagraph;
  })
  return projectsDescriptionArr.flat(1);
}

export const useCVGenerator = (params: ICVParams): (() => void) => {
  const { fullName, technologies, experience, education, projects } = params;

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
  const experienceDescription = getExperienceDescription(experience);
  const educationDescription = getEducationDescription(education);
  const projectsDescription = getProjectDescription(projects);

  const doc = new Document({
    styles: styleForDocument,
    sections: [
      {
        children: [
          new Paragraph({
            text: fullName.toUpperCase(),
            heading: "Heading1",
            //HeadingLevel.TITLE,
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
                      new Paragraph({ text: "Опыт работы" }),
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
          ...projectsDescription,
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
