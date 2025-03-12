import DiagnoseTooltip from '@/app/(shadcn)/(portal)/portal/vragenlijsten/[id]/resultaten/_components/diagnose.tooltip'
import QuestionTabs from '@/app/(shadcn)/(portal)/portal/vragenlijsten/[id]/resultaten/_components/question.tabs'
import prisma from '@/db/db'
import { authOptions } from '@/lib/config/auth/auth-options'
import { calculateWeight } from '@/lib/survey/calculate-weight'
import { combineDefinitionAndAnswers } from '@/lib/survey/combine-definition-and-answers'
import { SurveyJson, SurveyResultJson } from '@/lib/surveyjs/types'
import { UserType } from '@prisma/client'
import { DateTime } from 'luxon'
import { getServerSession } from 'next-auth'

import { unstable_cache } from 'next/cache'

type Props = { params: Promise<{ id: string }> }

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T
export type SurveyDefinitionWithWeigthedDiagnosis = ThenArg<ReturnType<typeof getSurvey>>

const getSurvey = unstable_cache(
  async (id) =>
    prisma.survey.findFirstOrThrow({
      where: { id },
      include: {
        surveyDefinition: { include: { surveyData: true, pages: { include: { questions: { include: { answers: { include: { weightedDiagnoses: { include: { diagnose: true } } } } } } } } } },
      },
    }),
  ['survey'],
  {
    tags: ['survey'],
  }
)

const ResultPage = async (props: Props) => {
  const session = await getServerSession(authOptions)
  const params = await props.params

  const { id } = params

  //const activeSurvey = await getActiveSurveyDefinitionJson()
  const survey = await getSurvey(id)

  const definition = survey.surveyDefinition?.surveyData?.jsonData as SurveyJson

  const answers = survey.result as SurveyResultJson

  const questionsWithAnswers = combineDefinitionAndAnswers(definition, answers)
  const calculatedWeights = calculateWeight(questionsWithAnswers, survey?.surveyDefinition)
  const mostProbableDiagnose = calculatedWeights.weights[0]

  const type = session?.user?.role ? (Object.values(UserType).includes(session.user.role as UserType) ? (session.user.role as UserType) : UserType.HUISARTS) : UserType.HUISARTS

  const personToContact = type === UserType.HUISARTS ? mostProbableDiagnose.diagnose.personToContact : mostProbableDiagnose.diagnose.personToContactZiekenhuis

  return (
    <main className='flex-1 bg-gray-100 py-10 min-h-screen'>
      <div className='container mx-auto'>
        <div className='bg-white rounded-lg shadow-md p-8'>
          <div className='flex justify-between items-center'>
            <h2 className='text-2xl font-bold mb-6'>Resultaten van de vragenlijst</h2>
            <div className='flex items-center'>
              <DiagnoseTooltip weightedDiagnoses={calculatedWeights} />
            </div>
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            <div>
              <h3 className='text-lg font-bold mb-4'>Algemene informatie</h3>
              <div className='space-y-2'>
                <div className='flex justify-between'>
                  <span className='font-semibold'>Identificatie:</span>
                  <span>{survey.key}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='font-semibold'>Aangemaakt op:</span>
                  <span>{DateTime.fromJSDate(new Date(survey.createdAt)).toLocaleString({ dateStyle: 'medium' }, { locale: 'nl-NL' })}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='font-semibold'>Afgrond op:</span>
                  <span>{DateTime.fromJSDate(new Date(survey.updatedAt)).toLocaleString({ dateStyle: 'medium' }, { locale: 'nl-NL' })}</span>
                </div>
              </div>
            </div>
            <div>
              <div className='space-y-2 mt-10 lg:mt-0'>
                <h3 className='text-lg font-bold mb-4'>Diagnose</h3>
                <div className='flex md:flex-row flex-col justify-between md:space-x-4 mb-3 md:mb-0'>
                  <span className='font-semibold'>Waarschijnlijke diagnose:</span>
                  <span className='font-medium text-green-500'>{mostProbableDiagnose.diagnose.name}</span>
                </div>
                <div className='flex md:flex-row flex-col justify-between md:space-x-4 mb-3 md:mb-0'>
                  <span className='font-semibold'>Vertrouwensniveau:</span>
                  <span className='font-medium text-green-500'>{Math.floor((mostProbableDiagnose.weight / calculatedWeights.total) * 100)}%</span>
                </div>
                <div className='flex md:flex-row flex-col justify-between md:space-x-4 mb-3 md:mb-0'>
                  <span className='font-semibold'>Toeganstijd:</span>
                  <span>{mostProbableDiagnose.diagnose.accessTime}</span>
                </div>
                <div className='flex md:flex-row flex-col justify-between md:space-x-4 mb-3 md:mb-0'>
                  <span className='font-semibold'>Aanbevolen actie:</span>
                  <span>Raadpleeg een {personToContact}</span>
                </div>
                <div className='flex md:flex-row flex-col justify-between md:space-x-4 mb-3 md:mb-0'>
                  <span className='font-semibold'>Omschrijving:</span>
                  <span>{mostProbableDiagnose.diagnose.description}</span>
                </div>
                <div className='flex md:flex-row flex-col justify-between md:space-x-4 mb-3 md:mb-0'>
                  <span className='font-semibold'>Behandeling:</span>
                  <span>{mostProbableDiagnose.diagnose.treatment}</span>
                </div>
              </div>
            </div>
          </div>

          <QuestionTabs questions={questionsWithAnswers} />
        </div>
      </div>
    </main>
  )
}

/*
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
              </TabsContent>*/

export default ResultPage
