'use client'
import WeightToggleInput from '@/app/(shadcn)/(admin)/admin/survey-definitions/link-diagnoses/[id]/_components/weight-toggle-input'
import { ColumnDefWithVisibility } from '@/components/data-table/data-table'
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { DataTableWithSkewedHeaders } from '@/components/data-table/data-table-with-skewed-headers'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Diagnoses, Prisma, SurveyDefinition, WeightedDiagnose } from '@prisma/client'
import { CellContext, HeaderContext } from '@tanstack/react-table'
import Link from 'next/link'
import { useMemo } from 'react'

const questionWithDetails = Prisma.validator<Prisma.SurveyQuestionDefaultArgs>()({
  include: { surveyPage: true, answers: true },
})

type SurveyQuestionWithDetails = Prisma.SurveyQuestionGetPayload<typeof questionWithDetails>

type Props = {
  diagnosis: Diagnoses[]
  question: SurveyQuestionWithDetails
  weightedDiagnoses: WeightedDiagnose[]
  survey: SurveyDefinition
  nextId: string | null
}

type WeigthedDiagnoseData = {
  diagnosisId: string
  answerId: string
  weight: number
}

export default function WeigthedDiagnoseMatrix({ diagnosis, question, weightedDiagnoses, nextId, survey }: Props) {
  /*
  const [weightedDiagnoses, setWeightedDiagnoses] = useState<WeigthedDiagnoseData[]>([])
  const [actionsProcessed, setActionsProcessed] = useState(true)

  let timeoutId: NodeJS.Timeout

  const processWeightChange = useCallback(
    (diagnosisId: string, answerId: string, weight: number) => {
      console.log('diagnosisId:', diagnosisId, 'answerId:', answerId, 'weight:', weight)
      //Update the weightedDiagnoses if a record with diagnosisId and answerId already exists update it, otherwise append a new record.
      const existingRecordIndex = weightedDiagnoses.findIndex((record) => record.diagnosisId === diagnosisId && record.answerId === answerId)
      if (existingRecordIndex > -1) {
        const updatedWeightedDiagnoses = [...weightedDiagnoses]
        updatedWeightedDiagnoses[existingRecordIndex].weight = weight
        setWeightedDiagnoses(updatedWeightedDiagnoses)
      } else {
        setWeightedDiagnoses((prevWeightedDiagnoses) => [...prevWeightedDiagnoses, { diagnosisId, answerId, weight }])
      }

      
    if (!actionsProcessed) {
      clearTimeout(timeoutId)
      setActionsProcessed(false)
      timeoutId = setTimeout(saveWeightedDiagnoses, 1500)
    }
      console.log('Weighted Diagnoses:', weightedDiagnoses)
    },
    [weightedDiagnoses]
  )

  const saveWeightedDiagnoses = () => {
    // Perform your action here
    setActionsProcessed(true)
    console.log('Delayed action performed')
  }*/

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedDiagnostic = useMemo(() => diagnosis, [])

  const answerColumns: ColumnDefWithVisibility<Diagnoses>[] = useMemo(() => {
    return [
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
        header: ({ column }: HeaderContext<Diagnoses, unknown>) => (
          <DataTableColumnHeader className='w-7 writing-mode-rl' angled={true} column={column} title={answer.text ? answer.text : 'Geen Tekst gevonden'} />
        ),
        enableSorting: false,
        enableHiding: false,
        cell: ({ row }: CellContext<Diagnoses, unknown>) => {
          const weightedDiagnose = weightedDiagnoses.find((wd) => wd.diagnoseId === row.original.id && wd.surveyAnswerId === answer.id)
          const initialWeight = weightedDiagnose ? weightedDiagnose.weight : 0
          return (
            <div className='p-1'>
              <WeightToggleInput answer={answer} diagnosis={row.original} initialWeight={initialWeight} />
            </div>
          )
        },
      })),
    ]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Card className='m-4'>
        <CardHeader>
          <CardTitle>Diagnose Matrix</CardTitle>
          <CardDescription className='max-w-[600px]'>
            Geef een positief gewicht aan een diagnose als een antwoord van een vraag indicatie geeft van deze diagnose. Als een antwoord juist de diagnose uitsluit geef dan negatief gewicht.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col space-y-1.5'>
            <h3 className='font-semibold leading-none tracking-tight'>Vraag: </h3>
            <p className='text-sm text-muted-foreground'>{question.title}</p>
          </div>
          <DataTableWithSkewedHeaders data={memoizedDiagnostic} columns={answerColumns} />
          {nextId && (
            <div className='flex justify-end mt-4'>
              <Button variant={'default'} asChild>
                <Link href={`/admin/survey-definitions/link-diagnoses/${survey.id}/questions/${nextId}`}>Volgende vraag</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  )
}
