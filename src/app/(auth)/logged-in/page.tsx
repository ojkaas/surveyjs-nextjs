'use client'
import { useSession } from 'next-auth/react'
import React from 'react'

type Props = {}

const Page = (props: Props) => {
  const { data: session, status } = useSession()

  console.log('session', JSON.stringify(session))
  console.log('status', status)
  if (status === 'authenticated') {
    return <p>Signed in as {session.user.email}</p>
  }

  return <div>page</div>
}

export default Page
