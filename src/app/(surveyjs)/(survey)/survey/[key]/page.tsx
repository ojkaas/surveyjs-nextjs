import SurveyContainer from '@/components/SurveyContainer'
import prisma from '@/db/db'
import { unstable_cache } from 'next/cache'

// import dynamic from 'next/dynamic';
// const SurveyComponent = dynamic(() => import("@/components/Survey"), { ssr: false });

const getActiveSurveyDefinitionJson = unstable_cache(
  async () => prisma.surveyDefinition.findFirstOrThrow({ where: { active: true }, select: { id: true, surveyData: { select: { jsonData: true } } } }),
  ['active-survey'],
  {
    tags: ['active-survey'],
  }
)

const getSurvey = unstable_cache(async (key) => prisma.survey.findFirstOrThrow({ where: { key } }), ['survey'], {
  tags: ['survey'],
})

type Props = {
  params: Promise<{
    key: string
  }>
}

export default async function Survey(props: Props) {
  const params = await props.params
  const { key } = params

  const activeSurvey = await getActiveSurveyDefinitionJson()
  const survey = await getSurvey(key)

  return <SurveyContainer json={activeSurvey.surveyData!.jsonData} definitionId={activeSurvey.id} id={key} finished={survey.finished} />
}
