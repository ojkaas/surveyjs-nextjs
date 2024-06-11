'use server'

import { userIdSchema } from '@/app/(shadcn)/(admin)/admin/users/data/schema'
import prisma from '@/db/db'
import { RevalidationHelper } from '@/lib/cache/revalidation.helper'
import { authAdminAction } from '@/lib/safe-actions'

export const deleteUserAction = authAdminAction(userIdSchema, async (userData) => {
  try {
    const user = await prisma.user.delete({ where: { id: userData.id } })
    RevalidationHelper.revalidateUsers()
    return user
  } catch (e) {
    throw e
  }
})
