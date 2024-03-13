import AdminHeader from '@/components/shared/AdminHeader'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import '../globals.css'
import Provider from '@/components/providers/Provider'
import { cn } from '@/lib/utils'

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
      <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
        <div className='h-screen'>
          <Provider>
            <AdminHeader />
            <div className='mx-auto min-h-[75vh] max-w-[1920px]'>{children}</div>
          </Provider>
        </div>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
