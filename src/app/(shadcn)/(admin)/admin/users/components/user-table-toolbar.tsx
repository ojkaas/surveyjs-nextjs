'use client'

import { Cross2Icon, PlusIcon } from '@radix-ui/react-icons'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { DataTableToolbarProps } from '@/components/data-table/data-table'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { useState } from 'react'

import { UserForm } from '@/app/(shadcn)/(admin)/admin/users/components/user-form'
import { DataTableFacetedFilter } from '@/components/data-table/data-table-faceted-filter'
import { DataTableViewOptions } from '@/components/data-table/data-table-view-options'
import { roles } from '../data/data'

export function UserTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  const [newUserDialogOpen, setNewUserDialogOpen] = useState(false)

  const closeNewUserDialog = () => {
    setNewUserDialogOpen(false)
  }

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 items-center space-x-2'>
        <Dialog open={newUserDialogOpen} onOpenChange={setNewUserDialogOpen}>
          <DialogTrigger asChild>
            <Button className='h-8 px-2 lg:px-3'>
              <PlusIcon className='lg:mr-2 h-4 w-4' /> <span className='hidden lg:block'>Gebruiker toevoegen</span>
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <UserForm closeDialog={closeNewUserDialog} />
          </DialogContent>
        </Dialog>
        <Input
          placeholder='Filter gebruikers...'
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
          className='h-8 w-[150px] lg:w-[250px]'
        />
        {table.getColumn('role') && <DataTableFacetedFilter column={table.getColumn('role')} title='Rol' options={roles} />}
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
