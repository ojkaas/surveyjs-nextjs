import { SurveyCreatorWidget } from '@/components/SurveyCreator'
import prisma from '@/db/db'
import { unstable_cache } from 'next/cache'

type Props = { params: { id: string } }

const getSurveyDefinition = unstable_cache(async (id: string) => prisma.surveyDefinition.findUniqueOrThrow({ where: { id } }), ['survey-definition'], { tags: ['survey-definitions'] })

const CreatorPage = async ({ params: { id } }: Props) => {
  const surveyDefinition = await getSurveyDefinition(id)

  return <SurveyCreatorWidget id={surveyDefinition.id} json={surveyDefinition.data || {}} />
}

export default CreatorPage
