import { Metadata } from 'next'

import prisma from '@/db/db'
import { unstable_cache } from 'next/cache'

import { diagnosisColumns } from '@/app/(shadcn)/(admin)/admin/diagnoses/components/diagnosis-columns'
import { DiagnosisTableToolbar } from '@/app/(shadcn)/(admin)/admin/diagnoses/components/diagnosis-table-toolbar'
import { DataTable } from '@/components/data-table/data-table'

export const metadata: Metadata = {
  title: 'Users',
  description: 'A screen to edit users',
}

const getDiagnosis = unstable_cache(async () => prisma.diagnoses.findMany(), ['all-diagnoses'], { tags: ['diagnoses'] })

export default async function DiagnosisPage() {
  const diagnosis = await getDiagnosis()

  const filteredDiagnosis = diagnosis.map((item) => ({
    ...item,
    description: item.description || '', // Set description to an empty string if it is null
  }))

  return (
    <>
      <div className='h-full flex-1 flex-col space-y-8 p-8 flex'>
        <div className='flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Gebruikers</h2>
            <p className='text-muted-foreground text-xs'>Huidige lijst van gebruikers.</p>
          </div>
        </div>
        <DataTable data={diagnosis} columns={diagnosisColumns} toolbar={DiagnosisTableToolbar} />
      </div>
    </>
  )
}
