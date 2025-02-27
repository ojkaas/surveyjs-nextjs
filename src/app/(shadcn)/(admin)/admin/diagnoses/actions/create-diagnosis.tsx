'use server'

import { createDiagnosisSchema } from '@/app/(shadcn)/(admin)/admin/diagnoses/data/schema'
import prisma from '@/db/db'
import { ServerActionError } from '@/lib/action-error'
import { RevalidationHelper } from '@/lib/cache/revalidation.helper'
import { authAdminAction } from '@/lib/safe-actions'
import { Prisma } from '@prisma/client'

export const createDiagnosis = authAdminAction.schema(createDiagnosisSchema).action(async ({ parsedInput: data }) => {
  try {
    const user = await prisma.diagnoses.create({ data })
    RevalidationHelper.revalidateDiagnoses()

    return user
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        throw new ServerActionError('Diagnose met zelfde naam bestaat al!')
      }
    }
    throw e
  }
})
