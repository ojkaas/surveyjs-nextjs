'use server'

import { updateDiagnosisSchema } from '@/app/(shadcn)/(admin)/admin/diagnoses/data/schema'
import prisma from '@/db/db'
import { authAction } from '@/lib/safe-actions'
import { revalidateTag } from 'next/cache'

export const updateDiagnosis = authAction(updateDiagnosisSchema, async (data) => {
  try {
    const user = await prisma.user.update({ where: { id: data.id }, data })
    revalidateTag('diagnoses')
    return user
  } catch (e) {
    throw e
  }
})
