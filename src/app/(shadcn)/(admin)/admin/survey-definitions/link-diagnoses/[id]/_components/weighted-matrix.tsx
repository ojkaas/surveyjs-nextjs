import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Diagnoses } from '@prisma/client'
import { SurveyQuestion } from 'survey-react-ui'

type Props = {
  diagnosis: Diagnoses[]
  question: SurveyQuestion
}

export default function WeigthedDiagnoseMatrix() {
  return (
    <Card className='m-4'>
      <CardHeader>
        <CardTitle>Diagnosis Matrix</CardTitle>
        <CardDescription>Enter values for each diagnosis and question to complete the matrix.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-6 gap-4'>
          <div className='col-span-1' />
          <div className='col-span-1 font-medium'>Answer 1</div>
          <div className='col-span-1 font-medium'>Answer 2</div>
          <div className='col-span-1 font-medium'>Answer 3</div>
          <div className='col-span-1 font-medium'>Answer 4</div>
          <div className='col-span-1 font-medium'>Answer 5</div>
          <div className='col-span-1 font-medium'>Diagnosis 1</div>
          <Input className='col-span-1' type='number' />
          <Input className='col-span-1' type='number' />
          <Input className='col-span-1' type='number' />
          <Input className='col-span-1' type='number' />
          <Input className='col-span-1' type='number' />
          <div className='col-span-1 font-medium'>Diagnosis 2</div>
          <Input className='col-span-1' type='number' />
          <Input className='col-span-1' type='number' />
          <Input className='col-span-1' type='number' />
          <Input className='col-span-1' type='number' />
          <Input className='col-span-1' type='number' />
          <div className='col-span-1 font-medium'>Diagnosis 3</div>
          <Input className='col-span-1' type='number' />
          <Input className='col-span-1' type='number' />
          <Input className='col-span-1' type='number' />
          <Input className='col-span-1' type='number' />
          <Input className='col-span-1' type='number' />
          <div className='col-span-1 font-medium'>Diagnosis 4</div>
          <Input className='col-span-1' type='number' />
          <Input className='col-span-1' type='number' />
          <Input className='col-span-1' type='number' />
          <Input className='col-span-1' type='number' />
          <Input className='col-span-1' type='number' />
          <div className='col-span-1 font-medium'>Diagnosis 5</div>
          <Input className='col-span-1' type='number' />
          <Input className='col-span-1' type='number' />
          <Input className='col-span-1' type='number' />
          <Input className='col-span-1' type='number' />
          <Input className='col-span-1' type='number' />
        </div>
      </CardContent>
    </Card>
  )
}
