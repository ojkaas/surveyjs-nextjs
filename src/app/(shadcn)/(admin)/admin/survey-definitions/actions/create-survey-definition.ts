'use server'

import { createSurveyDefinitionSchema } from '@/app/(shadcn)/(admin)/admin/survey-definitions/data/schema'
import prisma from '@/db/db'
import { authAction } from '@/lib/safe-actions'
import { revalidateTag } from 'next/cache'

export const createSurveyDefinition = authAction(createSurveyDefinitionSchema, async (surveyDefinitionData) => {
  try {
    const user = await prisma.surveyDefinition.create({ data: { ...surveyDefinitionData } })
    revalidateTag('survey-definitions')
    return user
  } catch (e) {
    // We can add postgres errors here by code and throw nice errors
    throw e
  }
})
