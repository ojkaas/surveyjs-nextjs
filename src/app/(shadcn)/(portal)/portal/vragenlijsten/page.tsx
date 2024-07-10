import { surveyColumns } from '@/app/(shadcn)/(portal)/portal/vragenlijsten/_components/survey-columns'
import { SurveyTableToolbar } from '@/app/(shadcn)/(portal)/portal/vragenlijsten/_components/survey-table-toolbar'
import { DataTable } from '@/components/data-table/data-table'
import prisma from '@/db/db'
import { authOptions } from '@/lib/config/auth/auth-options'
import { getServerSession } from 'next-auth'
import { unstable_cache } from 'next/cache'

type Props = {}

const getSurveys = unstable_cache(async (userId: string) => prisma.survey.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } }), ['user-surveys'], { tags: ['surveys'] })

const Page = async (props: Props) => {
  const session = await getServerSession(authOptions)
  if (!session) return false

  const surveys = await getSurveys(session.user.id)
  return (
    <>
      <div className='h-full container flex-1 flex-col space-y-8 p-8 flex'>
        <div className='flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Vragenlijsten</h2>
            <p className='text-muted-foreground text-xs'>Lijst van verstuurde vragenlijsten.</p>
          </div>
        </div>
        <DataTable data={surveys} columns={surveyColumns} toolbar={SurveyTableToolbar} />
      </div>
    </>
  )
}

export default Page
