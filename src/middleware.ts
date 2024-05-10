import { Role } from '@prisma/client'
import { User } from 'next-auth'
import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

/*
export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const requestForNextAuth = {
    headers: {
      cookie: req.headers.get('cookie'),
    },
  }

  const resSession = await fetch(process.env.NEXTAUTH_URL + '/api/auth/session', {
    headers: {
      'Content-Type': 'application/json',
      Cookie: req.headers.get('cookie') || '',
    },
    method: 'GET',
  })

  // the user is not logged in, redirect to the sign-in page
  const signInPage = '/sign-in'
  const signInUrl = new URL(signInPage, req.nextUrl.origin)

  try {
    const session = await resSession.json()
    if (session && Object.keys(session).length > 0) {
      if (req.url.includes('/logged-in')) {
        // validate your session here
        if (session.user.role === Role.ADMIN) {
          return NextResponse.redirect(new URL('/admin', req.url))
        }
        if (session.user.role === Role.PORTAL) {
          return NextResponse.redirect(new URL('/portal', req.url))
        }
      }
      return NextResponse.next()
    } else {
      signInUrl.searchParams.append('callbackUrl', req.url)
      return NextResponse.redirect(signInUrl)
    }
  } catch (error) {
    return NextResponse.redirect(signInUrl)
  }
}*/

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
