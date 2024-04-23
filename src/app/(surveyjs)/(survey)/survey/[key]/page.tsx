import SurveyComponent from '@/components/Survey'
import prisma from '@/db/db'
import { unstable_cache } from 'next/cache'
import Link from 'next/link'

// import dynamic from 'next/dynamic';
// const SurveyComponent = dynamic(() => import("@/components/Survey"), { ssr: false });

const getActiveSurveyDefinitionJson = unstable_cache(async () => prisma.surveyDefinition.findFirstOrThrow({ where: { active: true }, select: { data: true, id: true } }), ['active-survey'], {
  tags: ['active-survey'],
})

const getSurvey = unstable_cache(async (key) => prisma.survey.findFirstOrThrow({ where: { key } }), ['survey'], {
  tags: ['survey'],
})

type Props = {
  params: {
    key: string
  }
}

export default async function Survey({ params: { key } }: Props) {
  const activeSurvey = await getActiveSurveyDefinitionJson()
  const survey = await getSurvey(key)
  if (survey.finished) {
    return (
      <div className='flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900'>
        <div className='max-w-md px-6 py-8 bg-white rounded-lg shadow-md dark:bg-gray-800'>
          <div className='flex flex-col items-center'>
            <AlertCircleIcon className='w-16 h-16 text-red-500' />
            <h1 className='mt-4 text-2xl font-bold text-gray-800 dark:text-gray-200'>Vragenlijst niet beschikbaar</h1>
            <p className='mt-2 text-gray-600 dark:text-gray-400'>Onze excuses, maar de vragenlijst waarvoor u werd uitgenodigd is niet langer actief.</p>
            <p className='mt-4 text-gray-600 dark:text-gray-400'>Gelieve contact op te nemen met de partij die u heeft uitgenodigd voor verdere hulp.</p>
          </div>
          <div className='mt-6 text-center'>
            <Link
              className='inline-flex items-center px-4 py-2 text-sm font-medium text-gray-800 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:text-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-400'
              href='/'
            >
              Naar de homepage
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='flex min-h-screen flex-col items-center justify-between'>
      <SurveyComponent json={activeSurvey.data} definitionId={activeSurvey.id} id={key} />
    </div>
  )
}

type IconProps = {
  className?: string
}

function AlertCircleIcon(props: IconProps) {
  return (
    <svg {...props} xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
      <circle cx='12' cy='12' r='10' />
      <line x1='12' x2='12' y1='8' y2='12' />
      <line x1='12' x2='12.01' y1='16' y2='16' />
    </svg>
  )
}
