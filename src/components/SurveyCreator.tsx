'use client'

import { requestPresignedUrl } from '@/app/(shadcn)/(admin)/admin/image-upload/actions/request-presigned-url.action'
import { addCreatorDataToSurveyDefinition, validateCreateData } from '@/app/(shadcn)/(admin)/admin/survey-definitions/_actions/update-survey-definition'
import { ValidationResponse } from '@/components/forms/validate-and-execute.button'
import ValidationDialog from '@/components/forms/validation.dialog'
import { Button } from '@/components/ui/button'
import { toastifyActionResponse } from '@/lib/toastify-action-response'
import { JsonValue } from '@prisma/client/runtime/library'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ComputedUpdater } from 'survey-core'
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

export function SurveyCreatorWidget(props: { json?: JsonValue; options?: ICreatorOptions; id: string; showDiagnoseCallback?: (survey: string, openChanges: boolean) => void }) {
  let [creator, setCreator] = useState<SurveyCreator>()

  const [showModal, setShowModal] = useState(false)
  const [validationResult, setValidationResult] = useState<ValidationResponse | undefined>({ status: 'ok', title: 'Success' })
  const [executeAction, setExecuteAction] = useState<() => any>(() => {})

  const SSR = typeof window === 'undefined'

  useEffect(() => {
    async function executeSave(newCreator: SurveyCreator, no: number, callback: (num: number, status: boolean) => void, status: boolean = true) {
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
      const result = await updateResult
      if (result.data) setShowModal(false)
      callback(no, status)
    }

    const newCreator = new SurveyCreator(props.options || defaultCreatorOptions)
    newCreator.saveSurveyFunc = async (no: number, callback: (num: number, status: boolean) => void) => {
      const validationPromise = validateCreateData({ id: props.id, data: newCreator.JSON, internalVersion: no.toString() })

      toastifyActionResponse(validationPromise, {
        loadingMessage: 'Vragenlijst valideren...',
        successMessage: (data: ValidationResponse) => (data.status == 'ok' ? 'Vragenlijst is geldig.' : 'Problemen gevonden in de vragenlijst.'),
      })

      const validationResult = await validationPromise

      if (validationResult.data && validationResult.data.status == 'ok') {
        executeSave(newCreator, no, callback)
      } else {
        setValidationResult(validationResult.data)
        setExecuteAction(() => () => executeSave(newCreator, no, callback))
        setShowModal(true)
        if (validationResult.data?.status == 'error') callback(no, false)
      }
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
    newCreator.onUploadFile.add((sender, options) => {
      options.files.forEach(async function (file) {
        const response = await requestPresignedUrl({ filename: file.name })
        if (response.data) {
          const result = await fetch(response.data, {
            method: 'PUT',
            body: file,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
              'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
            },
          })
          if (result.ok) {
            const url = response.data.split('?')[0]
            const filename = url.split('/').pop()
            const cdnUrl = `${process.env.NEXT_PUBLIC_IMAGE_URL}/${filename}`

            options.callback('success', cdnUrl)
          } else {
            options.callback('error')
          }
        }
      })
    })

    if (props.showDiagnoseCallback !== undefined) {
      newCreator.onSurveyInstanceCreated.add(function (sender, options) {
        if (options.reason == 'test') {
          var survey = options.survey
          survey.addNavigationItem({
            id: 'survey_show_diagnoses',
            title: '[Test] Diagnose Tonen',
            visibleIndex: 49,
            visible: new ComputedUpdater(() => {
              return survey.isLastPage
            }),
            action: () => {
              props.showDiagnoseCallback!(survey.data, newCreator.state == 'modified' || newCreator.state == 'saving')
            },
          })
        }
      })
    }
    setCreator(newCreator)
  }, [props.json, props.options, props.id, props.showDiagnoseCallback])

  return (
    <>
      {!SSR && creator && (
        <div style={{ height: '90vh', width: '100%' }}>
          <SurveyCreatorComponent creator={creator} />
          <ValidationDialog showModal={showModal} validationResult={validationResult} setShowModal={setShowModal} executeAction={executeAction} />
        </div>
      )}
    </>
  )
}
