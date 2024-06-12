'use server'

import { activateSurveyDefinitionSchema, addCreatorDataToSurveyDefinitionSchema, updateSurveyDefinitionSchema } from '@/app/(shadcn)/(admin)/admin/survey-definitions/_data/schema'
import prisma from '@/db/db'
import { authAdminAction } from '@/lib/safe-actions'
import { createOrUpdateSurveyDefinitionDataStructure, validateCreateDataStucture } from '@/lib/survey/create-or-update-definition-data'
import { SurveyJson } from '@/lib/surveyjs/types'
import { JsonObject } from '@prisma/client/runtime/library'
import { revalidateTag, unstable_cache } from 'next/cache'

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T
export type SurveyDefinitionWithAllDetails = ThenArg<ReturnType<typeof getSurveyDefintionWithAllDetails>>

const getSurveyDefintionWithAllDetails = unstable_cache(
  async (id: string) =>
    prisma.surveyDefinition.findUniqueOrThrow({
      where: { id },
      include: { pages: { include: { questions: { include: { answers: { include: { weightedDiagnoses: true } } } } } } },
    }),
  ['survey-definition'],
  { tags: ['survey-definitions'] }
)

export const updateSurveyDefinition = authAdminAction(updateSurveyDefinitionSchema, async (data) => {
  try {
    const surveyDefinition = await prisma.surveyDefinition.update({ where: { id: data.id }, data: data })

    revalidateTag('survey-definitions')
    revalidateTag('active-survey')
    return surveyDefinition
  } catch (e) {
    throw e
  }
})

export const validateCreateData = authAdminAction(addCreatorDataToSurveyDefinitionSchema, async (data) => {
  const surveyWithDetails = await getSurveyDefintionWithAllDetails(data.id)
  return validateCreateDataStucture(surveyWithDetails, data.data as SurveyJson)
})

export const addCreatorDataToSurveyDefinition = authAdminAction(addCreatorDataToSurveyDefinitionSchema, async (data) => {
  try {
    await prisma.surveyDefinitionData.update({ where: { surveyDefId: data.id }, data: { jsonData: (data.data as JsonObject) || undefined } })
    await createOrUpdateSurveyDefinitionDataStructure(data.id)
    revalidateTag('survey-definitions')
    revalidateTag('active-survey')
    revalidateTag('weighted-diagnoses')
    return await prisma.surveyDefinition.findUniqueOrThrow({ where: { id: data.id } })
  } catch (e) {
    console.log('Error in addCreatorDataToSurveyDefinition', e)
    throw e
  }
})

export const activateSurveyDefinition = authAdminAction(activateSurveyDefinitionSchema, async (data) => {
  try {
    const surveyDefinition = await prisma.$transaction(async (prisma) => {
      // Deactivate all survey definitions
      await prisma.surveyDefinition.updateMany({
        where: {},
        data: { active: false },
      })
      // Activate the survey definition with the given ID
      const updatedSurveyDefinition = await prisma.surveyDefinition.update({
        where: { id: data.id },
        data: { active: true },
      })
      // Revalidate the tag
      revalidateTag('survey-definitions')
      revalidateTag('active-survey')
      return updatedSurveyDefinition
    })

    return surveyDefinition
  } catch (e) {
    throw e
  }
})
