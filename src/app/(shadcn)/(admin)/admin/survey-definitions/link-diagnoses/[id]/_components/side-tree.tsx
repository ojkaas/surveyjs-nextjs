import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { cn } from '@/lib/utils'
import { Prisma, SurveyDefinition } from '@prisma/client'
import Link from 'next/link'

const pageWithQuestions = Prisma.validator<Prisma.SurveyPageDefaultArgs>()({
  include: { questions: true },
})

type SurveyPageWithQuestions = Prisma.SurveyPageGetPayload<typeof pageWithQuestions>

type Props = {
  survey: SurveyDefinition
  pages: SurveyPageWithQuestions[]
  activePage?: number
  activeQuestion?: string
}

export default function WeightedDiagnosesSideMenu({ pages, survey, activePage, activeQuestion }: Props) {
  pages.sort((a, b) => a.number - b.number)
  return (
    <div className='flex h-full w-64 flex-col bg-white shadow-lg dark:bg-gray-950'>
      <div className='flex h-16 items-center justify-between px-4'>
        <span className='flex items-center gap-2 font-semibold'>
          <QuestionaireIcon className='h-6 w-6' />
          <span className='text-lg'>{survey.name}</span>
        </span>
      </div>
      <div className='flex-1 h-full min-h-[86vh] py-4'>
        <nav className='space-y-1'>
          {pages.sort().map((surveyPage) => {
            if (!surveyPage.questions.length) return null
            return (
              <Collapsible key={surveyPage.number} defaultOpen={surveyPage.number === activePage} className='group'>
                <CollapsibleTrigger
                  className={`group flex w-full items-center justify-between rounded-md py-2 px-3 text-sm font-medium transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 dark:hover:bg-gray-800 dark:focus-visible:ring-gray-300`}
                >
                  <span className='truncate'>
                    Pagina {surveyPage.number}
                    {surveyPage.title && ` - ${surveyPage.title}`}
                  </span>
                  <ChevronRightIcon className={`h-4 w-4 transition-transform group-data-[state=open]:rotate-90`} />
                </CollapsibleTrigger>
                <CollapsibleContent className='pl-3 pt-2'>
                  <Link
                    className='flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
                    href={`/admin/survey-definitions/link-diagnoses/${survey.id}/pages/${surveyPage.id}`}
                  >
                    <DiagnoseIcon className='h-3 w-3' />
                    <span className='text-xs font-medium text-gray-700'>Gekoppelde diagnoses</span>
                  </Link>
                  {surveyPage.questions
                    .sort((a, b) => a.questionNumber - b.questionNumber)
                    .map((question) => {
                      return (
                        <Link
                          key={question.id}
                          className={cn(
                            `flex items-center gap-3 mr-1 rounded-md px-3 py-2 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800`,
                            {
                              'bg-gray-200 dark:bg-gray-900': question.id === activeQuestion,
                            }
                          )}
                          href={`/admin/survey-definitions/link-diagnoses/${survey.id}/questions/${question.id}`}
                        >
                          {question.question}
                          {question.title && ` - ${question.title}`}
                        </Link>
                      )
                    })}
                </CollapsibleContent>
              </Collapsible>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

function ChevronRightIcon(props: any) {
  return (
    <svg {...props} xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
      <path d='m9 18 6-6-6-6' />
    </svg>
  )
}

function QuestionaireIcon(props: any) {
  return (
    <svg {...props} xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 512 512' fill='000000' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
      <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
      <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
      <g id='SVGRepo_iconCarrier'>
        <g>
          <path d='M449.891,87.953c-3.766-8.906-10.031-16.438-17.922-21.781c-7.891-5.328-17.5-8.469-27.719-8.469h-42.656 v-7.359h-61.828c0.281-2,0.438-4.063,0.438-6.141C300.203,19.828,280.375,0,256,0s-44.203,19.828-44.203,44.203 c0,2.078,0.156,4.141,0.438,6.141h-61.828v7.359H107.75c-6.797,0-13.359,1.391-19.281,3.906 c-8.922,3.766-16.453,10.031-21.797,17.922c-5.328,7.906-8.469,17.5-8.469,27.719v355.219c0,6.797,1.391,13.344,3.891,19.281 c3.781,8.906,10.047,16.438,17.938,21.781S97.531,512,107.75,512h296.5c6.797,0,13.359-1.375,19.297-3.906 c8.906-3.75,16.438-10.031,21.781-17.922c5.328-7.891,8.469-17.5,8.469-27.703V107.25 C453.797,100.438,452.406,93.891,449.891,87.953z M256,27.797c9.047,0,16.406,7.359,16.406,16.406c0,2.172-0.438,4.234-1.219,6.141 h-30.391c-0.766-1.906-1.203-3.969-1.203-6.141C239.594,35.156,246.969,27.797,256,27.797z M424.328,462.469 c0,2.813-0.563,5.406-1.578,7.797c-1.5,3.578-4.078,6.672-7.281,8.859c-3.219,2.156-7,3.406-11.219,3.406h-296.5 c-2.813,0-5.422-0.563-7.813-1.563c-3.578-1.516-6.672-4.094-8.844-7.297c-2.172-3.219-3.422-7-3.422-11.203V107.25 c0-2.813,0.563-5.422,1.578-7.813c1.516-3.594,4.063-6.672,7.281-8.844c3.219-2.156,7-3.406,11.219-3.422h42.656v6.141 c0,11.531,9.344,20.875,20.891,20.875h169.406c11.547,0,20.891-9.344,20.891-20.875v-6.141h42.656c2.813,0,5.422,0.563,7.813,1.578 c3.578,1.516,6.672,4.063,8.844,7.281c2.156,3.234,3.406,7,3.422,11.219V462.469z'></path>{' '}
          <rect x='149.172' y='173.125' width='213.641' height='24.547'></rect> <rect x='149.172' y='240.656' width='213.641' height='24.547'></rect>
          <rect x='149.172' y='308.188' width='213.641' height='24.547'></rect> <rect x='256' y='394.125' width='106.813' height='24.563'></rect>
        </g>
      </g>
    </svg>
  )
}

function DiagnoseIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      fill='000000'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      viewBox='0 0 95.71 122.88'
    >
      <g>
        <path d='M63.33,12.26c-0.3,0-0.56-0.04-0.82-0.13c-1.33,0-2.45-1.08-2.45-2.45V4.87H36.33v4.82c0,1.24-0.99,2.32-2.2,2.41 c-0.26,0.09-0.56,0.13-0.86,0.13h-8.94v9.97h46.82v-9.98h-7.91L63.33,12.26L63.33,12.26L63.33,12.26z M17.02,101.49 c-0.67-0.99-0.4-2.34,0.6-3.01c0.99-0.67,2.34-0.41,3.01,0.6l1.19,1.75l4.69-5.71c0.76-0.93,2.13-1.06,3.05-0.3 c0.93,0.76,1.06,2.13,0.3,3.05l-6.5,7.9c-0.14,0.18-0.32,0.35-0.52,0.49c-0.99,0.67-2.34,0.4-3.01-0.6L17.02,101.49L17.02,101.49 L17.02,101.49z M40.3,101.63c-1.33,0-2.45-1.08-2.45-2.45c0-1.33,1.08-2.45,2.45-2.45h35.81c1.33,0,2.45,1.08,2.45,2.45 c0,1.33-1.08,2.45-2.45,2.45H40.3L40.3,101.63L40.3,101.63z M17.02,79.4c-0.67-0.99-0.4-2.34,0.6-3.01 c0.99-0.67,2.34-0.41,3.01,0.6l1.19,1.75l4.69-5.71c0.76-0.93,2.13-1.06,3.05-0.3c0.93,0.76,1.06,2.13,0.3,3.05l-6.5,7.9 c-0.14,0.18-0.32,0.35-0.52,0.49c-0.99,0.67-2.34,0.4-3.01-0.6L17.02,79.4L17.02,79.4L17.02,79.4z M40.3,79.54 c-1.33,0-2.45-1.08-2.45-2.45c0-1.33,1.08-2.45,2.45-2.45h35.81c1.33,0,2.45,1.08,2.45,2.45c0,1.33-1.08,2.45-2.45,2.45H40.3 L40.3,79.54L40.3,79.54z M17.36,49.24h13.45l4.39-8.89l8.3,11.97l8.44-16.46l8.77,17.18l3.39-3.11l1.76-0.69h12.49v5.2H66.86 l-7.68,7.05l-7.27-14.24l-7.75,15.12l-8.21-11.84l-1.93,3.91H17.36V49.24L17.36,49.24z M4.82,118.06h85.94V19.13 c0-0.13-0.04-0.3-0.17-0.39c-0.09-0.09-0.21-0.17-0.39-0.17H76.1v4.9c0,0.99-0.39,1.89-1.08,2.58c-0.65,0.65-1.55,1.08-2.58,1.08 H23.13c-0.99,0-1.94-0.43-2.58-1.08c-0.09-0.09-0.13-0.17-0.21-0.26c-0.52-0.65-0.86-1.47-0.86-2.32v-4.9H5.38 c-0.13,0-0.3,0.04-0.39,0.17C4.91,18.83,4.82,19,4.82,19.13V118.06L4.82,118.06z M93.31,122.77v0.11H0v-0.11v-4.71V19.13 c0-1.5,0.6-2.83,1.59-3.83s2.32-1.59,3.83-1.59h14.1v-2.67c0-0.99,0.39-1.89,1.08-2.58c0.65-0.65,1.55-1.08,2.58-1.08h8.35V4.04 c0-1.12,0.47-2.11,1.2-2.83C33.45,0.47,34.44,0,35.56,0h25.41c1.12,0,2.11,0.47,2.83,1.2c0.73,0.73,1.21,1.72,1.21,2.83v3.35h7.53 c0.99,0,1.89,0.43,2.58,1.08c0.65,0.65,1.08,1.59,1.08,2.58v2.67l14.1,0c1.5,0,2.83,0.6,3.83,1.59c0.99,0.99,1.59,2.32,1.59,3.83 v103.63H93.31L93.31,122.77z' />
      </g>
    </svg>
  )
}
