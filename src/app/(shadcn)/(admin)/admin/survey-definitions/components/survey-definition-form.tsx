'use client'
import { createSurveyDefinition } from '@/app/(shadcn)/(admin)/admin/survey-definitions/actions/create-survey-definition'
import { updateSurveyDefinition } from '@/app/(shadcn)/(admin)/admin/survey-definitions/actions/update-survey-definition'
import { SurveyDefinition, createSurveyDefinitionSchema } from '@/app/(shadcn)/(admin)/admin/survey-definitions/data/schema'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toastifyActionResponse } from '@/lib/toastify-action-response'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type Props = {
  closeDialog: () => void
  editMode?: boolean
  copyMode?: boolean
  surveyDefinition?: SurveyDefinition
}

export const SurveyDefinitionForm = ({ closeDialog, editMode = false, copyMode = false, surveyDefinition }: Props) => {
  const router = useRouter()
  const form = useForm<z.infer<typeof createSurveyDefinitionSchema>>({
    resolver: zodResolver(createSurveyDefinitionSchema),
    defaultValues: {
      name: '',
      notes: '',
      version: '',
    },
  })

  useEffect(() => {
    if ((editMode || copyMode) && surveyDefinition) {
      let version = surveyDefinition.version
      let name = surveyDefinition.name
      if (copyMode) {
        version = tryUpdateVersionNumber(version)
        name = surveyDefinition.name + ' (kopie)'
      }

      const fetchUserData = async () => {
        try {
          form.reset({ name: name || '', notes: surveyDefinition.notes || '', version: version || '' })
        } catch (error) {
          console.error('Failed to fetch survey definition data:', error)
        }
      }

      fetchUserData()
    }
  }, [editMode, copyMode, surveyDefinition, form])

  const onSubmit = async (data: z.infer<typeof createSurveyDefinitionSchema>) => {
    let actionPromise
    let loadingMessage
    let successMessageCallback

    if (editMode && surveyDefinition) {
      // Update user data
      const updatedSurveyDefinition = { ...data, id: surveyDefinition.id }
      actionPromise = updateSurveyDefinition(updatedSurveyDefinition)
      loadingMessage = 'Vragenlijst bijwerken...'
      successMessageCallback = (data: { name: string | null }) => `Vragenlijst '${data.name}' bijgewerkt!`
    } else {
      // Create new user
      if (copyMode && surveyDefinition) {
        const surveyDefinitionWithData = { ...data, data: surveyDefinition.data, internalVersion: surveyDefinition.internalVersion }
        actionPromise = createSurveyDefinition(surveyDefinitionWithData)
      }

      actionPromise = createSurveyDefinition(data)
      loadingMessage = 'Vragenlijst aanmaken...'
      successMessageCallback = (data: { name: string | null }) => (
        <>
          <div>Vragenlijst &apos;{data.name}&apos; aangemaakt! 🎉</div>
          <div>De Creator wordt geopend!</div>
        </>
      )
    }

    toastifyActionResponse(actionPromise, { loadingMessage, successMessage: successMessageCallback })

    const result = await actionPromise
    if (result.data) {
      if (editMode) closeDialog()
      else {
        //wait a bit so user can see the success message
        await new Promise((resolve) => setTimeout(resolve, 1000))
        router.push('/admin/survey-definitions/creator/' + result.data.id)
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => onSubmit(data))} className='space-y-8'>
        <fieldset className='space-y-8' disabled={form.formState.isSubmitting}>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Naam</FormLabel>
                <FormControl>
                  <Input placeholder='Vragenlijst oogdiagnose' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='version'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Versie</FormLabel>
                <FormControl>
                  <Input placeholder='1.0.0' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='notes'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notities</FormLabel>
                <FormControl>
                  <Textarea className='h-40' placeholder='In deze versie zijn extra keuzes omtrent ooglidproblemen toegevoegd.' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <Button type='submit' disabled={!form.formState.isDirty && !form.formState.isValid}>
              {editMode ? 'Vragenlijst aanpassen' : 'Vragenlijst aanmaken*'}
            </Button>
            <Button variant={'link'} type='button' onClick={closeDialog}>
              Annuleren
            </Button>
          </div>
        </fieldset>
      </form>
    </Form>
  )
}
function tryUpdateVersionNumber(version: string) {
  const versionParts = version.split('.')
  const lastPart = versionParts[versionParts.length - 1]
  const incrementedLastPart = parseInt(lastPart) + 1

  if (isNaN(incrementedLastPart)) {
    return 'latest'
  }

  versionParts[versionParts.length - 1] = incrementedLastPart.toString()
  return versionParts.join('.')
}
