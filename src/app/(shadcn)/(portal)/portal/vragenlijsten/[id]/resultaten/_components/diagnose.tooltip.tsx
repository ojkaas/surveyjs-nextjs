import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { JSX, SVGProps } from 'react'

type Props = {
  weightedDiagnoses: { total: number; weights: { weight: number; diagnose: { name: string } }[] }
}

export default function DiagnoseTooltip({ weightedDiagnoses }: Props) {
  return (
    <TooltipProvider delayDuration={350}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant='outline'>
            <InfoIcon className='h-5 w-5' />
            <span className='sr-only'>Bekijk mogelijke diagnoses</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent className='w-[420px] space-y-4 p-4 bg-white text-black border-2'>
          <h3 className='text-lg font-semibold'>Diagnose overzicht</h3>
          <div className='space-y-3'>
            {weightedDiagnoses.weights.map((diagnose) => (
              <div key={diagnose.diagnose.name} className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <div className='h-2 w-2 rounded-full bg-green-500' />
                  <p className='font-medium truncate w-56'>{diagnose.diagnose.name} asddsa asdas asdsad</p>
                </div>
                <div className='flex items-center gap-2'>
                  <span className='font-medium'>{Math.floor((diagnose.weight / weightedDiagnoses.total) * 100)}%</span>
                  <Progress className='h-3 w-24' value={(diagnose.weight / weightedDiagnoses.total) * 100} />
                </div>
              </div>
            ))}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

function InfoIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
      <circle cx='12' cy='12' r='10' />
      <path d='M12 16v-4' />
      <path d='M12 8h.01' />
    </svg>
  )
}
