import 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      role: string
      type: string
    } & DefaultSession['user']
  }

  interface User {
    role: string
    type: string
  }
}
