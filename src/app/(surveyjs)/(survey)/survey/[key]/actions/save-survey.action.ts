'use server'

import { saveSurveyResults } from '@/app/(surveyjs)/(survey)/survey/data/schema'
import prisma from '@/db/db'
import { publicAction } from '@/lib/safe-actions'
import { revalidateTag } from 'next/cache'

export const saveSurveyData = publicAction.schema(saveSurveyResults).action(async ({ parsedInput: surveyData }) => {
  try {
    const survey = await prisma.survey.update({ where: { key: surveyData.id }, data: { result: surveyData.data as any, finished: true, available: false } })

    // Revalidate the cache async to make sure the data is up to date, if we do this directly the page refreshes which should not happen.

    revalidateTag('survey')
    revalidateTag('surveys')

    return survey
  } catch (e) {
    // We can add postgres errors here by code and throw nice errors
    throw e
  }
})
