import WeightedDiagnosesSideMenu from '@/app/(shadcn)/(admin)/admin/survey-definitions/link-diagnoses/[id]/_components/side-tree'
import { FancyMultiSelect } from '@/components/ui/custom/fancy-multi-select'
import prisma from '@/db/db'
import { unstable_cache } from 'next/cache'

type Props = { params: { id: string } }

const getSurveyDefinition = unstable_cache(
  async (id: string) => prisma.surveyDefinition.findUniqueOrThrow({ where: { id }, include: { pages: { include: { questions: true } } } }),
  ['survey-definition'],
  { tags: ['survey-definitions'] }
)

const LinkDiagnosePage = async ({ params: { id } }: Props) => {
  const surveyDefinition = await getSurveyDefinition(id)

  return (
    <div className='w-full flex'>
      <WeightedDiagnosesSideMenu pages={surveyDefinition.pages} survey={surveyDefinition} />
      <div>
        <FancyMultiSelect />
      </div>
    </div>
  )
}

export default LinkDiagnosePage
