'use server'

import { linkDiagnoseSchema } from '@/app/(shadcn)/(admin)/admin/survey-definitions/link-diagnoses/[id]/pages/[pageId]/_data/schema'
import prisma from '@/db/db'
import { authAdminAction } from '@/lib/safe-actions'
import { revalidateTag } from 'next/cache'

export const linkDiagnosesAction = authAdminAction(linkDiagnoseSchema, async (linkDiagnoses) => {
  try {
    const diagnoseIds = (linkDiagnoses.diagnoses = linkDiagnoses.diagnoses.map((diagnose) => ({ id: diagnose.id })))
    //remove all current linked diagnoses
    await prisma.surveyPage.update({ where: { id: linkDiagnoses.pageId }, data: { activeDiagnoses: { disconnect: [] } } })
    //link the new diagnoses
    const linkDiagnoseResult = await prisma.surveyPage.update({ where: { id: linkDiagnoses.pageId }, data: { activeDiagnoses: { connect: diagnoseIds } } })
    revalidateTag('survey-definitions')
    revalidateTag('active-survey')
    revalidateTag('weighted-diagnoses')
    revalidateTag('survey-page')
    revalidateTag('survey-question')
    return linkDiagnoseResult
  } catch (e) {
    // We can add postgres errors here by code and throw nice errors
    throw e
  }
})
