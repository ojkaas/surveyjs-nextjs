import LinkHeader from '@/components/shared/link-header'
import PublicLinks from '@/components/shared/public.links'
import '../globals.css'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <LinkHeader Links={<PublicLinks className='transition-colors hover:text-white whitespace-nowrap' />} />
      <div className='mx-auto min-h-[75vh] max-w-[1920px]'>{children}</div>
    </section>
  )
}
