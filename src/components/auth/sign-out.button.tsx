'use client'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { signOut } from 'next-auth/react'

type Props = {}

const SignOutButton = (props: Props) => {
  return (
    <DropdownMenuItem className='text-gray-400 hover:text-white' onClick={() => signOut({ redirect: true, callbackUrl: '/' })}>
      Uitloggen
    </DropdownMenuItem>
  )
}

export default SignOutButton
