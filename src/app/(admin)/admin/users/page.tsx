import NewUser from '@/app/(admin)/admin/users/new-user'
import UserItems from '@/app/(admin)/admin/users/user-items'
import prisma from '@/db/db'

export default async function Page() {
  const users = await prisma.user.findMany()

  return (
    <main className='flex min-h-screen justify-center items-center mx-2 my-4'>
      <div className='bg-base-200 rounded-3xl py-6 min-h-[400px] min-w-[450px] flex flex-col text-slate-800 p-2'>
        <h1 className='font-title text-lg [text-wrap:balance] sm:text-3xl xl:text-5xlr'>Gebruikers</h1>
        <div className='flex justify-end'>
          <NewUser />
        </div>

        <ul className='px-6'>
          <UserItems users={users} />
        </ul>
      </div>
    </main>
  )
}
