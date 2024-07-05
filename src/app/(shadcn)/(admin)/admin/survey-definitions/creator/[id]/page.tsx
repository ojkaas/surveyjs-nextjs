import CreatorWrapper from '@/app/(shadcn)/(admin)/admin/survey-definitions/creator/[id]/wrapper'
import prisma from '@/db/db'
import { unstable_cache } from 'next/cache'

type Props = { params: { id: string } }

const getSurveyDefinitionData = unstable_cache(async (id: string) => prisma.surveyDefinitionData.findUniqueOrThrow({ where: { surveyDefId: id } }), ['survey-definition'], {
  tags: ['survey-definitions'],
})

const CreatorPage = async ({ params: { id } }: Props) => {
  const surveyDefinitionData = await getSurveyDefinitionData(id)

  return (
    <>
      <CreatorWrapper id={id} surveyDefinitionData={surveyDefinitionData} />
    </>
  )
}

export default CreatorPage
