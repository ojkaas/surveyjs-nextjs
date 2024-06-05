'use client'
import ValidationDialog from '@/components/forms/validation.dialog'
import { FC, ReactNode, cloneElement, useState } from 'react'

export type ValidationResponse = {
  status: 'ok' | 'error' | 'warning'
  title: string
  message?: string
  detailedErrors?: string[]
}

export interface ValidationAction {
  (): Promise<ValidationResponse>
}

interface Props {
  validationAction: ValidationAction
  executeAction: () => any
  children: ReactNode
}

const ValidateAndExecute: FC<Props> = ({ validationAction, executeAction, children }) => {
  const [showModal, setShowModal] = useState(false)
  const [validationResult, setValidationResult] = useState<ValidationResponse | undefined>({ status: 'ok', title: 'Success' })
  const handleExecute = async () => {
    const validationResponse = await validationAction()

    if (validationResponse.status === 'ok') {
      executeAction()
    } else {
      setValidationResult(validationResponse)
      setShowModal(true)
    }
  }

  const childElement = cloneElement(children as React.ReactElement, {
    onClick: handleExecute,
  })

  return (
    <>
      {childElement}

      <ValidationDialog showModal={showModal} validationResult={validationResult} setShowModal={setShowModal} executeAction={executeAction} />
    </>
  )
}

export default ValidateAndExecute
