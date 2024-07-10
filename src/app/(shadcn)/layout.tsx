import Provider from '@/components/providers/Provider'
import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'
import './globals.css'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'OogNed',
  description: 'OogNed - Een symptoon hulp website voor oogziektes en aandoeningen.',
  metadataBase: new URL('https://www.oogned.nl/'),
  openGraph: {
    type: 'website',
    title: 'OogNed',
    siteName: 'OogNed',
    description: 'OogNed - Een symptoon hulp website voor oogziektes en aandoeningen.',
    url: 'https://www.oogned.nl/',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <Provider>
        <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
          <NextTopLoader color='#425b6b' showSpinner={false} />
          <div className='h-screen'>{children}</div>
          <Toaster />
          <SpeedInsights />
          <Analytics />
        </body>
      </Provider>
    </html>
  )
}
