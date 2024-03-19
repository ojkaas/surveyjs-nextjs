'use server'

import { createDiagnosisSchema } from '@/app/(shadcn)/(admin)/admin/diagnoses/data/schema'
import prisma from '@/db/db'
import { ServerActionError } from '@/lib/action-error'
import { authAction } from '@/lib/safe-actions'
import { Prisma } from '@prisma/client'
import { revalidateTag } from 'next/cache'

export const createDiagnosis = authAction(createDiagnosisSchema, async (data) => {
  try {
    const user = await prisma.diagnoses.create({ data })
    revalidateTag('diagnoses')
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
