'use server'

import { addCreatorDataToSurveyDefinitionSchema, updateSurveyDefinitionSchema } from '@/app/(shadcn)/(admin)/admin/survey-definitions/data/schema'
import prisma from '@/db/db'
import { authAction } from '@/lib/safe-actions'
import { revalidateTag } from 'next/cache'

export const updateSurveyDefinition = authAction(updateSurveyDefinitionSchema, async (data) => {
  try {
    const user = await prisma.surveyDefinition.update({ where: { id: data.id }, data: data })
    revalidateTag('survey-definitions')
    return user
  } catch (e) {
    throw e
  }
})

export const addCreatorDataToSurveyDefinition = authAction(addCreatorDataToSurveyDefinitionSchema, async (data) => {
  try {
    const user = await prisma.surveyDefinition.update({ where: { id: data.id }, data: { ...data, data: data.data || undefined } })
    revalidateTag('survey-definitions')
    return user
  } catch (e) {
    console.log('Error in addCreatorDataToSurveyDefinition', e)
    throw e
  }
})
