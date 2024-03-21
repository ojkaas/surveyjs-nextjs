'use client'

import { DotsHorizontalIcon } from '@radix-ui/react-icons'

import ActivateSurvey from '@/app/(shadcn)/(admin)/admin/survey-definitions/components/activate-survey'
import { SurveyDefinition } from '@/app/(shadcn)/(admin)/admin/survey-definitions/data/schema'
import { DataTableRowActionsProps } from '@/components/data-table/data-table'
import { Button } from '@/components/ui/button'
import { MultiDialog } from '@/components/ui/custom/multi-dialog'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { useState } from 'react'

type Modals = 'edit' | 'delete' | 'activate' // or enum

export function SurveyDefinitionTableRowActions({ row }: DataTableRowActionsProps<SurveyDefinition>) {
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
              <DropdownMenuItem asChild>
                <Link href={`/admin/survey-definitions/creator/${row.original.id}`}>Open in Creator</Link>
              </DropdownMenuItem>
              <mdb.Trigger value='activate'>
                <DropdownMenuItem>Activeren</DropdownMenuItem>
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
              <mdb.Container value='activate'>
                <Dialog>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Activeer vragenlijst</DialogTitle>
                      <DialogDescription>Let op! Dit zal de huidige vragenlijst deactiveren, en de geselecteerde vragenlijst actief maken voor alle gebruikers!</DialogDescription>
                    </DialogHeader>
                    <ActivateSurvey
                      surveyDefintion={row.original}
                      closeDialog={() => {
                        mdb.closeDialog('activate')
                        closeRowActions()
                      }}
                    />
                  </DialogContent>
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
