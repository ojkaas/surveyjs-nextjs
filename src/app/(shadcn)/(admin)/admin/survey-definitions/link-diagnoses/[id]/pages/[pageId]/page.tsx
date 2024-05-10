import WeightedDiagnosesSideMenu from '@/app/(shadcn)/(admin)/admin/survey-definitions/link-diagnoses/[id]/_components/side-tree'
import SelectDiagnosesForm from '@/app/(shadcn)/(admin)/admin/survey-definitions/link-diagnoses/[id]/pages/[pageId]/_components/select-diagnoses.form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import prisma from '@/db/db'
import { unstable_cache } from 'next/cache'

type Props = { params: { id: string; pageId: string } }

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T
export type SurveyPageWithLinkedDiagnosis = ThenArg<ReturnType<typeof getSurveyPage>>

const getSurveyDefinition = unstable_cache(
  async (id: string) => prisma.surveyDefinition.findUniqueOrThrow({ where: { id }, include: { pages: { include: { questions: true } } } }),
  ['survey-definition'],
  { tags: ['survey-definitions'] }
)
const getSurveyPage = unstable_cache(async (id: string) => prisma.surveyPage.findUniqueOrThrow({ where: { id }, include: { activeDiagnoses: true } }), ['survey-page'], {
  tags: ['survey-page'],
})

const getDiagnosis = unstable_cache(async () => prisma.diagnoses.findMany(), ['diagnoses'], { tags: ['diagnoses'] })

const PagePage = async ({ params: { id, pageId } }: Props) => {
  const surveyDefinition = await getSurveyDefinition(id)
  const surveyPage = await getSurveyPage(pageId)
  const diagnoses = await getDiagnosis()

  return (
    <div className='flex'>
      <WeightedDiagnosesSideMenu pages={surveyDefinition.pages} survey={surveyDefinition} activePage={surveyPage.number} />
      <Card className='m-4'>
        <CardHeader>
          <CardTitle className='text-3xl font-bold mb-6'>
            Pagina {surveyPage.number}
            {surveyPage.title && ` - ${surveyPage.title}`} - Diagnose koppelen
          </CardTitle>
          <CardDescription className='max-w-[600px]'>
            Selecteer de diagnose die je wilt gebruiken op deze pagine. Standaard zullen alle diagnose voor een pagina beschikbaar worden gesteld, mocht je dit willen limiteren kun je hier onder een
            sub selectie maken. Deze zullen dan worden gebruikt voor de vragen op deze pagina.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SelectDiagnosesForm diagnoses={diagnoses} page={surveyPage} />
        </CardContent>
      </Card>
    </div>
  )
}

export default PagePage
