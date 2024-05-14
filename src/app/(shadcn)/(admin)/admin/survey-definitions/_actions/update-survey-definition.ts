'use server'

import { activateSurveyDefinitionSchema, addCreatorDataToSurveyDefinitionSchema, updateSurveyDefinitionSchema } from '@/app/(shadcn)/(admin)/admin/survey-definitions/_data/schema'
import prisma from '@/db/db'
import { authAdminAction } from '@/lib/safe-actions'
import { createOrUpdateSurveyDefintionDataStructure } from '@/lib/survey/create-or-update-definition-data'
import { revalidateTag } from 'next/cache'

export const updateSurveyDefinition = authAdminAction(updateSurveyDefinitionSchema, async (data) => {
  try {
    const surveyDefinition = await prisma.surveyDefinition.update({ where: { id: data.id }, data: data })
    await createOrUpdateSurveyDefintionDataStructure(surveyDefinition)
    revalidateTag('survey-definitions')
    revalidateTag('active-survey')
    return surveyDefinition
  } catch (e) {
    throw e
  }
})

export const addCreatorDataToSurveyDefinition = authAdminAction(addCreatorDataToSurveyDefinitionSchema, async (data) => {
  try {
    const surveyDefinition = await prisma.surveyDefinition.update({ where: { id: data.id }, data: { ...data, data: data.data || undefined } })
    await createOrUpdateSurveyDefintionDataStructure(surveyDefinition)
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
