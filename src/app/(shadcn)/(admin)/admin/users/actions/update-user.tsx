'use server'

import { updateUserSchema } from '@/app/(shadcn)/(admin)/admin/users/data/schema'
import prisma from '@/db/db'
import { authAction } from '@/lib/safe-actions'
import { revalidateTag } from 'next/cache'

export const updateUser = authAction(updateUserSchema, async (userData) => {
  try {
    const user = await prisma.user.update({ where: { id: userData.id }, data: userData })
    revalidateTag('users')
    return user
  } catch (e) {
    throw e
  }
})
