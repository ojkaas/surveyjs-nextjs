'use client'
import { SurveyDefinitionForm } from '@/app/(shadcn)/(admin)/admin/survey-definitions/_components/survey-definition-form'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { SurveyDefinition } from '@prisma/client'
import { useState } from 'react'

type Props = {
  surveyDefinition: SurveyDefinition
}

const CopySurveyButton = ({ surveyDefinition }: Props) => {
  const [dialogOpen, setDialogOpen] = useState(false)

  const closeDialog = () => {
    setDialogOpen(false)
  }
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <PencilSquareIcon className='mr-2 h-4 w-4' /> <span>Kopieer naar nieuwe versie</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <SurveyDefinitionForm copyMode surveyDefinition={{ ...surveyDefinition, data: surveyDefinition.data as any }} closeDialog={closeDialog} />
      </DialogContent>
    </Dialog>
  )
}

export default CopySurveyButton
