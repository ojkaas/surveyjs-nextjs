import Header from '@/components/shared/Header'
import '../globals.css'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Header />
      <div className='mx-auto min-h-[75vh] max-w-[1920px]'>{children}</div>
    </section>
  )
}
