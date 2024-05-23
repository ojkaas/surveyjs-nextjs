'use client'

import { DotsHorizontalIcon } from '@radix-ui/react-icons'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

import { deleteUserAction } from '@/app/(shadcn)/(admin)/admin/users/actions/delete-user'
import { UserForm } from '@/app/(shadcn)/(admin)/admin/users/components/user-form'
import { User } from '@/app/(shadcn)/(admin)/admin/users/data/schema'
import { DataTableRowActionsProps } from '@/components/data-table/data-table'
import { MultiDialog } from '@/components/ui/custom/multi-dialog'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { toastifyActionResponse } from '@/lib/toastify-action-response'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

type Modals = 'edit' | 'delete' | 'deactivate' // or enum

export function UserTableRowActions({ row }: DataTableRowActionsProps<User>) {
  const { data: session, status } = useSession()
  const [rowActionOpens, setRowActionOpens] = useState(false)
  let userId = '0'
  if (status === 'authenticated' && session?.user?.id) {
    userId = session.user.id
  }

  const closeRowActions = () => {
    setRowActionOpens(false)
  }

  const deleteUser = async (id: string, afterDelete: () => void) => {
    const actionPromise = deleteUserAction({ id })
    toastifyActionResponse(actionPromise, {
      loadingMessage: 'Gebruiker verwijderen...',
      successMessage(data) {
        return `Gebruiker "${data.name}" verwijderd!`
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
              <mdb.Trigger value='deactivate'>
                <DropdownMenuItem disabled={true}>Deactiveren</DropdownMenuItem>
              </mdb.Trigger>
              <DropdownMenuSeparator />
              <mdb.Trigger value='delete'>
                <DropdownMenuItem disabled={userId === row.original.id}>Verwijderen</DropdownMenuItem>
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
                  <DialogContent>Deze functie is not niet geimplementeerd!</DialogContent>
                </Dialog>
              </mdb.Container>
              <mdb.Container value='delete'>
                <Dialog>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Verwijder gebruiker</DialogTitle>
                      <DialogDescription>Let op! Dit zal de gekozen gebruiker verwijderen!</DialogDescription>
                    </DialogHeader>
                    <div>
                      <div className='gap-4 mt-4'>
                        <Button
                          variant='destructive'
                          onClick={() => {
                            deleteUser(row.original.id, () => mdb.closeDialog('delete'))
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
