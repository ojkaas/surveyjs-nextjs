'use server'

import { weightedDiagnoseSchema } from '@/app/(shadcn)/(admin)/admin/survey-definitions/link-diagnoses/[id]/_data/schema'
import prisma from '@/db/db'
import { authAdminAction } from '@/lib/safe-actions'
import { revalidateTag } from 'next/cache'

export const upsertWeightedDiagnose = authAdminAction(weightedDiagnoseSchema, async (weightedDiagnose) => {
  try {
    const weightedDiagnoseResult = await prisma.weightedDiagnose.upsert({
      where: { unique_survey_answer_diagnose: { diagnoseId: weightedDiagnose.diagnose_id, surveyAnswerId: weightedDiagnose.answer_id } },
      update: { weight: weightedDiagnose.weight },
      create: { diagnoseId: weightedDiagnose.diagnose_id, surveyAnswerId: weightedDiagnose.answer_id, weight: weightedDiagnose.weight },
    })

    revalidateTag('survey-definitions')
    revalidateTag('active-survey')
    revalidateTag('weighted-diagnoses')
    return weightedDiagnoseResult
  } catch (e) {
    // We can add postgres errors here by code and throw nice errors
    throw e
  }
})
