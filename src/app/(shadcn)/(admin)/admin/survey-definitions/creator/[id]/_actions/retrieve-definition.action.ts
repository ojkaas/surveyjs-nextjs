'use server'

import { retrieveSurveyDefinitionSchema } from '@/app/(shadcn)/(admin)/admin/survey-definitions/_data/schema'
import prisma from '@/db/db'
import { authAdminAction } from '@/lib/safe-actions'

export const retrieveSurveyDefinitionAction = authAdminAction.schema(retrieveSurveyDefinitionSchema).action(async ({ parsedInput: data }) => {
  try {
    return prisma.surveyDefinition.findUniqueOrThrow({
      where: { id: data.id },
      include: { surveyData: true, pages: { include: { questions: { include: { answers: { include: { weightedDiagnoses: { include: { diagnose: true } } } } } } } } },
    })
  } catch (e) {
    throw e
  }
})
