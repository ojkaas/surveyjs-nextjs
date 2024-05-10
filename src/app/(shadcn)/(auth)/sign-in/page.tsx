'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signIn } from 'next-auth/react'
import { useState } from 'react'

export default function Signin() {
  const [email, setEmail] = useState('')

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      signIn('email', { email, callbackUrl: '/logged-in' })
    }
  }

  return (
    <main className='flex min-h-[93dvh] h-full items-center justify-center bg-gray-100 px-4 py-12 dark:bg-gray-950'>
      <div className='mx-auto w-full max-w-md md:max-w-xl space-y-6'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl'>Inloggen</h1>
          <p className='mt-2 text-gray-500 dark:text-gray-400'>Als u een account heeft bij Oogned.nl kunt u hier een inlog link aanvragen.</p>
        </div>
        <Card>
          <CardContent className='space-y-4'>
            <form className='space-y-4'>
              <div className='grid gap-1.5 mt-5'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={handleKeyDown} // Add the onKeyDown event handler
                  id='email'
                  placeholder='mijn@email.nl'
                  required
                  type='email'
                />
              </div>
              <Button onClick={() => signIn('email', { email, callbackUrl: '/logged-in' })} className='w-full' type='button'>
                Email link aanvragen
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
