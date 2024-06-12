import { SurveyCreatorWidget } from '@/components/SurveyCreator'
import prisma from '@/db/db'
import { unstable_cache } from 'next/cache'

type Props = { params: { id: string } }

const getSurveyDefinitionData = unstable_cache(async (id: string) => prisma.surveyDefinitionData.findUniqueOrThrow({ where: { surveyDefId: id } }), ['survey-definition'], {
  tags: ['survey-definitions'],
})

const CreatorPage = async ({ params: { id } }: Props) => {
  const surveyDefinitionData = await getSurveyDefinitionData(id)

  return <SurveyCreatorWidget id={id} json={surveyDefinitionData.jsonData || {}} />
}

export default CreatorPage
