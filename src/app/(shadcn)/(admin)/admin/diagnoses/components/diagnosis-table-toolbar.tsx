'use client'

import { Cross2Icon, PlusIcon } from '@radix-ui/react-icons'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { DataTableToolbarProps } from '@/components/data-table/data-table'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useState } from 'react'

import { DiagnosisForm } from '@/app/(shadcn)/(admin)/admin/diagnoses/components/diagnosis-form'
import { personsToContact } from '@/app/(shadcn)/(admin)/admin/diagnoses/data/data'
import { DataTableFacetedFilter } from '@/components/data-table/data-table-faceted-filter'
import { DataTableViewOptions } from '@/components/data-table/data-table-view-options'

export function DiagnosisTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  const [newDiagnosisDialogOpen, setNewDiagnosisDialogOpen] = useState(false)

  const closeNewDiagnosisDialog = () => {
    setNewDiagnosisDialogOpen(false)
  }

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 items-center space-x-2'>
        <Dialog open={newDiagnosisDialogOpen} onOpenChange={setNewDiagnosisDialogOpen}>
          <DialogTrigger asChild>
            <Button className='h-8 px-2 lg:px-3'>
              <PlusIcon className='lg:mr-2 h-4 w-4' /> <span className='hidden lg:block'>Diagnose toevoegen</span>
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px] md:max-w-[820px]'>
            <DialogTitle>Diagnose toevoegen</DialogTitle>
            <DiagnosisForm closeDialog={closeNewDiagnosisDialog} />
          </DialogContent>
        </Dialog>
        <Input
          placeholder='Filter diagnoses...'
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
          className='h-8 w-[150px] lg:w-[250px]'
        />
        {table.getColumn('personToContact') && <DataTableFacetedFilter column={table.getColumn('personToContact')} title='Contactpersoon' options={personsToContact} />}
        {isFiltered && (
          <Button variant='ghost' onClick={() => table.resetColumnFilters()} className='h-8 px-2 lg:px-3'>
            Ongedaan maken
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
