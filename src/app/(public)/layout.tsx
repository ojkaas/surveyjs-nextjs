import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import { Roboto_Flex } from 'next/font/google'
import '../globals.css'
import Header from '@/components/shared/Header'

const inter = Roboto_Flex({ subsets: ['latin'] })

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
      <body className={`${inter.className} antialiased`}>
        <div className='h-screen'>
          <Header />
          <div className='mx-auto min-h-[75vh] max-w-[1920px]'>{children}</div>
        </div>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
