import type { NextFetchEvent, NextRequest } from 'next/server'
import { getSession } from 'next-auth/react'
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { IncomingMessage } from 'http'

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const requestForNextAuth = {
    headers: {
      cookie: req.headers.get('cookie'),
    },
  }

  //const session = await getServerSession({ req: { ...requestForNextAuth, headers: { cookie: req.headers.get('cookie') || undefined } } }
  const resSession = await fetch(process.env.NEXTAUTH_URL + '/api/auth/session', {
    headers: {
      'Content-Type': 'application/json',
      Cookie: req.headers.get('cookie') || '',
    },
    method: 'GET',
  })
  const session = await resSession.json()

  console.log('session', session)
  if (session) {
    if (req.url.includes('/logged-in')) {
      // validate your session here
      if (session.user.role === 'admin') {
        return NextResponse.redirect(new URL('/admin', req.url))
      }
      if (session.user.role === 'portal') {
        return NextResponse.redirect(new URL('/portal', req.url))
      }
    }
    return NextResponse.next()
  } else {
    // the user is not logged in, redirect to the sign-in page
    const signInPage = '/sign-in'
    const signInUrl = new URL(signInPage, req.nextUrl.origin)
    signInUrl.searchParams.append('callbackUrl', req.url)
    return NextResponse.redirect(signInUrl)
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/logged-in/:path*', '/admin/:path*', '/portal/:path*'],
}
