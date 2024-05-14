import prisma from '@/db/db'
import { SurveyDefinition } from '@prisma/client'
import { JsonValue } from 'next-auth/adapters'

type Choice =
  | string
  | {
      value: string
      text: string
      imageLink?: string
    }

interface Question {
  type: string
  name: string
  html?: string
  title?: string
  isRequired?: boolean
  choices?: Choice[]
  visibleIf?: string
  showSelectAllItem?: boolean
  selectAllText?: string
  labelTrue?: string
  labelFalse?: string
  swapOrder?: boolean
  imageFit?: string
}

interface Page {
  name: string
  elements: Question[]
  title: string
  visibleIf?: string
}

export type SurveyJson = JsonValue & {
  title: string
  completedHtml: string
  completedBeforeHtml: string
  loadingHtml: string
  pages: Page[]
  showProgressBar: string
  progressBarShowPageTitles: boolean
  startSurveyText: string
  pagePrevText: string
  pageNextText: string
  completeText: string
  firstPageIsStarted: boolean
}

const SUPPORTED_QUESTION_TYPES = ['boolean', 'checkbox', 'radiogroup', 'dropdown', 'imagepicker', 'rating', 'ranking']

function isObjectChoice(choice: Choice): choice is Exclude<Choice, string> {
  return typeof choice !== 'string'
}

export async function createOrUpdateSurveyDefintionDataStructure(surveyDefinition: SurveyDefinition) {
  console.log('Creating or updating survey definition data structure')

  if (surveyDefinition.data && typeof surveyDefinition.data === 'object') {
    const pages = await prisma.surveyPage.findMany({
      where: { surveyDefId: surveyDefinition.id },
      include: { questions: { include: { answers: { include: { weightedDiagnoses: { include: { diagnose: true } } } } } } },
    })

    if (pages.length > 0) {
      //remove old data, we will reattach the weighted diagnoses to the new data structure.
      await prisma.surveyPage.deleteMany({ where: { surveyDefId: surveyDefinition.id } })
      await prisma.surveyQuestion.deleteMany({ where: { surveyDefId: surveyDefinition.id } })
    }

    const json = surveyDefinition.data as SurveyJson
    let pageId = 1
    for (const page of json.pages) {
      const pageEntity = await prisma.surveyPage.create({
        data: {
          title: page.title,
          surveyDefId: surveyDefinition.id,
          number: pageId,
        },
      })
      for (const question of page.elements) {
        if (SUPPORTED_QUESTION_TYPES.includes(question.type)) {
          const questionEntity = await prisma.surveyQuestion.create({
            data: {
              title: question.title,
              type: question.type,
              pageId: pageEntity.id,
              question: question.name,
              surveyDefId: surveyDefinition.id,
            },
          })

          if (question.type === 'boolean') {
            //console.log('Creating boolean question options', question)
            await prisma.surveyQuestionOption.create({
              data: {
                surveyQuestionId: questionEntity.id,
                answer: question.labelTrue || 'Ja',
                text: question.labelTrue || 'Ja',
              },
            })

            await prisma.surveyQuestionOption.create({
              data: {
                surveyQuestionId: questionEntity.id,
                answer: question.labelFalse || 'Nee',
                text: question.labelFalse || 'Nee',
              },
            })
          } else {
            question.choices?.forEach(async (choice) => {
              await prisma.surveyQuestionOption.create({
                data: {
                  surveyQuestionId: questionEntity.id,
                  answer: isObjectChoice(choice) ? choice.value : choice,
                  text: isObjectChoice(choice) ? choice.text : choice,
                },
              })
            })
          }
        }
      }
      pageId++
    }
    console.log('Finished creating or updating survey definition data structure')
    return surveyDefinition
  }
}
