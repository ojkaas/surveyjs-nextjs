'use client'
import { ValidationResponse } from '@/components/forms/validate-and-execute.button'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { FC } from 'react'

interface Props {
  validationResult: ValidationResponse | undefined
  showModal: boolean
  setShowModal: (show: boolean) => void
  executeAction: () => any
}

const ValidationDialog: FC<Props> = ({ showModal, validationResult, setShowModal, executeAction }) => {
  return (
    <>
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className='sm:max-w-[625px]'>
          <DialogHeader>
            <DialogTitle>{validationResult?.title}</DialogTitle>
            <DialogDescription className='py-2'>{validationResult?.message}</DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4 max-h-[60vh] overflow-y-scroll'>
            {validationResult?.detailedErrors?.map((error, index) => (
              <div key={index} className='grid grid-cols-[25px_1fr] items-start gap-4'>
                <ExclamationTriangleIcon className='h-5 w-5 text-red-500' />
                <div className='space-y-1'>
                  <p className='text-sm text-gray-500 dark:text-gray-400'>{error}</p>
                </div>
              </div>
            ))}
          </div>
          <DialogFooter>
            {validationResult?.status === 'warning' && (
              <>
                <Button onClick={() => setShowModal(false)} variant='outline' className='mr-2'>
                  Annuleren
                </Button>
                <Button onClick={executeAction}>Doorgaan</Button>
              </>
            )}
            {validationResult?.status === 'error' && <Button onClick={() => setShowModal(false)}>Sluiten</Button>}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ValidationDialog
