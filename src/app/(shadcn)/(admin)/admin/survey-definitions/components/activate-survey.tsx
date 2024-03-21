import { activateSurveyDefinition } from '@/app/(shadcn)/(admin)/admin/survey-definitions/actions/update-survey-definition'
import { SurveyDefinition, activateSurveyDefinitionSchema } from '@/app/(shadcn)/(admin)/admin/survey-definitions/data/schema'
import { Button } from '@/components/ui/button'
import { toastifyActionResponse } from '@/lib/toastify-action-response'
import { z } from 'zod'

type Props = {
  surveyDefintion: SurveyDefinition
  closeDialog: () => void
}

const ActivateSurvey = ({ closeDialog, surveyDefintion }: Props) => {
  const onSubmit = async (data: z.infer<typeof activateSurveyDefinitionSchema>) => {
    const actionPromise = activateSurveyDefinition(data)
    const successMessageCallback = (data: { name: string | null }) => `Vragenlijst '${data.name}' geactiveerd!`
    toastifyActionResponse(actionPromise, { loadingMessage: 'Vragenlijst activeren...', successMessage: successMessageCallback })
    closeDialog()
  }
  return (
    <Button
      type='button'
      onClick={() => {
        onSubmit({ id: surveyDefintion.id })
      }}
    >
      Vragenlijst activeren
    </Button>
  )
}

export default ActivateSurvey
