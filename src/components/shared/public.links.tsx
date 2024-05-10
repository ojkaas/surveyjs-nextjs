'use client'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type Props = {
  className?: string
}

function ifActiveHighlight(href: string, pathname: string) {
  return pathname.includes(href) ? 'text-white' : ''
}

const PublicLinks = ({ className }: Props) => {
  const pathname = usePathname()

  return (
    <>
      <Link className={cn(className, ifActiveHighlight('/overons', pathname))} href='/overons'>
        Over ons
      </Link>
      <Link className={cn(className, ifActiveHighlight('/meedoen', pathname))} href='/meedoen'>
        Meedoen
      </Link>
    </>
  )
}

export default PublicLinks
