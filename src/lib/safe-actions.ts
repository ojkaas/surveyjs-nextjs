import { ServerActionError } from '@/lib/action-error'
import { authOptions } from '@/lib/config/auth/auth-options'
import { Role } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { DEFAULT_SERVER_ERROR, createSafeActionClient } from 'next-safe-action'

export const authAdminAction = createSafeActionClient({
  // If you need to access validated input, you can use `parsedInput` how you want
  // in your middleware. Please note that `parsedInput` is typed any, as it
  // comes from an action, while middleware is an (optional) instance function.
  // Can also be a non async function.
  async middleware(parsedInput) {
    const session = await getServerSession(authOptions)

    if (!session) {
      throw new Error('Session not found!')
    }

    if (!session.user.role && session.user.role !== Role.ADMIN) {
      throw new Error('No access!')
    }

    return {}
  },
  handleReturnedServerError(e) {
    if (e instanceof ServerActionError) {
      return e.message
    }
    return DEFAULT_SERVER_ERROR
  },
  handleServerErrorLog(e) {},
})

export const authPortalAction = createSafeActionClient({
  // If you need to access validated input, you can use `parsedInput` how you want
  // in your middleware. Please note that `parsedInput` is typed any, as it
  // comes from an action, while middleware is an (optional) instance function.
  // Can also be a non async function.
  async middleware(parsedInput) {
    const session = await getServerSession(authOptions)

    if (!session) {
      throw new Error('Session not found!')
    }

    if (!session.user.role && session.user.role !== Role.PORTAL) {
      throw new Error('No access!')
    }

    return { bla: true }
  },
  handleReturnedServerError(e) {
    if (e instanceof ServerActionError) {
      return e.message
    }
    return DEFAULT_SERVER_ERROR
  },
  handleServerErrorLog(e) {},
})

export const action = createSafeActionClient()
