import PortalHeader from '@/components/shared/portal.header'
import '../globals.css'

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <section>
        <PortalHeader />
        <div className='mx-auto min-h-[75vh] max-w-[1920px]'>{children}</div>
      </section>
    </>
  )
}
