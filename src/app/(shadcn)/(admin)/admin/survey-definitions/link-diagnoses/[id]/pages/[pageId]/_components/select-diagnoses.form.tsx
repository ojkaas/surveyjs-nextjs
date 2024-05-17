'use client'
import { linkDiagnosesAction } from '@/app/(shadcn)/(admin)/admin/survey-definitions/link-diagnoses/[id]/pages/[pageId]/_actions/link-diagnoses.action'
import { linkDiagnoseSchema } from '@/app/(shadcn)/(admin)/admin/survey-definitions/link-diagnoses/[id]/pages/[pageId]/_data/schema'
import { SurveyPageWithLinkedDiagnosis } from '@/app/(shadcn)/(admin)/admin/survey-definitions/link-diagnoses/[id]/pages/[pageId]/page'
import { Button } from '@/components/ui/button'
import { MultiSelect, SelectItem } from '@/components/ui/custom/multi-select'
import { toastifyActionResponse } from '@/lib/toastify-action-response'
import { Diagnoses } from '@prisma/client'
import { useState } from 'react'
import { z } from 'zod'

type Props = {
  diagnoses: Diagnoses[]
  page: SurveyPageWithLinkedDiagnosis
}

const linkDiagnoseToPage = async (data: z.infer<typeof linkDiagnoseSchema>) => {
  const actionPromise = linkDiagnosesAction(data)
  const successMessageCallback = () => `Diagnoses gekoppeld aan pagina!`
  toastifyActionResponse(actionPromise, { loadingMessage: 'Diagnoses koppelen aan pagina...', successMessage: successMessageCallback })
}

const SelectDiagnosesForm = ({ diagnoses, page }: Props) => {
  const linkedDiagnosesItems = page.activeDiagnoses ? page.activeDiagnoses.map((diagnose) => ({ value: diagnose.id, label: diagnose.name })) : []
  const [selected, setSelected] = useState<SelectItem[]>(linkedDiagnosesItems)

  const items = diagnoses.map((diagnose) => ({ value: diagnose.id, label: diagnose.name })).filter((diagnose) => !selected.map((s) => s.value).includes(diagnose.value))

  return (
    <div>
      <MultiSelect items={items} selected={selected} setSelected={setSelected} placeholder='Selecteer diagnoses' />
      <Button
        onClick={() => {
          linkDiagnoseToPage({ diagnoses: selected.map((i) => ({ id: i.value })), pageId: page.id })
        }}
      >
        Koppelen
      </Button>
    </div>
  )
}

export default SelectDiagnosesForm
