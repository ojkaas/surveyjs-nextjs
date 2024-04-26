'use client'
import WeightToggleInput from '@/app/(shadcn)/(admin)/admin/survey-definitions/link-diagnoses/[id]/_components/weight-toggle-input'
import { ColumnDefWithVisibility, DataTable } from '@/components/data-table/data-table'
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Diagnoses, Prisma } from '@prisma/client'
import { CellContext, HeaderContext } from '@tanstack/react-table'

const questionWithDetails = Prisma.validator<Prisma.SurveyQuestionDefaultArgs>()({
  include: { surveyPage: true, answers: true },
})

type SurveyQuestionWithDetails = Prisma.SurveyQuestionGetPayload<typeof questionWithDetails>

type Props = {
  diagnosis: Diagnoses[]
  question: SurveyQuestionWithDetails
}

export default function WeigthedDiagnoseMatrix({ diagnosis, question }: Props) {
  const answerColumns: ColumnDefWithVisibility<any>[] = [
    {
      accessorKey: 'diagnose',
      header: ({ column }) => <DataTableColumnHeader column={column} title='       ' />,
      cell: ({ row }) => {
        return (
          <div className='flex space-x-2'>
            <span className='max-w-[500px] truncate font-medium'>{row.original.name}</span>
          </div>
        )
      },
      enableSorting: false,
      enableHiding: false,
    },
    ...question.answers.map((answer) => ({
      size: 60,
      maxSize: 60,
      minSize: 60,
      id: answer.id,
      accessorKey: answer.id,
      header: ({ column }: HeaderContext<any, unknown>) => <DataTableColumnHeader className='w-20 h-8' angled={true} column={column} title={answer.text ? answer.text : 'GeenText'} />,
      enableSorting: false,
      enableHiding: false,
      cell: ({ row }: CellContext<any, unknown>) => {
        return (
          <div className='p-1'>
            <WeightToggleInput />
          </div>
        )
      },
    })),
  ]

  return (
    <>
      <Card className='m-4'>
        <CardHeader>
          <CardTitle>Diagnosis Matrix</CardTitle>
          <CardDescription>Enter values for each diagnosis and question to complete the matrix.</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable data={diagnosis} columns={answerColumns} />
        </CardContent>
      </Card>
    </>
  )
}
