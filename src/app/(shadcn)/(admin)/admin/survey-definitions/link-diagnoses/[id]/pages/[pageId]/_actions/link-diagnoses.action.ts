'use server'

import { linkDiagnoseSchema } from '@/app/(shadcn)/(admin)/admin/survey-definitions/link-diagnoses/[id]/pages/[pageId]/_data/schema'
import prisma from '@/db/db'
import { authAdminAction } from '@/lib/safe-actions'
import { revalidateTag } from 'next/cache'

type DiagnoseRef = {
  id: string
}

export const linkDiagnosesAction = authAdminAction(linkDiagnoseSchema, async (linkDiagnoses) => {
  try {
    const diagnoseIdObjs = linkDiagnoses.diagnoses.map((diagnose: DiagnoseRef) => ({ id: diagnose.id }))
    const diagnoseIds = linkDiagnoses.diagnoses.map((diagnose: DiagnoseRef) => diagnose.id)

    const oldPage = await prisma.surveyPage.findUniqueOrThrow({ where: { id: linkDiagnoses.pageId }, include: { activeDiagnoses: true } })
    const oldDiagnoseIds = oldPage.activeDiagnoses.map((diagnose) => diagnose.id)
    const removeDiagnoseIds = oldDiagnoseIds.filter((diagnose) => !diagnoseIds.includes(diagnose))

    //remove all current linked diagnoses
    await prisma.surveyPage.update({ where: { id: linkDiagnoses.pageId }, data: { activeDiagnoses: { set: [] } } })

    //remove all weighted diagnoses for diagnoses that are removed
    await prisma.weightedDiagnose.deleteMany({ where: { surveyAnswer: { surveyQuestion: { pageId: linkDiagnoses.pageId } }, diagnoseId: { in: removeDiagnoseIds } } })

    //link the new diagnoses
    const linkDiagnoseResult = await prisma.surveyPage.update({ where: { id: linkDiagnoses.pageId }, data: { activeDiagnoses: { connect: diagnoseIdObjs } } })

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
