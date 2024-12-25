import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  TextRun,
  AlignmentType,
  IStylesOptions,
  ImageRun,
  Header,
  HorizontalPositionRelativeFrom
} from "docx"
import { saveAs } from "file-saver"

import { documentTemplateImage } from "@/assets/images/document-template-image"
import { keyNames } from "@/constants/generator/names"
import { extractBase64Data } from "@/helpers/base64image"
import {
  ICVParams,
  IEducationItem,
  IExperienceItem,
  IProjectItem,
  ITechItem
} from "@/types/cv-data"

const styleForDocument: IStylesOptions = {
  default: {
    listParagraph: {
      run: {
        size: "10pt",
        color: "000000"
      }
    },
    document: {
      run: {
        size: "11pt",
        font: "Century Gothic",
        color: "000000"
      },
      paragraph: {
        alignment: AlignmentType.JUSTIFIED,
        spacing: {
          before: 1,
          after: 1
        }
      }
    }
  },
  paragraphStyles: [
    {
      id: "fullName",
      name: "Full Name",
      run: {
        size: "43pt",
        bold: false,
        italics: false,
        color: "000000",
        smallCaps: true,
        font: "Century Gothic"
      },
      paragraph: {
        spacing: {
          before: 380,
          after: 380
        },
        alignment: AlignmentType.LEFT
      }
    },
    {
      id: "aboutMe",
      name: "About Me",
      run: {
        size: "13pt",
        bold: true,
        color: "548ab7",
        font: "Century Gothic"
      },
      paragraph: {
        spacing: {
          before: 300,
          after: 300
        },
        alignment: AlignmentType.LEFT
      }
    },
    {
      id: "stack",
      name: "Stack",
      run: {
        size: "13pt",
        bold: true,
        color: "548ab7",
        font: "Century Gothic"
      },
      paragraph: {
        alignment: AlignmentType.LEFT
      }
    },
    {
      id: "stackKey",
      name: "Stack Key",
      run: {
        size: "11pt",
        bold: true,
        color: "000000",
        font: "Century Gothic"
      },
      paragraph: {
        spacing: {
          after: 200
        },
        alignment: AlignmentType.LEFT
      }
    },
    {
      id: "experienceHeading",
      name: "Experience Heading",
      run: {
        size: "13pt",
        bold: true,
        color: "000000",
        font: "Century Gothic",
        allCaps: true
      },
      paragraph: {
        alignment: AlignmentType.LEFT,
        spacing: {
          after: 30
        }
      }
    },
    {
      id: "companyName",
      name: "Company Name",
      run: {
        size: "12pt",
        bold: true,
        color: "000000",
        font: "Century Gothic"
      },
      paragraph: {
        alignment: AlignmentType.LEFT,
        spacing: {
          before: 50,
          after: 150
        }
      }
    },
    {
      id: "roleName",
      name: "Role Name",
      run: {
        size: "11pt",
        bold: true,
        color: "000000",
        font: "Century Gothic"
      },
      paragraph: {
        alignment: AlignmentType.LEFT,
        spacing: {
          after: 150
        }
      }
    },
    {
      id: "experiencePeriod",
      name: "Experience Period",
      run: {
        size: "10pt",
        color: "000000",
        font: "Century Gothic"
      },
      paragraph: {
        alignment: AlignmentType.LEFT,
        spacing: {
          after: 150
        }
      }
    },
    {
      id: "bulletItem",
      name: "Bullet Item",
      run: {
        size: "11pt",
        color: "000000",
        font: "Century Gothic"
      },
      paragraph: {
        alignment: AlignmentType.LEFT
      }
    },
    {
      id: "educationHeading",
      name: "Education Heading",
      run: {
        size: "13pt",
        bold: true,
        color: "000000",
        font: "Century Gothic",
        allCaps: true
      },
      paragraph: {
        alignment: AlignmentType.LEFT,
        spacing: {
          before: 200,
          after: 200
        }
      }
    },
    {
      id: "educationItem",
      name: "Education Item",
      run: {
        size: "10pt",
        color: "000000",
        font: "Century Gothic",
        bold: true
      },
      paragraph: {
        alignment: AlignmentType.LEFT,
        spacing: {
          after: 200
        }
      }
    },
    {
      id: "projectHeading",
      name: "Project Heading",
      run: {
        size: "24pt",
        color: "000000",
        font: "Century Gothic",
        bold: true,
        smallCaps: true
      },
      paragraph: {
        alignment: AlignmentType.LEFT
      }
    },
    {
      id: "projectDate",
      name: "Project Date",
      run: {
        size: "12pt",
        color: "000000",
        font: "Century Gothic"
      },
      paragraph: {
        alignment: AlignmentType.LEFT,
        spacing: {
          after: 200
        }
      }
    },
    {
      id: "projectDescription",
      name: "Project Description",
      run: {
        size: "12pt",
        color: "000000",
        font: "Century Gothic"
      },
      paragraph: {
        spacing: {
          after: 300
        }
      }
    },
    {
      id: "responsibilitiesHeading",
      name: "Responsibilities Heading",
      run: {
        size: "14pt",
        bold: true,
        color: "548ab7",
        font: "Century Gothic"
      },
      paragraph: {
        spacing: {
          before: 300,
          after: 200
        },
        alignment: AlignmentType.LEFT
      }
    },
    {
      id: "projectStack",
      name: "Project Stack",
      run: {
        size: "12pt",
        color: "000000",
        font: "Century Gothic"
      },
      paragraph: {
        alignment: AlignmentType.LEFT,
        spacing: {
          line: 400
        }
      }
    },
    {
      id: "spacedBulletItem",
      name: "Spaced Bullet Item",
      run: {
        size: "12pt",
        color: "000000",
        font: "Century Gothic"
      },
      paragraph: {
        alignment: AlignmentType.LEFT,
        spacing: {
          after: 150,
          lineRule: "exact",
          line: 400
        }
      }
    }
  ]
}

