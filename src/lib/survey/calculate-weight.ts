import { SurveyDefinitionWithWeigthedDiagnosis } from '@/app/(shadcn)/(portal)/portal/vragenlijsten/[id]/resultaten/page'
import { Page, Question, SurveyJson } from '@/lib/surveyjs/types'
import { Diagnoses, SurveyQuestion, SurveyQuestionOption } from '@prisma/client'

//Calculate the total weight of the survey answers, based on the definition
export function calculateWeight(survey: SurveyJson, definition: SurveyDefinitionWithWeigthedDiagnosis) {
  if (!definition.surveyDefinition) return { total: 0, weights: [] }
  let totalWeight: { weight: number; diagnose: Diagnoses }[] = []
  const allQuestions = definition.surveyDefinition.pages.flatMap((page) => page.questions)
  survey.pages.forEach((page: Page) => {
    if (!page.elements) return
    page.elements.forEach((question: Question) => {
      const definitionQuestion = allQuestions.find((defQuestion: SurveyQuestion) => defQuestion.question === question.name)

      if (definitionQuestion) {
        let answer = question.answer

        if (answer) {
          const weightedDiagnosis = definitionQuestion.answers.find((answerOption: SurveyQuestionOption) => answerOption.answer === answer)

          if (weightedDiagnosis) {
            weightedDiagnosis.weightedDiagnoses.forEach((weightedDiagnoses) => {
              if (totalWeight.find((w) => w.diagnose.id === weightedDiagnoses.diagnose.id)) {
                totalWeight.find((w) => w.diagnose.id === weightedDiagnoses.diagnose.id)!.weight += weightedDiagnoses.weight
              } else {
                totalWeight.push({ weight: weightedDiagnoses.weight, diagnose: weightedDiagnoses.diagnose })
              }
            })
          }
        }
      }
    })
  })

  totalWeight = totalWeight.sort((a, b) => b.weight - a.weight)
  const absoluteTotalWeight = totalWeight.reduce((total, curr) => total + Math.abs(curr.weight), 0)

  return { weights: totalWeight, total: absoluteTotalWeight }
}
