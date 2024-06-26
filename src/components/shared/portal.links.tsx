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

const PortalLinks = ({ className }: Props) => {
  const pathname = usePathname()

  return (
    <>
      <Link className={cn(className, ifActiveHighlight('/portal/vragenlijsten', pathname))} href='/portal/vragenlijsten'>
        Vragenlijsten
      </Link>
    </>
  )
}

export default PortalLinks
