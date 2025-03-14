import { CustomsendVerificationRequest } from '@/app/api/auth/[...nextauth]/signinemail'
import prisma from '@/db/db'
import { RevalidationHelper } from '@/lib/cache/revalidation.helper'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { Role } from '@prisma/client'
import { AuthOptions } from 'next-auth'
import { Adapter, AdapterUser } from 'next-auth/adapters'
import EmailProvider from 'next-auth/providers/email'

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: parseInt(process.env.EMAIL_SERVER_PORT ?? ''),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      async sendVerificationRequest({ identifier, url, provider, expires, token, theme }) {
        await CustomsendVerificationRequest({ identifier, url, provider, expires, token, theme })
      },
    }),
  ],
  callbacks: {
    signIn({ user }) {
      if (user.role === Role.ADMIN || user.role === Role.PORTAL) {
        RevalidationHelper.revalidateAll()
        return true
      }
      return Boolean((user as AdapterUser).emailVerified)
    },
    jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.type = user.type
        token.uid = user.id
      }
      return token
    },
    session({ session, token }) {
      if (session && session.user) {
        session.user.role = token.role //  Add role value to user object so it is passed along with session
        session.user.id = token.sub
        session.user.type = token.type
      }
      return session
    },
  },
  pages: {
    signIn: '/sign-in',
    verifyRequest: '/verify-request',
    error: '/error',
  },
  session: {
    strategy: 'jwt',
  },
  jwt: {
    //secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
}
