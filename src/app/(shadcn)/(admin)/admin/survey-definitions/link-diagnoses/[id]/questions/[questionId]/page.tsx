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

const QuestionPage = async ({ params: { id } }: Props) => {
  const surveyDefinition = await getSurveyDefinition(id)

  return (
    <div className='flex'>
      <WeightedDiagnosesSideMenu pages={surveyDefinition.pages} survey={surveyDefinition} activePage={2} activeQuestion={'clvcbfl2v001exeiy78ladqxp'} />
      <WeigthedDiagnoseMatrix />
    </div>
  )
}

export default QuestionPage
