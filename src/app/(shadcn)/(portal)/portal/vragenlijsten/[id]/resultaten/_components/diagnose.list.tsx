// eslint-disable-next-line prettier/prettier
import { Progress } from '@/components/ui/progress';

type Props = {
  weightedDiagnoses: { total: number; weights: { weight: number; minMaxNormalizedWeight: number; softMaxNormalizedWeight: number; zScore: number; diagnose: { name: string } }[] }
  testMode?: boolean
}

const DiagnoseResultList = ({ weightedDiagnoses, testMode }: Props) => {
  return (
    <>
      <h3 className='text-lg font-semibold'>Diagnose overzicht</h3>

      <div className='space-y-3 pt-3'>
        <h4 className='text-lg font-semibold'>Absoluut bepaling</h4>
        {weightedDiagnoses.weights.map((diagnose) => (
          <div key={diagnose.diagnose.name} className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <div className='h-2 w-2 rounded-full bg-green-500' />
              <p className='font-medium truncate w-56'>{diagnose.diagnose.name}</p>
            </div>
            <div className='flex items-center gap-2'>
              <span className='font-medium'>{Math.floor((diagnose.weight / weightedDiagnoses.total) * 100)}%</span>
              <Progress className='h-3 w-24' value={(diagnose.weight / weightedDiagnoses.total) * 100} />
              {testMode && (
                <div className='space-y-3 w-4'>
                  <span className='font-medium'>[{diagnose.weight}]</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className='space-y-3  pt-5'>
        <h4 className='text-lg font-semibold'>Min/Max normalisatie</h4>
        {weightedDiagnoses.weights.map((diagnose) => (
          <div key={diagnose.diagnose.name} className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <div className='h-2 w-2 rounded-full bg-green-500' />
              <p className='font-medium truncate w-56'>{diagnose.diagnose.name}</p>
            </div>
            <div className='flex items-center gap-2'>
              <span className='font-medium'>{Math.floor(diagnose.minMaxNormalizedWeight)}%</span>
              <Progress className='h-3 w-24' value={diagnose.minMaxNormalizedWeight} />
            </div>
          </div>
        ))}
      </div>

      <div className='space-y-3 pt-5'>
        <h4 className='text-lg font-semibold'>SoftMax normalisatie</h4>
        {weightedDiagnoses.weights.map((diagnose) => (
          <div key={diagnose.diagnose.name} className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <div className='h-2 w-2 rounded-full bg-green-500' />
              <p className='font-medium truncate w-56'>{diagnose.diagnose.name}</p>
            </div>
            <div className='flex items-center gap-2'>
              <span className='font-medium'>{Math.floor(diagnose.softMaxNormalizedWeight)}%</span>
              <Progress className='h-3 w-24' value={diagnose.softMaxNormalizedWeight} />
            </div>
          </div>
        ))}
      </div>

      <div className='space-y-3 pt-5'>
        <h4 className='text-lg font-semibold'>ZScore</h4>
        {weightedDiagnoses.weights.map((diagnose) => (
          <div key={diagnose.diagnose.name} className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <div className='h-2 w-2 rounded-full bg-green-500' />
              <p className='font-medium truncate w-56'>{diagnose.diagnose.name}</p>
            </div>
            <div className='flex items-center gap-2'>
              <span className='font-medium'>{Math.floor(diagnose.zScore)}%</span>
              <Progress className='h-3 w-24' value={diagnose.zScore} />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default DiagnoseResultList
