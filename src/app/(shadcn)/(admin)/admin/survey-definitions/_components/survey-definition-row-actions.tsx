'use client'

import { DotsHorizontalIcon } from '@radix-ui/react-icons'

import { deleteSurveyDefinitionAction } from '@/app/(shadcn)/(admin)/admin/survey-definitions/_actions/delete-survey-definition'
import ActivateSurvey from '@/app/(shadcn)/(admin)/admin/survey-definitions/_components/activate-survey'
import { SurveyDefinitionForm } from '@/app/(shadcn)/(admin)/admin/survey-definitions/_components/survey-definition-form'
import { Json, SurveyDefinition } from '@/app/(shadcn)/(admin)/admin/survey-definitions/_data/schema'
import { DataTableRowActionsProps } from '@/components/data-table/data-table'
import { Button } from '@/components/ui/button'
import { MultiDialog } from '@/components/ui/custom/multi-dialog'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { toastifyActionResponse } from '@/lib/toastify-action-response'
import Link from 'next/link'
import { useState } from 'react'
import { SurveyPDF } from 'survey-pdf'

type Modals = 'edit' | 'delete' | 'activate' // or enum

export function SurveyDefinitionTableRowActions({ row }: DataTableRowActionsProps<SurveyDefinition>) {
  const [rowActionOpens, setRowActionOpens] = useState(false)

  const closeRowActions = () => {
    setRowActionOpens(false)
  }

  const deleteSurveyDefinition = async (id: string, afterDelete: () => void) => {
    const actionPromise = deleteSurveyDefinitionAction({ id })
    toastifyActionResponse(actionPromise, {
      loadingMessage: 'Vragenlijst verwijderen...',
      successMessage(data) {
        return `Vragenlijst "${data.name}" verwijderd!`
      },
    })
    closeRowActions()
    afterDelete()
  }

  const downloadPdf = async (data: Json) => {
    // Download PDF
    const pdf = new SurveyPDF(data, {})
    pdf.showInvisibleElements = true
    pdf.showPageNumbers = true
    pdf.save()
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
              <DropdownMenuItem asChild>
                <Link href={`/admin/survey-definitions/creator/${row.original.id}`}>Open in Creator</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild disabled={!row.original.questionCount || row.original.questionCount <= 0}>
                <Link href={`/admin/survey-definitions/link-diagnoses/${row.original.id}`}>Diagnose koppelen</Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled={!row.original.questionCount || row.original.questionCount <= 0}
                onClick={() => {
                  downloadPdf(row.original.data)
                }}
              >
                PDF Downloaden
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
                  <DialogContent>
                    <SurveyDefinitionForm
                      closeDialog={() => {
                        mdb.closeDialog('edit')
                        closeRowActions()
                      }}
                      editMode
                      surveyDefinition={row.original}
                    />
                  </DialogContent>
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
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Verwijder vragenlijst</DialogTitle>
                      <DialogDescription>Let op! Dit zal de gekozen vragenlijst verwijderen!</DialogDescription>
                    </DialogHeader>
                    <div>
                      <div className='gap-4 mt-4'>
                        <Button
                          variant='destructive'
                          onClick={() => {
                            deleteSurveyDefinition(row.original.id, () => mdb.closeDialog('delete'))
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
