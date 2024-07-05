import { Page, Question, SurveyJson } from '@/lib/surveyjs/types'
import { SurveyDefinitionWithAllDetails } from '@/lib/types/prisma/prisma.types'
import { Diagnoses, SurveyQuestion, SurveyQuestionOption } from '@prisma/client'

type WeigthedDiagnose = {
  diagnose: Diagnoses
  weight: number
  minMaxNormalizedWeight?: number
  softMaxNormalizedWeight?: number
  zScore?: number
}

type WeigthedDiagnoseWithCalculations = {
  diagnose: Diagnoses
  weight: number
  minMaxNormalizedWeight: number
  softMaxNormalizedWeight: number
  zScore: number
}

//Calculate the total weight of the survey answers, based on the definition
export function calculateWeight(survey: SurveyJson, definition: SurveyDefinitionWithAllDetails | null) {
  if (!definition) return { total: 0, weights: [] }
  let totalWeight: { weight: number; diagnose: Diagnoses }[] = []
  const allQuestions = definition.pages.flatMap((page) => page.questions)
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

  //const weightedDiagnoses: WeigthedDiagnose[] = totalWeight.map((w) => ({ ...w, diagnose: w.diagnose, weight: w.weight }))
  const minMaxNormalizedDiagnoses = calculateConfidenceMinMax(totalWeight)
  const softMaxNormalizedDiagnoses = calculateConfidenceSoftmax(minMaxNormalizedDiagnoses)
  const zScoreNormalizedDiagnoses = calculateConfidenceZScores(softMaxNormalizedDiagnoses)

  return { weights: zScoreNormalizedDiagnoses as WeigthedDiagnoseWithCalculations[], total: absoluteTotalWeight }
}

function minMaxNormalization(diagnoses: WeigthedDiagnose[]): WeigthedDiagnose[] {
  const weights = diagnoses.map((d) => d.weight)
  const min = Math.min(...weights)
  const max = Math.max(...weights)

  return diagnoses.map((d) => ({
    ...d,
    minMaxNormalizedWeight: (d.weight - min) / (max - min),
  }))
}

function calculateConfidenceMinMax(diagnoses: WeigthedDiagnose[]): WeigthedDiagnose[] {
  const normalizedDiagnoses = minMaxNormalization(diagnoses)
  return normalizedDiagnoses.map((d) => ({
    ...d,
    minMaxNormalizedWeight: d.minMaxNormalizedWeight! * 100,
  }))
}

function softmaxNormalization(diagnoses: WeigthedDiagnose[]): WeigthedDiagnose[] {
  const weights = diagnoses.map((d) => d.weight)
  const expWeights = weights.map((weight) => Math.exp(weight))
  const sumExpWeights = expWeights.reduce((a, b) => a + b, 0)

  return diagnoses.map((d, i) => ({
    ...d,
    softMaxNormalizedWeight: expWeights[i] / sumExpWeights,
  }))
}

function calculateConfidenceSoftmax(diagnoses: WeigthedDiagnose[]): WeigthedDiagnose[] {
  const softmaxDiagnoses = softmaxNormalization(diagnoses)
  return softmaxDiagnoses.map((d) => ({
    ...d,
    softMaxNormalizedWeight: d.softMaxNormalizedWeight! * 100,
  }))
}

// Z-Score Normalization
function calculateMean(weights: number[]): number {
  const sum = weights.reduce((a, b) => a + b, 0)
  return sum / weights.length
}

function calculateStandardDeviation(weights: number[], mean: number): number {
  const squaredDiffs = weights.map((weight) => Math.pow(weight - mean, 2))
  const avgSquaredDiff = squaredDiffs.reduce((a, b) => a + b, 0) / weights.length
  return Math.sqrt(avgSquaredDiff)
}

function calculateZScores(diagnoses: WeigthedDiagnose[]): WeigthedDiagnose[] {
  const weights = diagnoses.map((d) => d.weight)
  const mean = calculateMean(weights)
  const stdDev = calculateStandardDeviation(weights, mean)

  return diagnoses.map((d) => ({
    ...d,
    zScore: (d.weight - mean) / stdDev,
  }))
}

function zScoreToConfidence(zScore: number): number {
  const cdf = (1 + erf(zScore / Math.sqrt(2))) / 2 // Using the error function to approximate the CDF
  return cdf * 100
}

function erf(x: number): number {
  // Save the sign of x
  const sign = x >= 0 ? 1 : -1
  x = Math.abs(x)

  // Constants for the approximation
  const a1 = 0.254829592
  const a2 = -0.284496736
  const a3 = 1.421413741
  const a4 = -1.453152027
  const a5 = 1.061405429
  const p = 0.3275911

  // A&S formula 7.1.26
  const t = 1.0 / (1.0 + p * x)
  const y = 1.0 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x)

  return sign * y
}

function calculateConfidenceZScores(diagnoses: WeigthedDiagnose[]): WeigthedDiagnose[] {
  const zScores = calculateZScores(diagnoses)
  return zScores.map((d) => ({
    ...d,
    zScore: zScoreToConfidence(d.zScore ?? 0),
  }))
}
