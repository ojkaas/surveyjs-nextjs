import WeightedDiagnosesSideMenu from '@/app/(shadcn)/(admin)/admin/survey-definitions/link-diagnoses/[id]/_components/side-tree'
import WeigthedDiagnoseMatrix from '@/app/(shadcn)/(admin)/admin/survey-definitions/link-diagnoses/[id]/_components/weighted-matrix'
import prisma from '@/db/db'
import { unstable_cache } from 'next/cache'

type Props = { params: { id: string; questionId: string } }

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T
type SurveyWithQuestions = ThenArg<ReturnType<typeof getSurveyDefinition>>

const getSurveyDefinition = unstable_cache(
  async (id: string) => prisma.surveyDefinition.findUniqueOrThrow({ where: { id }, include: { pages: { include: { questions: true } } } }),
  ['survey-definition'],
  { tags: ['survey-definitions'] }
)
const getSurveyQuestion = unstable_cache(
  async (id: string) => prisma.surveyQuestion.findUniqueOrThrow({ where: { id }, include: { surveyPage: { include: { activeDiagnoses: true } }, answers: true } }),
  ['survey-question'],
  {
    tags: ['survey-question'],
  }
)

const getDiagnosis = unstable_cache(async () => prisma.diagnoses.findMany(), ['diagnoses'], { tags: ['diagnoses'] })

const getWeightedDiagnoses = unstable_cache(
  async (diagnoseIds: string[], answerIds: string[]) =>
    prisma.weightedDiagnose.findMany({
      where: {
        AND: [{ diagnoseId: { in: diagnoseIds } }, { surveyAnswerId: { in: answerIds } }],
      },
    }),
  ['weighted-diagnoses'],
  {
    tags: ['weighted-diagnoses'],
  }
)

function findNextQuestionId(definition: SurveyWithQuestions, currentPageId: string, currentQuestionId: string): string | null {
  let foundCurrentPage = false
  let foundCurrentQuestion = false

  for (const page of definition.pages) {
    if (page.id === currentPageId) {
      foundCurrentPage = true

      for (let i = 0; i < page.questions.length; i++) {
        const question = page.questions[i]

        if (foundCurrentQuestion) {
          return question.id // Found the next question on the same page
        }

        if (question.id === currentQuestionId) {
          foundCurrentQuestion = true
        }
      }
    } else if (foundCurrentPage) {
      // If we've already found the current page, move to the next page
      if (page.questions.length > 0) return page.questions[0].id // Return the first question on the next page
    }
  }

  return null // No more questions found
}

const QuestionPage = async ({ params: { id, questionId } }: Props) => {
  const surveyDefinition = await getSurveyDefinition(id)
  const surveyQuestion = await getSurveyQuestion(questionId)
  const diagnosis = await getDiagnosis()

  const weightedDiagnoses = await getWeightedDiagnoses(
    diagnosis.map((d) => d.id),
    surveyQuestion.answers.map((a) => a.id)
  )

  //find next question id by checking the current question id in the list of questions in the page of the current surveyQuestion, get the next question on the page, if there is no next question, get the first question on the next page
  const nextId = findNextQuestionId(surveyDefinition, surveyQuestion.surveyPage.id, questionId)
  const diagnosesToUse = surveyQuestion.surveyPage.activeDiagnoses.length > 0 ? surveyQuestion.surveyPage.activeDiagnoses : diagnosis
  return (
    <div className='flex'>
      <WeightedDiagnosesSideMenu pages={surveyDefinition.pages} survey={surveyDefinition} activePage={surveyQuestion.surveyPage.number} activeQuestion={questionId} />
      <WeigthedDiagnoseMatrix diagnosis={diagnosesToUse} question={surveyQuestion} weightedDiagnoses={weightedDiagnoses} survey={surveyDefinition} nextId={nextId} />
    </div>
  )
}

export default QuestionPage
