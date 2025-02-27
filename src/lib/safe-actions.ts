import { ServerActionError } from '@/lib/action-error'
import { authOptions } from '@/lib/config/auth/auth-options'
import { Role } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { DEFAULT_SERVER_ERROR_MESSAGE, createSafeActionClient } from 'next-safe-action'

// Base action client with common error handling
export const actionClient = createSafeActionClient({
  handleServerError(e) {
    if (e instanceof ServerActionError) {
      return e.message
    }
    return DEFAULT_SERVER_ERROR_MESSAGE
  },
})

// Admin auth middleware
export const authAdminAction = actionClient.use(async ({ next }) => {
  const session = await getServerSession(authOptions)

  if (!session) {
    throw new Error('Session not found!')
  }

  if (!session.user.role && session.user.role !== Role.ADMIN) {
    throw new Error('No access!')
  }

  return next({})
})

// Portal auth middleware
export const authPortalAction = actionClient.use(async ({ next }) => {
  const session = await getServerSession(authOptions)

  if (!session) {
    throw new Error('Session not found!')
  }

  if (!session.user.role && session.user.role !== Role.PORTAL) {
    throw new Error('No access!')
  }

  return next({ ctx: { bla: true } })
})

// Public action client (no middleware)
export const publicAction = actionClient
