'use server'

import { updateDiagnosisSchema } from '@/app/(shadcn)/(admin)/admin/diagnoses/data/schema'
import prisma from '@/db/db'
import { ServerActionError } from '@/lib/action-error'
import { RevalidationHelper } from '@/lib/cache/revalidation.helper'
import { authAdminAction } from '@/lib/safe-actions'
import { Prisma } from '@prisma/client'

export const updateDiagnosis = authAdminAction.schema(updateDiagnosisSchema).action(async ({ parsedInput: data }) => {
  try {
    const diagnose = await prisma.diagnoses.update({ where: { id: data.id }, data })
    RevalidationHelper.revalidateDiagnoses()
    return diagnose
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        throw new ServerActionError('Diagnose met zelfde naam bestaat al!')
      }
    }
    throw e
  }
})
