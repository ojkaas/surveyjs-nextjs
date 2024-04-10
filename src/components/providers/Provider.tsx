'use client'

import { SessionProvider } from 'next-auth/react'
import { CloudimageProvider } from 'next-cloudimage-responsive'

const Provider = ({ children }: { children: React.ReactNode }) => {
  const cloudimageConfig = {
    token: 'clzjyyuyna',
    ssr: true,
    doNotReplaceURL: true,
  }

  return (
    <CloudimageProvider config={cloudimageConfig}>
      <SessionProvider>{children}</SessionProvider>
    </CloudimageProvider>
  )
}

export default Provider
