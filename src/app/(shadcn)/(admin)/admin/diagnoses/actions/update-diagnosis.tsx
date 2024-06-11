'use server'

import { updateDiagnosisSchema } from '@/app/(shadcn)/(admin)/admin/diagnoses/data/schema'
import prisma from '@/db/db'
import { RevalidationHelper } from '@/lib/cache/revalidation.helper'
import { authAdminAction } from '@/lib/safe-actions'

export const updateDiagnosis = authAdminAction(updateDiagnosisSchema, async (data) => {
  try {
    const diagnose = await prisma.diagnoses.update({ where: { id: data.id }, data })
    RevalidationHelper.revalidateDiagnoses()
    return diagnose
  } catch (e) {
    throw e
  }
})
