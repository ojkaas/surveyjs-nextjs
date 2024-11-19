'use client'

import { upsertWeightedDiagnose } from '@/app/(shadcn)/(admin)/admin/survey-definitions/link-diagnoses/[id]/_actions/upsert-weighted-diagnose'
import { weightedDiagnoseSchema } from '@/app/(shadcn)/(admin)/admin/survey-definitions/link-diagnoses/[id]/_data/schema'
import { toastifyActionResponse } from '@/lib/toastify-action-response'
import { Diagnoses, SurveyQuestionOption } from '@prisma/client'
import { motion, useAnimation } from 'framer-motion'
import { useEffect, useState } from 'react'
import { z } from 'zod'

type Props = {
  diagnosis: Diagnoses
  answer: SurveyQuestionOption
  initialWeight: number
}

const WeightToggleInput = ({ diagnosis, answer, initialWeight }: Props) => {
  const [inputValue, setInputValue] = useState(initialWeight)
  const controls = useAnimation()

  //TODO: Fix this any type
  const MotionButton = motion.button as any
  const MotionInput = motion.input as any

  const saveWeightedDiagnose = async (data: z.infer<typeof weightedDiagnoseSchema>) => {
    const actionPromise = upsertWeightedDiagnose(data)
    const successMessageCallback = (data: unknown) => `Gewicht voor diagnose opgeslagen!`
    toastifyActionResponse(actionPromise, { loadingMessage: 'Diagnose gewicht opslaan...', successMessage: successMessageCallback })
  }

  const decrement = () => {
    setInputValue((prev) => prev - 1)
    saveWeightedDiagnose({ diagnose_id: diagnosis.id, answer_id: answer.id, weight: inputValue - 1 })
  }

  const increment = () => {
    setInputValue((prev) => prev + 1)
    saveWeightedDiagnose({ diagnose_id: diagnosis.id, answer_id: answer.id, weight: inputValue + 1 })
  }

  // Function to calculate background color based on input value
  const calculateBackgroundColor = () => {
    if (inputValue === 0) {
      return 'rgb(100, 100, 100)' // White
    } else if (inputValue >= -5 && inputValue <= 5) {
      const redValue = inputValue < 0 ? 100 + Math.abs(inputValue) * 20 : 0
      const greenValue = inputValue > 0 ? 100 + inputValue * 20 : 0
      return `rgb(${redValue}, ${greenValue}, 0)`
    } else if (inputValue > 5) {
      return 'rgb(0, 200, 0)' // Green
    } else {
      return 'rgb(200, 0, 0)' // Red
    }
  }

  // uwc-debug
  useEffect(() => {
    // Start background color animation after component has mounted
    controls.start({ backgroundColor: calculateBackgroundColor() })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue])

  return (
    <div className='relative flex items-center max-w-4[rem]'>
      <MotionButton
        type='button'
        data-input-counter-decrement='quantity-input'
        onClick={decrement}
        className='bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-1 h-8 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none'
        whileTap={{
          scale: 0.8,
          borderTopLeftRadius: '90%',
          borderBottomLeftRadius: '90%',
        }}
      >
        <svg className='w-2 h-2 text-gray-900 dark:text-white' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 18 2'>
          <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M1 1h16' />
        </svg>
      </MotionButton>
      <MotionInput
        type='text'
        data-input-counter
        value={inputValue}
        className='text-white bg-gray-500 border-x-0 h-8 w-6 text-center text-sm focus:ring-blue-500 focus:border-blue-500 block py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        placeholder='0'
        required
        disabled
        animate={controls}
      />
      <MotionButton
        type='button'
        data-input-counter-increment='quantity-input'
        onClick={increment}
        className='bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-1 h-8 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none'
        whileTap={{
          scale: 0.8,
          borderTopRightRadius: '90%',
          borderBottomRightRadius: '90%',
        }}
      >
        <svg className='w-2 h-2 text-gray-900 dark:text-white' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 18 18'>
          <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 1v16M1 9h16' />
        </svg>
      </MotionButton>
    </div>
  )
}

export default WeightToggleInput