const createName = (fullName: string): Paragraph => {
  return new Paragraph({
    text: fullName,
    style: "fullName"
  })
}

const createAvatar = (photo: string): Paragraph => {
  const base64ImageData = extractBase64Data(photo)

  return new Paragraph({
    children: [
      new ImageRun({
        data: Uint8Array.from(atob(base64ImageData), (c) => c.charCodeAt(0)),
        transformation: {
          width: 185,
          height: 185
        },
        floating: {
          layoutInCell: true,
          horizontalPosition: {
            align: "center",
            offset: 0
          },
          verticalPosition: {
            align: "center",
            offset: 0
          }
        }
      })
    ]
  })
}

const createAboutMe = (shortBio: string): Paragraph => {
  return new Paragraph({
    text: `О СЕБЕ`,
    style: "aboutMe",
    keepNext: true,
    children: [
      new TextRun({
        text: shortBio,
        bold: false,
        size: "11pt",
        color: "000000",
        font: "Century Gothic",
        break: 1
      })
    ]
  })
}

const createOverallStack = (technologies: Array<ITechItem>): Paragraph => {
  const formattedStack: { [key: string]: Array<string> } = {
    languages: [],
    fe: [],
    be: [],
    databases: [],
    devops: [],
    test: [],
    additional: []
  }

  technologies.forEach((item) => {
    formattedStack[item.type].push(item.name)
  })

  const children = Object.keys(formattedStack).reduce(
    (children: Array<TextRun>, current: string) => {
      if (formattedStack[current]?.length > 0) {
        children.push(
          new TextRun({
            text: `${keyNames?.[current as keyof typeof keyNames]}: `,
            bold: true,
            size: "11pt",
            color: "000000",
            font: "Century Gothic",
            break: 2
          }),
          new TextRun({
            text: ` ${formattedStack[current]?.join(", ")}`,
            bold: false,
            size: "11pt",
            color: "000000",
            font: "Century Gothic"
          })
        )
      }
      return children
    },
    []
  )

  return new Paragraph({
    text: "ПРОФЕССИОНАЛЬНЫЕ НАВЫКИ",
    style: "stack",
    children: children
  })
}

const getExperienceDescription = (
  experience: Array<IExperienceItem>
): Paragraph[] => {
  const experienceDescription = experience.map((itemExperience) => {
    const experience = [
      new Paragraph({
        text: itemExperience.company,
        style: "companyName"
      }),
      new Paragraph({
        text: itemExperience.role,
        style: "roleName"
      }),
      new Paragraph({
        text: `${itemExperience.startDate}-${itemExperience.endDate}`,
        style: "experiencePeriod"
      })
    ]

    const experienceWithDuties = itemExperience.duties.reduce(
      (acc: Array<Paragraph>, duty) => {
        acc.push(
          new Paragraph({
            text: `${duty.text.toString().trim()};`,
            bullet: { level: 0 },
            style: "bulletItem",
            run: {
              color: "548ab7"
            }
          })
        )
        return acc
      },
      experience
    )

    return experienceWithDuties
  })
  return [
    new Paragraph({
      text: "Опыт работы",
      style: "experienceHeading",
      border: {
        bottom: {
          color: "548ab7",
          space: 1,
          style: "single",
          size: 4
        }
      }
    }),
    ...experienceDescription.flat(1)
  ]
}

const getEducationDescription = (
  educationData: Array<IEducationItem>
): Paragraph[] => {
  const educations = educationData.reduce(
    (acc: Array<Paragraph>, education) => {
      acc.push(
        new Paragraph({
          text: `${education.university}`,
          style: "educationItem",
          children: [
            new TextRun({
              text: `${education.startDate || ""}-${
                education.endDate || "текущее время"
              }`,
              bold: false,
              break: 1
            }),
            new TextRun({ text: `${education.field}`, break: 1, bold: false })
          ]
        })
      )
      return acc
    },
    [
      new Paragraph({
        text: "Образование",
        style: "educationHeading",
        border: {
          bottom: {
            color: "548ab7",
            space: 1,
            style: "single",
            size: 4
          }
        }
      })
    ]
  )

  return educations
}

