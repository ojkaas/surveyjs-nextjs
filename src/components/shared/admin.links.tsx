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

const AdminLinks = ({ className }: Props) => {
  const pathname = usePathname()

  return (
    <>
      <Link className={cn(className, ifActiveHighlight('/admin/users', pathname))} href='/admin/users'>
        Gebruikers
      </Link>

      <Link className={cn(className, ifActiveHighlight('/admin/survey-definitions', pathname))} href='/admin/survey-definitions'>
        Vragenlijst
      </Link>

      <Link className={cn(className, ifActiveHighlight('/admin/diagnoses', pathname))} href='/admin/diagnoses'>
        Diagnoses
      </Link>

      <Link className={cn(className, ifActiveHighlight('/admin/image-upload', pathname))} href='/admin/image-upload'>
        Afbeeldingen
      </Link>
    </>
  )
}

export default AdminLinks
