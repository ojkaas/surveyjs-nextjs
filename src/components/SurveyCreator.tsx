'use client'

import { addCreatorDataToSurveyDefinition } from '@/app/(shadcn)/(admin)/admin/survey-definitions/_actions/update-survey-definition'
import { Button } from '@/components/ui/button'
import { toastifyActionResponse } from '@/lib/toastify-action-response'
import { JsonValue } from '@prisma/client/runtime/library'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import 'survey-core/defaultV2.css'
import { editorLocalization, ICreatorOptions } from 'survey-creator-core'
import 'survey-creator-core/i18n/dutch'
import 'survey-creator-core/survey-creator-core.min.css'
import { SurveyCreator, SurveyCreatorComponent } from 'survey-creator-react'

const defaultCreatorOptions: ICreatorOptions = {
  showLogicTab: false,
  showJSONEditorTab: false,
  isAutoSave: false,
  showTranslationTab: false,
  questionTypes: ['boolean', 'text', 'checkbox', 'radiogroup', 'dropdown', 'imagepicker', 'rating', 'ranking'],
}

export function SurveyCreatorWidget(props: { json?: JsonValue; options?: ICreatorOptions; id: string }) {
  let [creator, setCreator] = useState<SurveyCreator>()

  const SSR = typeof window === 'undefined'

  useEffect(() => {
    const newCreator = new SurveyCreator(props.options || defaultCreatorOptions)
    newCreator.saveSurveyFunc = (no: number, callback: (num: number, status: boolean) => void) => {
      const updateResult = addCreatorDataToSurveyDefinition({ id: props.id, data: newCreator.JSON, internalVersion: no.toString() })
      toastifyActionResponse(updateResult, {
        loadingMessage: 'Vragenlijst bijwerken...',
        successMessage(data) {
          return (
            <>
              <div>Vragenlijst {data.name} bijgewerkt!</div>
              <div>
                <Button asChild>
                  <Link href={`/admin/survey-definitions/link-diagnoses/${data.id}`}>Diagnose koppelen</Link>
                </Button>
              </div>
            </>
          )
        },
      })
      callback(no, true)
    }
    editorLocalization.currentLocale = 'nl'
    newCreator.locale = 'nl'
    newCreator.JSON = props.json
    newCreator.toolbox.getItemByName('imagepicker').json.choices = [
      {
        value: 'antwoordA',
        imageLink: 'https://s3.ojkaas.nl/images/KAACODE.png',
      },
      {
        value: 'antwoordB',
        imageLink: 'https://s3.ojkaas.nl/images/KAACODE.png',
      },
    ]
    setCreator(newCreator)
  }, [props.json, props.options, props.id])

  return (
    <>
      {!SSR && creator && (
        <div style={{ height: '90vh', width: '100%' }}>
          <SurveyCreatorComponent creator={creator} />
        </div>
      )}
    </>
  )
}
