'use client'

import { restoreSurveyData, saveSurveyDataLocally, saveSurveyToDatabase } from '@/components/shared/SurveyHelper'
import { JsonValue } from '@prisma/client/runtime/library'
import { useEffect, useState } from 'react'
import { CompleteEvent, Model } from 'survey-core'
import 'survey-core/defaultV2.css'
import { Survey } from 'survey-react-ui'
//import { json } from '../../data/survey_json.js'

type Props = {
  json: JsonValue
  definitionId: string
  id: string
  onComplete?: () => void
}

export default function SurveyComponent(props: Props) {
  let [model, setModel] = useState<Model | undefined>()
  const { id, json, definitionId, onComplete } = props
  const SSR = typeof window === 'undefined'

  useEffect(() => {
    // Check if we already have a model and if props haven't changed
    const surveyModel = model || new Model(json)
    restoreSurveyData(surveyModel)
    surveyModel.onValueChanged.add(saveSurveyDataLocally)
    surveyModel.onCurrentPageChanged.add(saveSurveyDataLocally)

    surveyModel.onComplete.add((sender: Model, options: CompleteEvent) => {
      saveSurveyToDatabase(sender, options, id, definitionId)
      // Notify parent component that survey was completed
      if (onComplete) {
        onComplete()
      }
    })
    setModel(surveyModel)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, json, definitionId, onComplete])

  return (
    <>
      {!SSR && model && (
        <div style={{ width: '100%' }}>
          <Survey model={model} />
        </div>
      )}
    </>
  )
}
