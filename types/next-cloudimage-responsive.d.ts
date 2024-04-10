import { ReactNode } from 'react'

declare module 'next-cloudimage-responsive' {
  export interface CloudimageProviderProps {
    token: string
    domain?: string
    baseURL?: string
    lazyLoading?: boolean
    responsive?: boolean
    responsiveDebounce?: number
    responsiveSizes?: number[]
    responsiveWidths?: number[]
    cache?: boolean
    cacheExpiration?: number
    cacheBusting?: boolean
    cacheInvalidate?: boolean
    cacheClearURLs?: string[]
    attributes?: Record<string, string>
    children?: ReactNode
  }

  export const CloudimageProvider: React.FC<CloudimageProviderProps>

  export interface ImgProps {
    src: string
    alt?: string
    width?: number
    height?: number
    className?: string
    style?: React.CSSProperties
    attributes?: Record<string, string>
  }

  export const Img: React.FC<ImgProps>
}
