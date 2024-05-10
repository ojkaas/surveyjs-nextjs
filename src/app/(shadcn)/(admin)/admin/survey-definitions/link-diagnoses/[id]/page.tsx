import WeightedDiagnosesSideMenu from '@/app/(shadcn)/(admin)/admin/survey-definitions/link-diagnoses/[id]/_components/side-tree'
import { Button } from '@/components/ui/button'
import prisma from '@/db/db'
import { unstable_cache } from 'next/cache'
import Link from 'next/link'

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
      <div className='flex flex-col'>
        <section className='w-full py-12 md:py-24 lg:py-32'>
          <div className='container grid items-center gap-4 px-4 md:px-6'>
            <div className='space-y-3'>
              <h1 className='text-3xl font-bold tracking-tighter md:text-4xl/tight'>Diagnoses koppelen</h1>
              <p className='max-w-[800px] text-gray-500 text-base/relaxed dark:text-gray-400'>
                Door te klikken op een vraag en het toekennen van gewicht aan het antwoord of de diagnose, kun je de relevantie ervan vergroten. Dit werkt het beste binnen een bepaalde range, zoals -5
                tot +5. Door een hoger gewicht toe te kennen, geef je aan dat het antwoord of de diagnose belangrijker is.
              </p>
              <p className='max-w-[800px] text-gray-500 text-base/relaxed dark:text-gray-400'>
                Als je bepaalde pagina&lsquo;s met vragen wilt uitsluiten van diagnoses, kun je naar de &lsquo;gekoppelde diagnoses&lsquo; per pagina gaan om specifieke diagnoses uit te sluiten.
              </p>
            </div>
            <div className='flex flex-col gap-2 min-[400px]:flex-row'>
              <Button asChild>
                <Link href={`/admin/survey-definitions/link-diagnoses/${surveyDefinition.id}/questions/${surveyDefinition.pages[0].questions[0].id}`}>Begin met koppelen</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default LinkDiagnosePage
