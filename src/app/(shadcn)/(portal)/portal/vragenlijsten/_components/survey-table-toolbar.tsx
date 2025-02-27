'use client'

import { Cross2Icon, EnvelopeOpenIcon, PlusIcon } from '@radix-ui/react-icons'

import { Button } from '@/components/ui/button'

import { DataTableToolbarProps } from '@/components/data-table/data-table'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useState } from 'react'

import { DirectSurveyForm } from '@/app/(shadcn)/(portal)/portal/vragenlijsten/_components/direct-survey-dialog'
import { SurveyForm } from '@/app/(shadcn)/(portal)/portal/vragenlijsten/_components/survey-form'
import { availables, finisheds } from '@/app/(shadcn)/(portal)/portal/vragenlijsten/data/data'
import { DataTableFacetedFilter } from '@/components/data-table/data-table-faceted-filter'
import { DataTableViewOptions } from '@/components/data-table/data-table-view-options'
import { Input } from '@/components/ui/input'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

export function SurveyTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  const [newSurveyDialogOpen, setNewSurveyDialogOpen] = useState(false)
  const [newSurveyDirectDialogOpen, setNewSurveyDirectDialogOpen] = useState(false)

  const closeNewSurveyDialog = () => {
    setNewSurveyDialogOpen(false)
  }

  const closeNewSurveyDirectDialog = () => {
    setNewSurveyDirectDialogOpen(false)
  }

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 items-center space-x-2'>
        <Dialog open={newSurveyDialogOpen} onOpenChange={setNewSurveyDialogOpen}>
          <DialogTrigger asChild>
            <Button className='h-8 px-2 lg:px-3'>
              <EnvelopeOpenIcon className='lg:mr-2 h-4 w-4' /> <span className='hidden lg:block'>Nieuwe uitnodiging versturen</span>
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <VisuallyHidden>
              <DialogTitle>Uitnodiging versturen</DialogTitle>
            </VisuallyHidden>
            <SurveyForm closeDialog={closeNewSurveyDialog} />
          </DialogContent>
        </Dialog>
        <Dialog open={newSurveyDirectDialogOpen} onOpenChange={setNewSurveyDirectDialogOpen}>
          <DialogTrigger asChild>
            <Button className='h-8 px-2 lg:px-3'>
              <PlusIcon className='lg:mr-2 h-4 w-4' /> <span className='hidden lg:block'>Vragenlijst direct aanmaken</span>
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <VisuallyHidden>
              <DialogTitle>Direct vragenlijst aanmaken</DialogTitle>
            </VisuallyHidden>
            <DirectSurveyForm closeDialog={closeNewSurveyDirectDialog} />
          </DialogContent>
        </Dialog>
        <Input
          placeholder='Filter vragenlijsten...'
          value={(table.getColumn('key')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('key')?.setFilterValue(event.target.value)}
          className='h-8 w-[150px] lg:w-[250px]'
        />
        {table.getColumn('available') && <DataTableFacetedFilter column={table.getColumn('available')} title='Beschikbaar' options={availables} />}
        {table.getColumn('finished') && <DataTableFacetedFilter column={table.getColumn('finished')} title='Afgerond' options={finisheds} />}
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
