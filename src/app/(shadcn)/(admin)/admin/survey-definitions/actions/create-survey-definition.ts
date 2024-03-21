'use server'

import { createSurveyDefinitionSchema } from '@/app/(shadcn)/(admin)/admin/survey-definitions/data/schema'
import prisma from '@/db/db'
import { authOptions } from '@/lib/config/auth/auth-options'
import { authAction } from '@/lib/safe-actions'
import { getServerSession } from 'next-auth'
import { revalidateTag } from 'next/cache'

export const createSurveyDefinition = authAction(createSurveyDefinitionSchema, async (surveyDefinitionData) => {
  try {
    const session = await getServerSession(authOptions)
    const user = await prisma.surveyDefinition.create({ data: { ...surveyDefinitionData, createdBy: session?.user.name, data: surveyDefinitionData.data || undefined } })
    revalidateTag('survey-definitions')
    return user
  } catch (e) {
    // We can add postgres errors here by code and throw nice errors
    throw e
  }
})
