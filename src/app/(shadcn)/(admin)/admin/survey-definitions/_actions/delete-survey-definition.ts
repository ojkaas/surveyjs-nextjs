'use server'
import 'server-only'

import { deleteSurveyDefinitionSchema } from '@/app/(shadcn)/(admin)/admin/survey-definitions/_data/schema'
import prisma from '@/db/db'
import { authAdminAction } from '@/lib/safe-actions'
import { revalidateTag } from 'next/cache'

export const deleteSurveyDefinitionAction = authAdminAction.schema(deleteSurveyDefinitionSchema).action(async ({ parsedInput: data }) => {
  try {
    const surveyDefinition = await prisma.surveyDefinition.delete({ where: { id: data.id } })
    revalidateTag('survey-definitions')
    return surveyDefinition
  } catch (e) {
    throw e
  }
})
