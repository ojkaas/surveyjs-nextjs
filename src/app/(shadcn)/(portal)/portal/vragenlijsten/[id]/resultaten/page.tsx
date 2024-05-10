import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import prisma from '@/db/db'
import { unstable_cache } from 'next/cache'

type Props = {
  id: string
}

const getActiveSurveyDefinitionJson = unstable_cache(async () => prisma.surveyDefinition.findFirstOrThrow({ where: { active: true }, select: { data: true, id: true } }), ['active-survey'], {
  tags: ['active-survey'],
})

const getSurvey = unstable_cache(async (key) => prisma.survey.findFirstOrThrow({ where: { key } }), ['survey'], {
  tags: ['survey'],
})

export default async function Page({ id }: Props) {
  const activeSurvey = await getActiveSurveyDefinitionJson()
  const survey = await getSurvey(id)

  return (
    <main className='flex-1 bg-gray-100 py-10'>
      <div className='container mx-auto'>
        <div className='bg-white rounded-lg shadow-md p-8'>
          <h2 className='text-2xl font-bold mb-6'>Resultaten van de vragenlijst</h2>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            <div>
              <h3 className='text-lg font-bold mb-4'>Algemene informatie</h3>
              <div className='space-y-2'>
                <div className='flex justify-between'>
                  <span className='font-medium'>Identificatie:</span>
                  <span>L570L3TEHV</span>
                </div>
                <div className='flex justify-between'>
                  <span className='font-medium'>Aangemaakt op:</span>
                  <span>12 Augustus 2023</span>
                </div>
                <div className='flex justify-between'>
                  <span className='font-medium'>Afgrond op:</span>
                  <span>14 Augustus 2023</span>
                </div>
              </div>
            </div>
            <div>
              <div className='flex justify-between'>
                <span className='font-medium'>Waarschijnlijke diagnose:</span>
                <span className='font-medium text-green-500'>Neobular Cognitieve Disfunctie (NCD)</span>
              </div>
              <div className='flex justify-between'>
                <span className='font-medium'>Vertrouwensniveau:</span>
                <span className='font-medium text-green-500'>85%</span>
              </div>
              <div className='flex justify-between'>
                <span className='font-medium'>Aanbevolen actie:</span>
                <span className='font-medium'>Raadpleeg een oogarts</span>
              </div>
              <div className='flex justify-between'>
                <span className='font-medium'>Omschrijving:</span>
                <span className='font-medium text-sm w-72'>
                  Neobulaire cognitieve disfunctie (NCD) is een complexe neurologische aandoening die wordt gekenmerkt door een ongebruikelijke verstoring van de neurale verbindingen in de hersenen,
                  resulterend in cognitieve achteruitgang en neurologische symptomen.
                </span>
              </div>
            </div>
          </div>
          <div className='mt-8'>
            <h3 className='text-lg font-bold mb-4'>Questionnaire Responses</h3>
            <Tabs defaultValue='page1'>
              <TabsList className='flex border-b border-gray-200'>
                <TabsTrigger value='page1'>Pagina 1</TabsTrigger>
                <TabsTrigger value='page2'>Pagina 2</TabsTrigger>
                <TabsTrigger value='page3'>Pagina 3</TabsTrigger>
              </TabsList>
              <TabsContent value='page1'>
                <div className='space-y-4'>
                  <div>
                    <h4 className='font-medium mb-2'>Vraag 1</h4>
                    <p>Wat is uw huidige symptoom?</p>
                    <p className='text-gray-500'>Koorts, Hoofdpijn</p>
                  </div>
                  <div>
                    <h4 className='font-medium mb-2'>Vraag 2</h4>
                    <p>Hoe lang heeft u deze symptomen al?</p>
                    <p className='text-gray-500'>3 dagen</p>
                  </div>
                  <div>
                    <h4 className='font-medium mb-2'>Vraag 3</h4>
                    <p>Heeft u recent gereisd of contact gehad met zieke personen?</p>
                    <p className='text-gray-500'>Ja, ik ben recent naar een regio gereisd met een griepuitbraak.</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value='page2'>
                <div className='space-y-4'>
                  <div>
                    <h4 className='font-medium mb-2'>Vraag 4</h4>
                    <p>Heeft u nog andere symptomen?</p>
                    <p className='text-gray-500'>Spierpijn, Vermoeidheid</p>
                  </div>
                  <div>
                    <h4 className='font-medium mb-2'>Vraag 5</h4>
                    <p>Heeft u medicatie ingenomen voor uw symptomen?</p>
                    <p className='text-gray-500'>Ja, ik heb pijnstillers zonder recept gebruikt.</p>
                  </div>
                  <div>
                    <h4 className='font-medium mb-2'>Vraag 6</h4>
                    <p>Heeft u onderliggende gezondheidsproblemen?</p>
                    <p className='text-gray-500'>Nee, over het algemeen ben ik gezond.</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value='page3'>
                <div className='space-y-4'>
                  <div>
                    <h4 className='font-medium mb-2'>Vraag 7</h4>
                    <p>Heeft u recent contact gehad met iemand die ziek is?</p>
                    <p className='text-gray-500'>Ja, een familielid is recentelijk gediagnosticeerd met griep.</p>
                  </div>
                  <div>
                    <h4 className='font-medium mb-2'>Vraag 8</h4>
                    <p>Heeft u moeite met ademhalen of kortademigheid?</p>
                    <p className='text-gray-500'>Nee, mijn ademhaling is normaal.</p>
                  </div>
                  <div>
                    <h4 className='font-medium mb-2'>Vraag 9</h4>
                    <p>Heeft u recent veranderingen in uw smaak- of reukvermogen gehad?</p>
                    <p className='text-gray-500'>Nee, mijn zintuigen zijn normaal.</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </main>
  )
}
