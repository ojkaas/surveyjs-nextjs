import UserMenu from '@/components/shared/user-menu'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
  Links: React.ReactElement
}

/*
<AdminLinks className='transition-colors hover:text-white' />
<AdminLinks className='text-gray-400 hover:text-white' />
*/

const LinkHeader = ({ Links }: Props) => {
  return (
    <header className='top-0 flex h-16 items-center gap-4 border-b bg-gray-900 px-4 md:px-6'>
      <nav className='hidden flex-col gap-6 text-lg font-medium text-gray-400 md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6'>
        <Link href='#'>
          <Image src={'/oogned.png'} priority={true} className='h-auto max-w-screen-md' alt='Oogned logo' width={200} height={50} />
        </Link>
        {React.isValidElement(Links) && <Links.type {...(Links.props as object)} />}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button className='shrink-0 md:hidden' size='icon' variant='outline'>
            <HamburgerMenuIcon className='h-5 w-5 text-gray-400' />
            <span className='sr-only'>Toggle navigatie menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side='left' className='bg-gray-700'>
          <nav className='grid gap-6 text-lg font-medium'>
            <Link className='flex items-center gap-2 text-lg font-semibold text-white md:text-base' href='#'>
              <Image src={'/oogned.png'} priority={true} className='h-auto' alt='Oogned logo' width={200} height={50} />
            </Link>
            {React.isValidElement(Links) && <Links.type {...(Links.props as object)} />}
          </nav>
        </SheetContent>
      </Sheet>
      <Link href='#' className='shrink-0 md:hidden'>
        <Image src={'/oogned.png'} priority={true} className='h-auto max-w-screen-md' alt='Oogned logo' width={200} height={50} />
      </Link>
      <div className='flex justify-end w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4'>
        <UserMenu />
      </div>
    </header>
  )
}

export default LinkHeader
