'use server'
import 'server-only'

import { deleteDiagnosisSchema } from '@/app/(shadcn)/(admin)/admin/diagnoses/data/schema'
import prisma from '@/db/db'
import { authAdminAction } from '@/lib/safe-actions'
import { revalidateTag } from 'next/cache'

export const deleteDiagnosisAction = authAdminAction(deleteDiagnosisSchema, async (diagnoseData) => {
  try {
    const diagnose = await prisma.diagnoses.delete({ where: { id: diagnoseData.id } })
    revalidateTag('diagnoses')
    return diagnose
  } catch (e) {
    throw e
  }
})
