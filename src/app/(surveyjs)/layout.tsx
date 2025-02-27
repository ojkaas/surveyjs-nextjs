import Provider from '@/components/providers/Provider'

import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import Script from 'next/script'
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
      {process.env.NODE_ENV === 'development' && <Script src='https://unpkg.com/react-scan/dist/auto.global.js' />}
      <Provider>
        <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
          <div className='h-screen'>{children}</div>
          <SpeedInsights />
          <Analytics />
          <Toaster />
        </body>
      </Provider>
    </html>
  )
}
