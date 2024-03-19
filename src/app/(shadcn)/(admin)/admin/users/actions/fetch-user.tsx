'use server'

import { userIdSchema } from '@/app/(shadcn)/(admin)/admin/users/data/schema'
import prisma from '@/db/db'
import { action } from '@/lib/safe-actions'

export const fetchUser = action(userIdSchema, async (userData) => {
  try {
    const user = await prisma.user.findFirstOrThrow({ where: { id: userData.id } })
    return user
  } catch (e) {
    throw e
  }
})
