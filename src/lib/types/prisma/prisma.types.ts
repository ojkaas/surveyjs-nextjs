import { Prisma } from '@prisma/client'

const surveyDefinitionWithAllDetails = Prisma.validator<Prisma.SurveyDefinitionDefaultArgs>()({
  include: { surveyData: true, pages: { include: { questions: { include: { answers: { include: { weightedDiagnoses: { include: { diagnose: true } } } } } } } } },
})

export type SurveyDefinitionWithAllDetails = Prisma.SurveyDefinitionGetPayload<typeof surveyDefinitionWithAllDetails>
