'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

// Create a client component that uses useSearchParams
function ErrorContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const errorMessages: Record<string, string> = {
    EmailSignin: 'Er ging iets mis bij het versturen van de inloglink. Probeer het opnieuw.',
    AccessDenied: 'Je hebt geen toegang tot deze pagina.',
    Callback: 'Er ging iets mis tijdens het inloggen.',
    OAuthSignin: 'Er ging iets mis bij het inloggen met deze provider.',
    OAuthCallback: 'Er ging iets mis bij het inloggen met deze provider.',
    OAuthCreateAccount: 'Er ging iets mis bij het aanmaken van je account.',
    EmailCreateAccount: 'Er ging iets mis bij het aanmaken van je account.',
    default: 'Er ging iets mis bij het inloggen.',
  }

  const errorMessage = error ? errorMessages[error] || errorMessages.default : errorMessages.default

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-center'>Fout bij inloggen</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <p className='text-center'>{errorMessage}</p>
        <Button asChild className='w-full'>
          <Link href='/sign-in'>Terug naar inloggen</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

// Main page component that uses Suspense
export default function AuthError() {
  return (
    <main className='flex min-h-[93dvh] h-full items-center justify-center bg-gray-100 px-4 py-12 dark:bg-gray-950'>
      <div className='mx-auto w-full max-w-md md:max-w-xl space-y-6'>
        <Suspense
          fallback={
            <Card>
              <CardHeader>
                <CardTitle className='text-center'>Laden...</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <p className='text-center'>Even geduld...</p>
              </CardContent>
            </Card>
          }
        >
          <ErrorContent />
        </Suspense>
      </div>
    </main>
  )
}
