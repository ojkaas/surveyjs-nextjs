'use client'

import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Row } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

import { MultiDialog } from '@/components/ui/custom/multi-dialog'
import { Dialog, DialogContent } from '@/components/ui/dialog'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

type Modals = 'edit' | 'delete' | 'deactivate' // or enum

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
  return (
    <DropdownMenu>
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
                  <DialogContent>EDIT FORM CONTENT</DialogContent>
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
