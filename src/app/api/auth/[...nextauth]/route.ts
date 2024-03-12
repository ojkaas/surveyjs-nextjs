import PostgresAdapter from '@auth/pg-adapter'
import { AuthOptions } from 'next-auth'
import { Adapter, AdapterUser } from 'next-auth/adapters'
import NextAuth from 'next-auth/next'
import EmailProvider from 'next-auth/providers/email'
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
})

const authOptions: AuthOptions = {
  adapter: PostgresAdapter(pool) as Adapter,
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    signIn({ user }) {
      console.log('signIn: ', JSON.stringify(user))
      return Boolean((user as AdapterUser).emailVerified)
    },
  },
  pages: {
    signIn: '/sign-in',
  },
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