const getProjectDescription = (projects: Array<IProjectItem>): Paragraph[] => {
  const projectsDescriptionArr = projects
    .map((project) => {
      const technologies = project.technologies
        .map((technology) => technology.name)
        .join(", ")

      const projectDescriptionParagraph = [
        new Paragraph({
          text: project.name,
          style: "projectHeading",
          pageBreakBefore: true,
          border: {
            bottom: {
              color: "548ab7",
              space: 15,
              style: "single",
              size: 4
            }
          }
        }),
        new Paragraph({
          text: project.role,
          style: "projectDate"
        }),
        new Paragraph({
          text: project.description,
          style: "projectDescription"
        }),
        new Paragraph({
          style: "projectStack",
          children: [
            new TextRun({
              text: "Стек: ",
              bold: true,
              size: "14pt",
              color: "000000",
              font: "Century Gothic"
            }),
            new TextRun({
              text: technologies,
              bold: false,
              color: "000000",
              font: "Century Gothic"
            })
          ]
        }),
        new Paragraph({
          text: `Над чем я работал:`,
          style: "responsibilitiesHeading"
        })
      ]

      const projectWithResps = project.responsibilities.reduce(
        (acc: Array<Paragraph>, resp) => {
          acc.push(
            new Paragraph({
              text: `${resp.text.toString().trim()};`,
              bullet: { level: 0 },
              style: "spacedBulletItem",
              run: {
                color: "548ab7"
              }
            })
          )
          return acc
        },
        projectDescriptionParagraph
      )

      return projectWithResps
    })
    .flat(1)

  return projectsDescriptionArr
}

export const useCVGenerator = (params: ICVParams): (() => void) => {
  const {
    fullName,
    shortBio,
    photo,
    technologies,
    experience,
    education,
    projects
  } = params

  const projectsDescription = getProjectDescription(projects)

  const doc = new Document({
    styles: styleForDocument,
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: "1.27cm",
              right: "0.99cm",
              bottom: "1cm",
              left: "0.99cm"
            },
            size: {
              width: "21cm",
              height: "29.7cm"
            }
          }
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                children: [
                  new ImageRun({
                    data: Uint8Array.from(atob(documentTemplateImage), (c) =>
                      c.charCodeAt(0)
                    ),
                    transformation: {
                      width: 810,
                      height: 1080
                    },
                    floating: {
                      horizontalPosition: {
                        relative: HorizontalPositionRelativeFrom.PAGE,
                        offset: 200000
                      },
                      verticalPosition: {
                        relative: HorizontalPositionRelativeFrom.PAGE,
                        offset: 200000
                      },
                      behindDocument: true
                    }
                  })
                ]
              })
            ]
          })
        },
        children: [
          new Table({
            columnWidths: [20, 1, 33],
            width: {
              size: "19cm",
              type: WidthType.DXA
            },
            borders: {
              top: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.NONE },
              left: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE }
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [createAvatar(photo)],
                    borders: {
                      top: { style: BorderStyle.NONE },
                      bottom: { style: BorderStyle.NONE },
                      left: { style: BorderStyle.NONE },
                      right: { style: BorderStyle.NONE }
                    }
                  }),
                  new TableCell({
                    children: [],
                    borders: {
                      top: { style: BorderStyle.NONE },
                      bottom: { style: BorderStyle.NONE },
                      left: { style: BorderStyle.NONE },
                      right: { style: BorderStyle.NONE }
                    }
                  }),
                  new TableCell({
                    children: [createName(fullName)],
                    borders: {
                      top: { style: BorderStyle.NONE },
                      bottom: { style: BorderStyle.NONE },
                      left: { style: BorderStyle.NONE },
                      right: { style: BorderStyle.NONE }
                    }
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      createAboutMe(shortBio),
                      createOverallStack(technologies)
                    ],
                    borders: {
                      top: { style: BorderStyle.NONE },
                      bottom: { style: BorderStyle.NONE },
                      left: { style: BorderStyle.NONE },
                      right: { style: BorderStyle.NONE }
                    }
                  }),
                  new TableCell({
                    children: [],
                    borders: {
                      top: { style: BorderStyle.NONE },
                      bottom: { style: BorderStyle.NONE },
                      left: { style: BorderStyle.NONE },
                      right: { style: BorderStyle.NONE }
                    }
                  }),
                  new TableCell({
                    children: [
                      ...getExperienceDescription(experience),
                      ...getEducationDescription(education)
                    ],
                    borders: {
                      top: { style: BorderStyle.NONE },
                      bottom: { style: BorderStyle.NONE },
                      left: { style: BorderStyle.NONE },
                      right: { style: BorderStyle.NONE }
                    }
                  })
                ]
              })
            ]
          }),
          ...projectsDescription
        ]
      }
    ]
  })

  const saveDocument = async () => {
    const blob = await Packer.toBlob(doc)
    saveAs(blob, fullName)
  }

  return saveDocument
}
