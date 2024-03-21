import { ActiveSurveyDefinition } from '@/app/(shadcn)/(admin)/admin/survey-definitions/components/active-survey'
import NoActiveSurveyDefinition from '@/app/(shadcn)/(admin)/admin/survey-definitions/components/no-active-survey'
import NoDefinitionComponent from '@/app/(shadcn)/(admin)/admin/survey-definitions/components/no-definition'
import { surveyDefinitionColumns } from '@/app/(shadcn)/(admin)/admin/survey-definitions/components/survey-defintion-columns'
import { DataTable } from '@/components/data-table/data-table'
import prisma from '@/db/db'
import { unstable_cache } from 'next/cache'

type Props = {}

const getSurveyDefinitions = unstable_cache(async () => prisma.surveyDefinition.findMany(), ['survey-definitions'], { tags: ['survey-definitions'] })

const SurveyDefinitionsPage = async (props: Props) => {
  const surveyDefinitions = await getSurveyDefinitions()
  const activeSurveyDefinition = surveyDefinitions.find((surveyDefinition) => surveyDefinition.active)

  if (surveyDefinitions.length === 0) {
    return <NoDefinitionComponent />
  }

  return (
    <div className='w-full py-6 space-y-4'>
      <div className='container space-y-4'>{activeSurveyDefinition ? <ActiveSurveyDefinition activeSurveyDefinition={activeSurveyDefinition} /> : <NoActiveSurveyDefinition />}</div>
      <div className='container'>
        <DataTable columns={surveyDefinitionColumns} data={surveyDefinitions as any[]} />
      </div>
    </div>
  )
}

export default SurveyDefinitionsPage
