import DiagnoseResultList from '@/app/(shadcn)/(portal)/portal/vragenlijsten/[id]/resultaten/_components/diagnose.list'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import { JSX, SVGProps } from 'react'

type Props = {
  weightedDiagnoses: { total: number; weights: { weight: number; minMaxNormalizedWeight: number; softMaxNormalizedWeight: number; zScore: number; diagnose: { name: string } }[] }
}

export default function DiagnoseTooltip({ weightedDiagnoses }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>
          <InfoCircledIcon className='h-5 w-5' />
          <span className='sr-only'>Bekijk mogelijke diagnoses</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='w-[420px] space-y-4 p-4 bg-white text-black border-2'>
        <DialogHeader>
          <DialogTitle>Mogelijke diagnoses</DialogTitle>
        </DialogHeader>
        <DiagnoseResultList weightedDiagnoses={weightedDiagnoses} />
      </DialogContent>
    </Dialog>
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
