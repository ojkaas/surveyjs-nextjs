'use client'
import { retrieveSurveyDefinitionAction } from '@/app/(shadcn)/(admin)/admin/survey-definitions/creator/[id]/_actions/retrieve-definition.action'
import DiagnoseResultList from '@/app/(shadcn)/(portal)/portal/vragenlijsten/[id]/resultaten/_components/diagnose.list'
import { SurveyCreatorWidget } from '@/components/SurveyCreator'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { calculateWeight } from '@/lib/survey/calculate-weight'
import { combineDefinitionAndAnswers } from '@/lib/survey/combine-definition-and-answers'
import { SurveyJson, SurveyResultJson } from '@/lib/surveyjs/types'
import { toastifyActionResponse } from '@/lib/toastify-action-response'
import { SurveyDefinitionData } from '@prisma/client'
import { useCallback, useState } from 'react'

type Props = {
  id: string
  surveyDefinitionData: SurveyDefinitionData
}

type WeigtedDiagnoses = { total: number; weights: { weight: number; minMaxNormalizedWeight: number; softMaxNormalizedWeight: number; zScore: number; diagnose: { name: string } }[] }

const CreatorWrapper = ({ surveyDefinitionData, id }: Props) => {
  const [open, setOpen] = useState(false)
  const [results, setResults] = useState<WeigtedDiagnoses | null>(null)
  const [openChanges, setOpenChanges] = useState(false)

  const openDiagnoseDialog = useCallback(
    async (survey: string, openChanges: boolean) => {
      setOpenChanges(openChanges)

      const answers = survey as SurveyResultJson
      const questionsWithAnswers = combineDefinitionAndAnswers(surveyDefinitionData.jsonData as SurveyJson, answers)
      const actionPromise = retrieveSurveyDefinitionAction({ id })
      toastifyActionResponse(actionPromise, { loadingMessage: 'Mogelijke diagnoses berekenen', successMessage: () => 'Diagnoses berekend' })

      const retrieveResult = await actionPromise
      if (retrieveResult.serverError || retrieveResult.validationErrors) throw new Error('Error while retrieving survey definition')
      const calculatedWeights = calculateWeight(questionsWithAnswers, retrieveResult.data!)

      setResults(calculatedWeights)
      setOpen(true)
    },
    [id, surveyDefinitionData.jsonData]
  )

  return (
    <>
      <SurveyCreatorWidget id={id} showDiagnoseCallback={openDiagnoseDialog} json={surveyDefinitionData.jsonData || {}} />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>[TEST] Diagnoses</DialogTitle>
            <DialogDescription>Een overzicht van mogelijke diagnoses gebasseerd op ingevulde testdata.</DialogDescription>
          </DialogHeader>
          {openChanges && <div>Kan diagnoses niet bepalen, zorg ervoor dat alle wijzigingen eerst worden opgeslagen.</div>}
          {!openChanges && <div>{results && <DiagnoseResultList testMode={true} weightedDiagnoses={results} />}</div>}
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CreatorWrapper
