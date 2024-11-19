import { JsonValue } from '@prisma/client/runtime/library'

export type Choice =
  | string
  | {
      value: string
      text: string
      imageLink?: string
    }

export type RateValue = {
  text: string
  value: number
}
export interface Question {
  type: string
  name: string
  html?: string
  title?: string
  isRequired?: boolean
  choices?: Choice[]
  rateValues?: RateValue[]
  visibleIf?: string
  showSelectAllItem?: boolean
  rateCount?: number
  selectAllText?: string
  labelTrue?: string
  labelFalse?: string
  swapOrder?: boolean
  imageFit?: string
  answer?: ItemValue
  answerText?: string
  weight?: number
}

export interface Page {
  name: string
  elements: Question[]
  title: string
  visibleIf?: string
}

export type SurveyJson = JsonValue & {
  title: string
  completedHtml: string
  completedBeforeHtml: string
  loadingHtml: string
  pages?: Page[]
  showProgressBar: string
  progressBarShowPageTitles: boolean
  startSurveyText: string
  pagePrevText: string
  pageNextText: string
  completeText: string
  firstPageIsStarted: boolean
}

export type ItemValue = string | boolean | string[] | boolean[]

export type SurveyResultJson = JsonValue & {
  [key: string]: ItemValue
}
