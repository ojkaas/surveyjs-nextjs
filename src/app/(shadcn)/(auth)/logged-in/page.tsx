'use client'
import { useSession } from 'next-auth/react'

type Props = {}

const Page = (props: Props) => {
  const { data: session, status } = useSession()

  if (status === 'authenticated') {
    return <p>Signed in as {session.user.email}</p>
  }

  return <div>page</div>
}

export default Page
