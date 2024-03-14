import { Metadata } from 'next'

import prisma from '@/db/db'
import { columns } from './components/columns'
import { DataTable } from './components/data-table'

export const metadata: Metadata = {
  title: 'Users',
  description: 'A screen to edit users',
}

async function getUsers() {
  return prisma.user.findMany()
}

export default async function TaskPage() {
  const users = await getUsers()

  return (
    <>
      <div className='h-full flex-1 flex-col space-y-8 p-8 flex'>
        <div className='flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Gebruikers</h2>
            <p className='text-muted-foreground'>Huidige lijst van gebruikers.</p>
          </div>
        </div>
        <DataTable data={users} columns={columns} />
      </div>
    </>
  )
}
