'use client'

import { restoreSurveyData, saveSurveyData } from '@/components/shared/SurveyHelper'
import { useEffect, useState } from 'react'
import { Model } from 'survey-core'
import 'survey-core/defaultV2.css'
import { Survey } from 'survey-react-ui'
import { json } from '../../data/survey_json.js'

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
    console.log('SurveyComponent mounted')
    console.log('CSS: ', surveyModel.css)
  }, [])

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
