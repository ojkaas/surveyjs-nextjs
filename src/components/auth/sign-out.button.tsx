'use client'
import { signOut } from 'next-auth/react'

type Props = {}

const SignOutButton = (props: Props) => {
  return (
    <button className='button text-primary-content' onClick={() => signOut({ redirect: true, callbackUrl: '/' })}>
      Afmelden
    </button>
  )
}

export default SignOutButton
