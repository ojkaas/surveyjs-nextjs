import { promises as fs } from 'fs'
import { Metadata } from 'next'
import path from 'path'
import { z } from 'zod'

import { columns } from './components/columns'
import { DataTable } from './components/data-table'
import { taskSchema } from './data/schema'

export const metadata: Metadata = {
  title: 'Tasks',
  description: 'A task and issue tracker build using Tanstack Table.',
}

// Simulate a database read for tasks.
async function getTasks() {
  const data = await fs.readFile(path.join(process.cwd(), '/src/app/tasks.json'))

  const tasks = JSON.parse(data.toString())

  return z.array(taskSchema).parse(tasks)
}

export default async function TaskPage() {
  const tasks = await getTasks()

  return (
    <>
      <div className='h-full flex-1 flex-col space-y-8 p-8 flex'>
        <div className='flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Gebruikers</h2>
            <p className='text-muted-foreground'>Huidige lijst van gebruikers.</p>
          </div>
        </div>
        <DataTable data={tasks} columns={columns} />
      </div>
    </>
  )
}
