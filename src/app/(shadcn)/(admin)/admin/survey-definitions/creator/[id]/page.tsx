export const maxDuration = 30
import CreatorWrapper from '@/app/(shadcn)/(admin)/admin/survey-definitions/creator/[id]/wrapper'
import prisma from '@/db/db'
import { unstable_cache } from 'next/cache'

type Props = { params: Promise<{ id: string }> }

const getSurveyDefinitionData = unstable_cache(async (id: string) => prisma.surveyDefinitionData.findFirst({ where: { surveyDefId: id } }), ['survey-definition'], {
  tags: ['survey-definitions'],
})

const CreatorPage = async (props: Props) => {
  const params = await props.params

  const { id } = params

  const surveyDefinitionData = await getSurveyDefinitionData(id)

  return (
    <>
      <CreatorWrapper id={id} surveyDefinitionData={surveyDefinitionData} />
    </>
  )
}

export default CreatorPage
