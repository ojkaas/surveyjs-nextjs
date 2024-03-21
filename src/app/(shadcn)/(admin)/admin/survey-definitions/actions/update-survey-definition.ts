'use server'

import { activateSurveyDefinitionSchema, addCreatorDataToSurveyDefinitionSchema, updateSurveyDefinitionSchema } from '@/app/(shadcn)/(admin)/admin/survey-definitions/data/schema'
import prisma from '@/db/db'
import { authAction } from '@/lib/safe-actions'
import { revalidateTag } from 'next/cache'

export const updateSurveyDefinition = authAction(updateSurveyDefinitionSchema, async (data) => {
  try {
    const surveyDefinition = await prisma.surveyDefinition.update({ where: { id: data.id }, data: data })
    revalidateTag('survey-definitions')
    return surveyDefinition
  } catch (e) {
    throw e
  }
})

export const addCreatorDataToSurveyDefinition = authAction(addCreatorDataToSurveyDefinitionSchema, async (data) => {
  try {
    const surveyDefinition = await prisma.surveyDefinition.update({ where: { id: data.id }, data: { ...data, data: data.data || undefined } })
    revalidateTag('survey-definitions')
    return surveyDefinition
  } catch (e) {
    console.log('Error in addCreatorDataToSurveyDefinition', e)
    throw e
  }
})

export const activateSurveyDefinition = authAction(activateSurveyDefinitionSchema, async (data) => {
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

      return updatedSurveyDefinition
    })

    return surveyDefinition
  } catch (e) {
    throw e
  }
})
