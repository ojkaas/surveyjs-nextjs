'use client'

import { DotsHorizontalIcon } from '@radix-ui/react-icons'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

import { UserForm } from '@/app/(shadcn)/(admin)/admin/users/components/user-form'
import { User } from '@/app/(shadcn)/(admin)/admin/users/data/schema'
import { DataTableRowActionsProps } from '@/components/data-table/data-table'
import { MultiDialog } from '@/components/ui/custom/multi-dialog'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useState } from 'react'

type Modals = 'edit' | 'delete' | 'deactivate' // or enum

export function UserTableRowActions({ row }: DataTableRowActionsProps<User>) {
  const [rowActionOpens, setRowActionOpens] = useState(false)

  const closeRowActions = () => {
    setRowActionOpens(false)
  }
  return (
    <DropdownMenu open={rowActionOpens} onOpenChange={setRowActionOpens}>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'>
          <DotsHorizontalIcon className='h-4 w-4' />
          <span className='sr-only'>Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[160px]'>
        <MultiDialog<Modals>>
          {(mdb) => (
            <>
              <mdb.Trigger value='edit'>
                <DropdownMenuItem>Wijzigen</DropdownMenuItem>
              </mdb.Trigger>
              <mdb.Trigger value='deactivate'>
                <DropdownMenuItem>Deactiveren</DropdownMenuItem>
              </mdb.Trigger>
              <DropdownMenuSeparator />
              <mdb.Trigger value='delete'>
                <DropdownMenuItem>Verwijderen</DropdownMenuItem>
              </mdb.Trigger>
              <mdb.Container value='edit'>
                <Dialog>
                  <DialogContent>
                    <UserForm
                      closeDialog={() => {
                        mdb.closeDialog('edit')
                        closeRowActions()
                      }}
                      editMode
                      user={row.original}
                    />
                  </DialogContent>
                </Dialog>
              </mdb.Container>
              <mdb.Container value='deactivate'>
                <Dialog>
                  <DialogContent>EDIT FORM CONTENT</DialogContent>
                </Dialog>
              </mdb.Container>
              <mdb.Container value='delete'>
                <Dialog>
                  <DialogContent>DELETE CONTENT</DialogContent>
                </Dialog>
              </mdb.Container>
            </>
          )}
        </MultiDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
