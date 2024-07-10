import { Metadata } from 'next'

import prisma from '@/db/db'
import { unstable_cache } from 'next/cache'

import { UserTableToolbar } from '@/app/(shadcn)/(admin)/admin/users/components/user-table-toolbar'
import { DataTable } from '@/components/data-table/data-table'
import { userColumns } from './components/user-columns'

export const metadata: Metadata = {
  title: 'Users',
  description: 'A screen to edit users',
}

const getUsers = unstable_cache(async () => prisma.user.findMany(), ['all-users'], { tags: ['users'] })

export default async function UserPage() {
  const users = await getUsers()

  return (
    <>
      <div className='h-full container flex-1 flex-col space-y-8 p-8 flex'>
        <div className='flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Gebruikers</h2>
            <p className='text-muted-foreground text-xs'>Huidige lijst van gebruikers.</p>
          </div>
        </div>
        <DataTable data={users} columns={userColumns} toolbar={UserTableToolbar} />
      </div>
    </>
  )
}
