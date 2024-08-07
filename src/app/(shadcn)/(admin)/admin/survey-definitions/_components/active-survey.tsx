import CopySurveyButton from '@/app/(shadcn)/(admin)/admin/survey-definitions/_components/copy-survery-button'
import { SurveyDefinitionWithCount } from '@/app/(shadcn)/(admin)/admin/survey-definitions/page'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileIcon, Pencil2Icon } from '@radix-ui/react-icons'
import { DateTime } from 'luxon'
import Link from 'next/link'

type Props = {
  activeSurveyDefinition: SurveyDefinitionWithCount
}

export const ActiveSurveyDefinition = ({ activeSurveyDefinition }: Props) => {
  //Weird that i have to do this, do not understand why...
  const updatedAt = new Date(activeSurveyDefinition.updatedAt)

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className='grid gap-1 sm:grid-flow-col sm:grid-cols-2'>
            <div className='flex items-center space-x-1'>
              <span>Huidige actieve vragenlijst</span>
            </div>
            <div className='items-center justify-end space-x-1 text-sm text-gray-500 hidden md:flex'>
              <span className='font-medium'>Laatst aangepast:</span>
              <time dateTime={updatedAt.toISOString()}>{updatedAt ? DateTime.fromJSDate(updatedAt).toRelative({ locale: 'nl' }) : '-'}</time>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-2'>
          <div className='flex items-center space-x-2'>
            <FileIcon className='h-6 w-6' />
            <h1 className='text-2xl font-bold tracking-tighter'>{activeSurveyDefinition.name}</h1>
          </div>
          <div className='grid gap-1 sm:grid-flow-col sm:grid-cols-2'>
            <div className='flex items-center space-x-1 text-sm text-gray-500'>
              <span className='font-medium'>Versie:</span>
              <span>{activeSurveyDefinition.version}</span>
            </div>
          </div>
          <div className='grid gap-1 sm:grid-flow-col sm:grid-cols-2'>
            <div className='flex items-center space-x-1 text-sm text-gray-500'>
              <span className='font-medium'>Aangemaakt door:</span>
              <span>{activeSurveyDefinition.createdBy}</span>
            </div>
          </div>
          <div className='grid gap-1 sm:grid-flow-col sm:grid-cols-2'>
            <div className='flex items-center space-x-1 text-sm text-gray-500'>
              <span className='font-medium'>Notities:</span>
              <span>{activeSurveyDefinition.notes}</span>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-2 md:flex-row md:gap-4 mt-4'>
          <Button variant={'outline'} asChild>
            <Link href={`/admin/survey-definitions/creator/${activeSurveyDefinition.id}`}>
              <Pencil2Icon className='mr-2 h-4 w-4' /> <span>Wijzig in Creator</span>
            </Link>
          </Button>
          <Button variant={'outline'} disabled={!activeSurveyDefinition.questionCount || activeSurveyDefinition.questionCount <= 0} asChild>
            <Link href={`/admin/survey-definitions/link-diagnoses/${activeSurveyDefinition.id}`}>
              <Pencil2Icon className='mr-2 h-4 w-4' /> <span>Diagnose koppelen</span>
            </Link>
          </Button>
          <CopySurveyButton surveyDefinition={activeSurveyDefinition} />
        </div>
      </CardContent>
    </Card>
  )
}
