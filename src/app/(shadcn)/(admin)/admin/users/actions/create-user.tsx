'use server'

import { createUserSchema } from '@/app/(shadcn)/(admin)/admin/users/data/schema'
import prisma from '@/db/db'
import { ServerActionError } from '@/lib/action-error'
import { authAdminAction } from '@/lib/safe-actions'
import { Prisma } from '@prisma/client'
import { revalidateTag } from 'next/cache'

export const createUser = authAdminAction(createUserSchema, async (userData) => {
  try {
    const user = await prisma.user.create({ data: userData })
    revalidateTag('users')
    return user
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === 'P2002') {
        throw new ServerActionError('Gebruiker met zelfde email adres bestaat al!')
      }
    }
    throw e
  }
})
