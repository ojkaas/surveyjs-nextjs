'use client'

import { DotsHorizontalIcon } from '@radix-ui/react-icons'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

import { Survey } from '@/app/(shadcn)/(portal)/portal/vragenlijsten/data/schema'
import { DataTableRowActionsProps } from '@/components/data-table/data-table'
import { MultiDialog } from '@/components/ui/custom/multi-dialog'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import Link from 'next/link'
import { useState } from 'react'

type Modals = 'view' | 'delete' // or enum

export function SurveyTableRowActions({ row }: DataTableRowActionsProps<Survey>) {
  const [rowActionOpens, setRowActionOpens] = useState(false)

  const closeRowActions = () => {
    setRowActionOpens(false)
  }

  const closeRowIfDialogClosed = (open: boolean) => {
    if (open) {
      closeRowActions()
    }
  }

  return (
    <DropdownMenu modal={false} open={rowActionOpens} onOpenChange={setRowActionOpens}>
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
              <DropdownMenuItem disabled={!row.getValue('finished')}>
                <Link href={`/portal/vragenlijsten/${row.original.id}/resultaten`} rel='noopener noreferrer' target='_blank'>
                  Bekijk resultaten
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <mdb.Trigger value='delete'>
                <DropdownMenuItem>Verwijderen</DropdownMenuItem>
              </mdb.Trigger>
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
