'use client'

import { Model } from 'survey-core'
import { Survey } from 'survey-react-ui'
import 'survey-core/defaultV2.css'
import { json } from '../../data/survey_json.js'
import { useEffect, useState } from 'react'
import { restoreSurveyData, saveSurveyData } from '@/components/shared/SurveyHelper'

export default function SurveyComponent() {
  let [model, setModel] = useState<Model | undefined>()

  const SSR = typeof window === 'undefined'

  useEffect(() => {
    const surveyModel = new Model(json)
    restoreSurveyData(surveyModel)
    surveyModel.onValueChanged.add(saveSurveyData)
    surveyModel.onCurrentPageChanged.add(saveSurveyData)
    surveyModel.onScrollingElementToTop.add(function (sender, options) {
      //options.cancel = true
    })
    setModel(surveyModel)
  }, [])

  return (
    <>
      {!SSR && model && (
        <div style={{ height: '90vh', width: '100%' }}>
          <Survey model={model} />
        </div>
      )}
    </>
  )
}
