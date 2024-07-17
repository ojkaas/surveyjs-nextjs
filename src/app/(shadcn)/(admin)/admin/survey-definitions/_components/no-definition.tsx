'use client'
import { SurveyDefinitionForm } from '@/app/(shadcn)/(admin)/admin/survey-definitions/_components/survey-definition-form'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { PlusCircledIcon } from '@radix-ui/react-icons'
import { useState } from 'react'

type Props = {}

const NoDefinitionComponent = (props: Props) => {
  const [dialogOpen, setDialogOpen] = useState(false)

  const closeDialog = () => {
    setDialogOpen(false)
  }

  return (
    <div className='flex items-center justify-center p-8'>
      <div className='w-full max-w-3xl space-y-8'>
        <div>
          <div className='flex flex-col items-center space-y-4'>
            <div className='text-center space-y-2'>
              <h2 className='text-lg font-medium leading-6'>Geen vragenlijst beschikbaar</h2>
              <p className='text-sm text-gray-500 dark:text-gray-400'>Je hebt nog geen vragenlijst aangemaakt. Begin met het maken van je eerste vragenlijst.</p>
            </div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button size='lg'>
                  <PlusCircledIcon className='lg:mr-2 h-4 w-4' /> <span>Maak vragenlijst aan.</span>
                </Button>
              </DialogTrigger>
              <DialogContent className='sm:max-w-[425px]'>
                <SurveyDefinitionForm closeDialog={closeDialog} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoDefinitionComponent
