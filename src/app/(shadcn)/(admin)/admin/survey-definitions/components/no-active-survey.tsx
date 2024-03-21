import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type Props = {}

const NoActiveSurveyDefinition = (props: Props) => {
  return (
    <Card>
      <CardHeader>
        <div className='text-center'>
          <CardTitle>Geen vragenlijst actief!</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className='text-center'>
          <div className='text-center space-y-2'>
            <span className='px-2 inline-flex items-center justify-center rounded-full bg-red-500 text-sm font-medium text-gray-50'>
              Er is geen actieve vragenlijst! Activeer een vragenlijst om het systeem te kunnen gebruiken!
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default NoActiveSurveyDefinition
