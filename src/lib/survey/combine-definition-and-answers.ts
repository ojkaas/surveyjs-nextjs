import { isObjectChoice } from '@/lib/survey/create-or-update-definition-data'
import { Page, Question, SurveyJson, SurveyResultJson } from '@/lib/surveyjs/types'

//funtion that combines the definition and answers
export function combineDefinitionAndAnswers(surveyDefinition: SurveyJson, surveyAnswers: SurveyResultJson): SurveyJson {
  const survey: SurveyJson = JSON.parse(JSON.stringify(surveyDefinition))

  survey.pages = survey.pages
    .map((page: Page) => {
      if (!page.elements) return null

      const elementsWithAnswers = page.elements.filter((question: Question) => {
        if (surveyAnswers.hasOwnProperty(question.name)) {
          question.answer = surveyAnswers[question.name]
          if (question.type === 'boolean') {
            question.answerText = question.answer ? 'Ja' : 'Nee'
            // Ja / Nee are the answers registered in the database for boolean questions
            question.answer = question.answerText
          }
          if (question.type === 'radiogroup' || question.type === 'dropdown' || question.type == 'imagepicker' || question.type == 'rating') {
            question.choices?.forEach((choice) => {
              if (isObjectChoice(choice)) {
                if (choice.value === question.answer) {
                  question.answer = choice.text
                  question.answerText = choice.text
                }
              }
            })
          }

          if (question.type === 'checkbox') {
            const answers = question.answer as string[]
            const selectedChoices: string[] = []

            question.choices?.forEach((choice) => {
              if (isObjectChoice(choice)) {
                if (answers.includes(choice.value)) {
                  selectedChoices.push(choice.text)
                }
              }
            })

            if (selectedChoices.length > 0) {
              question.answerText = selectedChoices.join(', ')
            }
          }

          return true
        }
        return false
      })

      if (elementsWithAnswers.length === 0) return null

      return { ...page, elements: elementsWithAnswers }
    })
    .filter((page: Page | null) => page !== null) as Page[]

  return survey
}
