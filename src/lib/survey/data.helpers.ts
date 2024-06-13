import prisma from '@/db/db'
import { Question } from '@/lib/surveyjs/types'
import { Prisma, SurveyQuestionOption } from '@prisma/client'

const pageWithAllDetails = Prisma.validator<Prisma.SurveyPageDefaultArgs>()({
  include: { questions: { include: { answers: { include: { weightedDiagnoses: { include: { diagnose: true } } } } } }, activeDiagnoses: true },
})
export type PageWithAllDetails = Prisma.SurveyPageGetPayload<typeof pageWithAllDetails>

const questionWithDetails = Prisma.validator<Prisma.SurveyQuestionDefaultArgs>()({
  include: { answers: { include: { weightedDiagnoses: { include: { diagnose: true } } } } },
})
export type QuestionWithDetails = Prisma.SurveyQuestionGetPayload<typeof questionWithDetails>

export class SurveyDataHelper {
  static async connectActiveDiagnoses(id: string, diagnoseIds: { id: string }[]) {
    await prisma.surveyPage.update({
      where: { id },
      data: {
        activeDiagnoses: {
          connect: diagnoseIds,
        },
      },
    })
  }
  static async createSurveyPage(surveyDefId: string, title: string, pageId: number) {
    return prisma.surveyPage.create({
      data: {
        title,
        surveyDefId,
        number: pageId,
      },
    })
  }

  static async createSurveyQuestion(surveyDefId: string, pageId: string, question: Question, questionNumber: number) {
    return prisma.surveyQuestion.create({
      data: {
        title: question.title,
        type: question.type,
        pageId,
        question: question.name,
        surveyDefId,
        questionNumber,
      },
    })
  }

  static async fetchExistingSurveyPages(surveyDefId: string) {
    return prisma.surveyPage.findMany({
      where: { surveyDefId },
      include: { questions: { include: { answers: { include: { weightedDiagnoses: { include: { diagnose: true } } } } } }, activeDiagnoses: true },
    })
  }

  static async deleteSurveyPage(pageId: string) {
    await prisma.surveyPage.delete({ where: { id: pageId } })
  }

  static async deleteSurveyQuestion(questionId: string) {
    await prisma.surveyQuestion.delete({ where: { id: questionId } })
  }

  static async reattachWeightedDiagnoses(oldQuestion: QuestionWithDetails, newQuestionOptions: SurveyQuestionOption[], copyOf?: boolean) {
    for (const option of newQuestionOptions) {
      const oldOption = oldQuestion.answers.find((a) => a.answer === option.answer)
      if (oldOption) {
        if (copyOf) {
          const newWeightedDiagnoses = oldOption.weightedDiagnoses.map(
            (wd) =>
              ({
                diagnoseId: wd.diagnoseId,
                weight: wd.weight,
                surveyAnswerId: option.id,
              }) as Prisma.WeightedDiagnoseCreateManyInput
          )
          await prisma.weightedDiagnose.createMany({ data: newWeightedDiagnoses })
        } else {
          await prisma.surveyQuestionOption.update({
            where: { id: option.id },
            data: {
              weightedDiagnoses: {
                connect: oldOption.weightedDiagnoses.map((wd) => ({ id: wd.id })),
              },
            },
          })
        }
      }
    }
  }

  static async createSurveyQuestionOption(surveyQuestionId: string, answer: string, text: string) {
    return prisma.surveyQuestionOption.create({
      data: {
        surveyQuestionId,
        answer,
        text,
      },
    })
  }
}
