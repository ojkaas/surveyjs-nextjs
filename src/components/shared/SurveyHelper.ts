import { Model } from 'survey-core'

const storageItemKey = 'oogned-survey'

export function saveSurveyData(survey: Model) {
  const data = survey.data
  data.pageNo = survey.currentPageNo
  window.localStorage.setItem(storageItemKey, JSON.stringify(data))
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
