import { saveSurveyData } from '@/app/(surveyjs)/(survey)/survey/[key]/actions/save-survey.action'
import { toastifyActionResponse } from '@/lib/toastify-action-response'
import { CompleteEvent, Model, SurveyModel } from 'survey-core'

const storageItemKey = 'oogned-survey'

export function saveSurveyDataLocally(survey: Model) {
  const data = survey.data
  data.pageNo = survey.currentPageNo
  window.localStorage.setItem(storageItemKey, JSON.stringify(data))
}

export async function saveSurveyToDatabase(sender: SurveyModel, options: CompleteEvent, id: string, definitionId: string) {
  //options.showSaveInProgress()
  const resultPromise = saveSurveyData({ id, data: sender.data })

  toastifyActionResponse(resultPromise, { loadingMessage: 'Vragenlijst wordt opgeslagen', successMessage: (data) => 'Vragenlijst is opgeslagen' })

  const result = await resultPromise
  if (result.data) {
    window.localStorage.setItem(storageItemKey, '')
  }
}

export function restoreSurveyData(survey: Model) {
  const storageItemKey = 'oogned-survey'
  const prevData = window.localStorage.getItem(storageItemKey) || null
  if (prevData) {
    const data = JSON.parse(prevData)
    survey.data = data
    if (data.pageNo) {
      survey.currentPageNo = data.pageNo
    }
  }
}
