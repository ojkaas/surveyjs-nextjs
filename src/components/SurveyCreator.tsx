'use client'

import { addCreatorDataToSurveyDefinition } from '@/app/(shadcn)/(admin)/admin/survey-definitions/actions/update-survey-definition'
import { toastifyActionResponse } from '@/lib/toastify-action-response'
import { JsonValue } from '@prisma/client/runtime/library'
import { useEffect, useState } from 'react'
import 'survey-core/defaultV2.css'
import { ICreatorOptions, editorLocalization } from 'survey-creator-core'
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
    console.log('Calling useEffect in SurveyCreatorWidget.tsx')
    const newCreator = new SurveyCreator(props.options || defaultCreatorOptions)
    newCreator.saveSurveyFunc = (no: number, callback: (num: number, status: boolean) => void) => {
      console.log('Saving survey')
      console.log(JSON.stringify(newCreator?.JSON))
      const updateResult = addCreatorDataToSurveyDefinition({ id: props.id, data: newCreator.JSON, internalVersion: no.toString() })
      toastifyActionResponse(updateResult, {
        loadingMessage: 'Vragenlijst bijwerken...',
        successMessage(data) {
          return `Vragenlijst '${data.name}' bijgewerkt!`
        },
      })
      callback(no, true)
    }
    editorLocalization.currentLocale = 'nl'
    newCreator.locale = 'nl'
    newCreator.JSON = props.json
    newCreator.toolbox.getItemByName('imagepicker').json.choices = [
      {
        value: 'lion',
        imageLink: 'https://surveyjs.io/Content/Images/examples/image-picker/lion.jpg',
      },
      {
        value: 'giraffe',
        imageLink: 'https://surveyjs.io/Content/Images/examples/image-picker/giraffe.jpg',
      },
    ]
    setCreator(newCreator)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.json, props.options])

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
