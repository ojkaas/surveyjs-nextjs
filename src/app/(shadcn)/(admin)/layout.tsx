import AdminHeader from '@/components/shared/AdminHeader'
import '../globals.css'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <section>
        <AdminHeader />
        <div className='mx-auto min-h-[75vh] max-w-[1920px]'>{children}</div>
      </section>
    </>
  )
}
