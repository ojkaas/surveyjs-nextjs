'use server'

import { userIdSchema } from '@/app/(shadcn)/(admin)/admin/users/data/schema'
import prisma from '@/db/db'
import { authAction } from '@/lib/safe-actions'

export const deleteUser = authAction(userIdSchema, async (userData) => {
  try {
    const user = await prisma.user.delete({ where: { id: userData.id } })
    return user
  } catch (e) {
    throw e
  }
})
