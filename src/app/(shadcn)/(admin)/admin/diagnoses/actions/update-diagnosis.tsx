'use server'

import { updateDiagnosisSchema } from '@/app/(shadcn)/(admin)/admin/diagnoses/data/schema'
import prisma from '@/db/db'
import { authAdminAction } from '@/lib/safe-actions'
import { revalidateTag } from 'next/cache'

export const updateDiagnosis = authAdminAction(updateDiagnosisSchema, async (data) => {
  try {
    const user = await prisma.user.update({ where: { id: data.id }, data })
    revalidateTag('diagnoses')
    return user
  } catch (e) {
    throw e
  }
})
