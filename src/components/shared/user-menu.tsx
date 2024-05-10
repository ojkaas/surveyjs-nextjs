import SignOutButton from '@/components/auth/sign-out.button'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { authOptions } from '@/lib/config/auth/auth-options'
import { Role } from '@prisma/client'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { SVGProps } from 'react'

type Props = {}

const UserMenu = async (props: Props) => {
  const session = await getServerSession(authOptions)
  if (!session) {
    return (
      <Link className='text-gray-400' href='/sign-in'>
        Inloggen
      </Link>
    )
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className='rounded-full' size='icon' variant='secondary'>
            <CircleUserIcon className='h-5 w-5 text-gray-400' />
            <span className='sr-only'>Toggle gebruikers menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel className='text-gray-400'>Mijn Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {session.user?.role === Role.ADMIN && (
            <DropdownMenuItem className='text-gray-400 hover:text-white' asChild>
              <Link href='/admin/survey-definitions'>Beheeromgeving</Link>
            </DropdownMenuItem>
          )}
          {session.user?.role === Role.PORTAL && (
            <DropdownMenuItem className='text-gray-400 hover:text-white' asChild>
              <Link href='/portal/vragenlijsten'>Vragenlijsten</Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <SignOutButton />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

function CircleUserIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
      <circle cx='12' cy='12' r='10' />
      <circle cx='12' cy='10' r='3' />
      <path d='M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662' />
    </svg>
  )
}

export default UserMenu
