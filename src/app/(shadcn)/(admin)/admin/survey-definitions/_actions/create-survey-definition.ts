'use server'

import { createSurveyDefinitionActionSchema, Json } from '@/app/(shadcn)/(admin)/admin/survey-definitions/_data/schema'
import prisma from '@/db/db'
import { authOptions } from '@/lib/config/auth/auth-options'
import { authAdminAction } from '@/lib/safe-actions'
import { createOrUpdateSurveyDefinitionDataStructure } from '@/lib/survey/create-or-update-definition-data'
import { JsonObject } from '@prisma/client/runtime/library'
import { getServerSession } from 'next-auth'
import { revalidatePath, revalidateTag } from 'next/cache'

//TODO: Clean this up as the create should never have any jsonData, only the update should have it.
export const createSurveyDefinition = authAdminAction(createSurveyDefinitionActionSchema, async (surveyDefinitionData) => {
  try {
    const session = await getServerSession(authOptions)
    const copyOf = surveyDefinitionData.copyOf
    let copyOfData = null
    if (copyOf) {
      const surveyData = await prisma.surveyDefinitionData.findUniqueOrThrow({ where: { surveyDefId: copyOf }, select: { jsonData: true } })
      copyOfData = surveyData.jsonData as Json
    }
    delete surveyDefinitionData.copyOf
    delete surveyDefinitionData.data

    const definition = await prisma.surveyDefinition.create({
      data: {
        ...surveyDefinitionData,
        createdBy: session?.user.name,
        ...(copyOfData ? { surveyData: { create: { jsonData: copyOfData as JsonObject } } } : { surveyData: { create: { jsonData: {} } } }),
      },
    })
    await createOrUpdateSurveyDefinitionDataStructure(definition.id, copyOf)
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
