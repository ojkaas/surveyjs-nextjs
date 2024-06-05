'use server'

import { createSurveyDefinitionActionSchema } from '@/app/(shadcn)/(admin)/admin/survey-definitions/_data/schema'
import prisma from '@/db/db'
import { authOptions } from '@/lib/config/auth/auth-options'
import { authAdminAction } from '@/lib/safe-actions'
import { createOrUpdateSurveyDefinitionDataStructure } from '@/lib/survey/create-or-update-definition-data'
import { getServerSession } from 'next-auth'
import { revalidatePath, revalidateTag } from 'next/cache'

export const createSurveyDefinition = authAdminAction(createSurveyDefinitionActionSchema, async (surveyDefinitionData) => {
  try {
    const session = await getServerSession(authOptions)
    const copyOf = surveyDefinitionData.copyOf
    delete surveyDefinitionData.copyOf
    const definition = await prisma.surveyDefinition.create({ data: { ...surveyDefinitionData, createdBy: session?.user.name, data: surveyDefinitionData.data || undefined } })
    await createOrUpdateSurveyDefinitionDataStructure(definition, copyOf)
    revalidateTag('survey-definitions')
    revalidateTag('active-survey')
    revalidateTag('weighted-diagnoses')
    revalidatePath('/admin/survey-definitions')
    return definition
  } catch (e) {
    // We can add postgres errors here by code and throw nice errors
    throw e
  }
})
