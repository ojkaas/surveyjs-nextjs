import AdminLinks from '@/components/shared/admin.links'
import LinkHeader from '@/components/shared/link-header'
import '../globals.css'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <section>
        <LinkHeader Links={<AdminLinks className='transition-colors hover:text-white' />} />
        <div className='mx-auto min-h-[75vh] max-w-[1920px]'>{children}</div>
      </section>
    </>
  )
}
