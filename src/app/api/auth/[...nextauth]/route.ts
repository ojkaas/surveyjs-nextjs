import { authOptions } from '@/lib/config/auth/auth-options'
import NextAuth from 'next-auth/next'

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

