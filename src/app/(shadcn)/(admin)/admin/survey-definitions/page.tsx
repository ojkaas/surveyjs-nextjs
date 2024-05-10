import { ActiveSurveyDefinition } from '@/app/(shadcn)/(admin)/admin/survey-definitions/_components/active-survey'
import NoActiveSurveyDefinition from '@/app/(shadcn)/(admin)/admin/survey-definitions/_components/no-active-survey'
import NoDefinitionComponent from '@/app/(shadcn)/(admin)/admin/survey-definitions/_components/no-definition'
import { surveyDefinitionColumns } from '@/app/(shadcn)/(admin)/admin/survey-definitions/_components/survey-defintion-columns'
import { DataTable } from '@/components/data-table/data-table'
import prisma from '@/db/db'
import { SurveyDefinition } from '@prisma/client'
import { unstable_cache } from 'next/cache'

type Props = {}

export interface SurveyDefinitionWithCount extends SurveyDefinition {
  questionCount: number
}

const getSurveyDefinitions = unstable_cache(
  async () =>
    prisma.surveyDefinition.findMany({
      include: {
        questions: {
          select: {
            id: true, // Assuming you want to count questions based on their IDs
          },
        },
      },
    }),
  ['survey-definitions'],
  { tags: ['survey-definitions'] }
)

const SurveyDefinitionsPage = async (props: Props) => {
  let surveyDefinitions = await getSurveyDefinitions()
  const surveyDefinitionsWithCount: SurveyDefinitionWithCount[] = surveyDefinitions.map((definition) => {
    // Calculate the count of questions for each SurveyDefinition
    const questionCount = definition.questions.length
    // Return a new object with the added questionCount attribute
    return {
      ...definition,
      questionCount,
    }
  })

  const activeSurveyDefinition = surveyDefinitionsWithCount.find((surveyDefinition) => surveyDefinition.active)

  if (surveyDefinitions.length === 0) {
    return <NoDefinitionComponent />
  }

  return (
    <div className='w-full py-6 space-y-4'>
      <div className='container space-y-4'>{activeSurveyDefinition ? <ActiveSurveyDefinition activeSurveyDefinition={activeSurveyDefinition} /> : <NoActiveSurveyDefinition />}</div>
      <div className='container'>
        <DataTable columns={surveyDefinitionColumns} data={surveyDefinitionsWithCount as any[]} />
      </div>
    </div>
  )
}

export default SurveyDefinitionsPage
