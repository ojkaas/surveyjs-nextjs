'use client'
import { patchSurveyDefinitions } from '@/app/(shadcn)/(admin)/admin/survey-definitions/_actions/update-survey-definition'
import { Button } from '@/components/ui/button'
import { toastifyActionResponse } from '@/lib/toastify-action-response'

type Props = {}

function patchAction() {
  const actionPromise = patchSurveyDefinitions({})
  toastifyActionResponse(actionPromise, {
    loadingMessage: 'Patching SurveyDefinition data...',
    successMessage() {
      return `Patched!`
    },
  })
}

export const PatchButton = (props: Props) => {
  return (
    <Button variant='default' onClick={patchAction}>
      Patch SurveyDefinition Data
    </Button>
  )
}
