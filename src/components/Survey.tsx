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
}

export default function SurveyComponent(props: Props) {
  let [model, setModel] = useState<Model | undefined>()

  const SSR = typeof window === 'undefined'

  useEffect(() => {
    const surveyModel = new Model(props.json)
    restoreSurveyData(surveyModel)
    surveyModel.onValueChanged.add(saveSurveyDataLocally)
    surveyModel.onCurrentPageChanged.add(saveSurveyDataLocally)

    surveyModel.onComplete.add((sender: Model, options: CompleteEvent) => {
      saveSurveyToDatabase(sender, options, props.id, props.definitionId)
    })
    setModel(surveyModel)
  }, [props.id, props.json, props.definitionId])

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
