import prisma from '@/db/db'
import { Choice, SurveyJson } from '@/lib/surveyjs/types'
import { SurveyDefinition } from '@prisma/client'

const SUPPORTED_QUESTION_TYPES = ['boolean', 'checkbox', 'radiogroup', 'dropdown', 'imagepicker', 'rating', 'ranking']

export function isObjectChoice(choice: Choice): choice is Exclude<Choice, string> {
  return typeof choice !== 'string'
}

export async function createOrUpdateSurveyDefintionDataStructure(surveyDefinition: SurveyDefinition) {
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
      if (page.elements) {
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
    }

    return surveyDefinition
  }
}
