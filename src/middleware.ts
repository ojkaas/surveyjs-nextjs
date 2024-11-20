import { Role } from '@prisma/client'
import { User } from 'next-auth'
import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    if (req.url.includes('/logged-in')) {
      // validate your session here
      const user = req.nextauth.token as unknown as User
      if (user.role === Role.ADMIN) {
        return NextResponse.redirect(new URL('/admin/survey-definitions', req.url))
      }
      if (user.role === Role.PORTAL) {
        return NextResponse.redirect(new URL('/portal/vragenlijsten', req.url))
      }
    }
  },
  {
    callbacks: {
      authorized: async ({ req, token }) => {
        const user = token as unknown as User
        if (!user) return false

        if (req.url.includes('/admin')) {
          return user.role === Role.ADMIN
        }
        if (req.url.includes('/portal')) {
          return user.role === Role.PORTAL
        }
        if (req.url.includes('/logged-in')) {
          return user.role === Role.ADMIN || user.role === Role.PORTAL
        }

        return false
      },
    },
  }
)
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/logged-in/:path*', '/admin/:path*', '/portal/:path*'],
}
