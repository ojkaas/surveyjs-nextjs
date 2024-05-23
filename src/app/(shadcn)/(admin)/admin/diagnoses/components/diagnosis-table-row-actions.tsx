'use client'

import { DotsHorizontalIcon } from '@radix-ui/react-icons'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

import { deleteDiagnosisAction } from '@/app/(shadcn)/(admin)/admin/diagnoses/actions/delete-diagnosis'
import { DiagnosisForm } from '@/app/(shadcn)/(admin)/admin/diagnoses/components/diagnosis-form'
import { Diagnosis } from '@/app/(shadcn)/(admin)/admin/diagnoses/data/schema'
import { DataTableRowActionsProps } from '@/components/data-table/data-table'
import { MultiDialog } from '@/components/ui/custom/multi-dialog'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { toastifyActionResponse } from '@/lib/toastify-action-response'
import { useState } from 'react'

type Modals = 'edit' | 'delete' | 'deactivate' // or enum

export function DiagnosisTableRowActions({ row }: DataTableRowActionsProps<Diagnosis>) {
  const [rowActionOpens, setRowActionOpens] = useState(false)

  const closeRowActions = () => {
    setRowActionOpens(false)
  }

  const deleteDiagnosis = async (id: string, afterDelete: () => void) => {
    const actionPromise = deleteDiagnosisAction({ id })
    toastifyActionResponse(actionPromise, {
      loadingMessage: 'Diagnose verwijderen...',
      successMessage(data) {
        return `Diagnose "${data.name}" verwijderd!`
      },
    })
    closeRowActions()
    afterDelete()
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
              <mdb.Trigger value='edit'>
                <DropdownMenuItem>Wijzigen</DropdownMenuItem>
              </mdb.Trigger>
              <DropdownMenuSeparator />
              <mdb.Trigger value='delete'>
                <DropdownMenuItem>Verwijderen</DropdownMenuItem>
              </mdb.Trigger>
              <mdb.Container value='edit'>
                <Dialog>
                  <DialogContent>
                    <DiagnosisForm
                      closeDialog={() => {
                        mdb.closeDialog('edit')
                        closeRowActions()
                      }}
                      editMode
                      diagnosis={row.original}
                    />
                  </DialogContent>
                </Dialog>
              </mdb.Container>
              <mdb.Container value='delete'>
                <Dialog>
                  <DialogContent>
                    <div>
                      <h3 className='text-md font-bold'>Weet je zeker dat je deze diagnose wilt verwijderen?</h3>
                      <div className='gap-4 mt-4'>
                        <Button
                          variant='destructive'
                          onClick={() => {
                            deleteDiagnosis(row.original.id, () => mdb.closeDialog('delete'))
                          }}
                        >
                          Verwijderen
                        </Button>
                        <Button variant='link' onClick={() => mdb.closeDialog('delete')}>
                          Annuleren
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </mdb.Container>
            </>
          )}
        </MultiDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
