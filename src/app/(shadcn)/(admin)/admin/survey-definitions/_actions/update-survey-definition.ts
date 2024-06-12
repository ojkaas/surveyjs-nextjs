'use server'

import { activateSurveyDefinitionSchema, addCreatorDataToSurveyDefinitionSchema, updateSurveyDefinitionSchema } from '@/app/(shadcn)/(admin)/admin/survey-definitions/_data/schema'
import prisma from '@/db/db'
import { authAdminAction } from '@/lib/safe-actions'
import { createOrUpdateSurveyDefinitionDataStructure, validateCreateDataStucture } from '@/lib/survey/create-or-update-definition-data'
import { SurveyJson } from '@/lib/surveyjs/types'
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
    await createOrUpdateSurveyDefinitionDataStructure(surveyDefinition)
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
    const surveyDefinition = await prisma.surveyDefinition.update({ where: { id: data.id }, data: { ...data, data: data.data || undefined } })
    await createOrUpdateSurveyDefinitionDataStructure(surveyDefinition)
    revalidateTag('survey-definitions')
    revalidateTag('active-survey')
    revalidateTag('weighted-diagnoses')
    return surveyDefinition
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

export const patchSurveyDefinitions = authAdminAction({}, async () => {
  try {
    const dataRecords = await prisma.surveyDefinitionData.count()
    console.log('Data records:', dataRecords)
    if (dataRecords > 0) {
      return
    }
    console.log('Patching survey definitions')
    const defs = await prisma.surveyDefinition.findMany({ select: { id: true, data: true } })
    const surveyDefinitionDatas = defs.map((surveyDefinition) => {
      return {
        surveyDefId: surveyDefinition.id,
        jsonData: surveyDefinition.data as any,
      }
    })
    console.log('Creating survey definition data records', surveyDefinitionDatas.length)

    await prisma.surveyDefinitionData.createMany({ data: surveyDefinitionDatas })
    return { success: true }
  } catch (e) {
    console.error('Failed to create survey definition data records:', e)
    return { success: false, error: e }
  }
})
