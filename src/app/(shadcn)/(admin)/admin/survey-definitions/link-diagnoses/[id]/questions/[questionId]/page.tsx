import WeightedDiagnosesSideMenu from '@/app/(shadcn)/(admin)/admin/survey-definitions/link-diagnoses/[id]/_components/side-tree'
import WeigthedDiagnoseMatrix from '@/app/(shadcn)/(admin)/admin/survey-definitions/link-diagnoses/[id]/_components/weighted-matrix'
import prisma from '@/db/db'
import { unstable_cache } from 'next/cache'

type Props = { params: { id: string; questionId: string } }

const getSurveyDefinition = unstable_cache(
  async (id: string) => prisma.surveyDefinition.findUniqueOrThrow({ where: { id }, include: { pages: { include: { questions: true } } } }),
  ['survey-definition'],
  { tags: ['survey-definitions'] }
)
const getSurveyQuestion = unstable_cache(async (id: string) => prisma.surveyQuestion.findUniqueOrThrow({ where: { id }, include: { surveyPage: true, answers: true } }), ['survey-question'], {
  tags: ['survey-question'],
})

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

const QuestionPage = async ({ params: { id, questionId } }: Props) => {
  const surveyDefinition = await getSurveyDefinition(id)
  const surveyQuestion = await getSurveyQuestion(questionId)
  const diagnosis = await getDiagnosis()

  const weightedDiagnoses = await getWeightedDiagnoses(
    diagnosis.map((d) => d.id),
    surveyQuestion.answers.map((a) => a.id)
  )

  return (
    <div className='flex'>
      <WeightedDiagnosesSideMenu pages={surveyDefinition.pages} survey={surveyDefinition} activePage={surveyQuestion.surveyPage.number} activeQuestion={questionId} />
      <WeigthedDiagnoseMatrix diagnosis={diagnosis} question={surveyQuestion} weightedDiagnoses={weightedDiagnoses} />
    </div>
  )
}

export default QuestionPage
