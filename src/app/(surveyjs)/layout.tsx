import Provider from '@/components/providers/Provider'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import './globals.css'

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
        <body className={'min-h-screen h-screen bg-background font-sans antialiased'}>
          <div className='h-screen'>{children}</div>
          <SpeedInsights />
          <Analytics />
        </body>
      </Provider>
    </html>
  )
}
