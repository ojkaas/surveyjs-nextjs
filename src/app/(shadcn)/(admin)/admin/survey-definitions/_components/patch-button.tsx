'use client'
import { patchSurveyDefinitions } from '@/app/(shadcn)/(admin)/admin/survey-definitions/_actions/update-survey-definition'
import { Button } from '@/components/ui/button'

type Props = {}

export const PatchButton = (props: Props) => {
  return (
    <Button
      variant='default'
      onClick={() => {
        patchSurveyDefinitions({})
      }}
    >
      Patch SurveyDefinition Data
    </Button>
  )
}
