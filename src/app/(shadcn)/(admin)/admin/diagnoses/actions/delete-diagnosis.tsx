'use server'
import 'server-only'

import { deleteDiagnosisSchema } from '@/app/(shadcn)/(admin)/admin/diagnoses/data/schema'
import prisma from '@/db/db'
import { ServerActionError } from '@/lib/action-error'
import { authAdminAction } from '@/lib/safe-actions'
import { Prisma } from '@prisma/client'
import { revalidateTag } from 'next/cache'

export const deleteDiagnosisAction = authAdminAction(deleteDiagnosisSchema, async (diagnoseData) => {
  try {
    const diagnose = await prisma.diagnoses.delete({ where: { id: diagnoseData.id } })
    revalidateTag('diagnoses')
    return diagnose
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2003') {
        throw new ServerActionError('Diagnose is gekoppeld aan een vragenlijst, kan niet verwijderd worden!')
      }
    }
    throw e
  }
})
