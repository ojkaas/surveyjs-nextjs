import LinkHeader from '@/components/shared/link-header'
import PortalLinks from '@/components/shared/portal.links'
import '../globals.css'

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <section>
        <LinkHeader Links={<PortalLinks className='transition-colors hover:text-white' />} />
        <div className='mx-auto min-h-[75vh] max-w-[1920px]'>{children}</div>
      </section>
    </>
  )
}
