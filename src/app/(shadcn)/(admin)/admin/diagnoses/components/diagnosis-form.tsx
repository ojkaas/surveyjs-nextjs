import { createDiagnosis } from '@/app/(shadcn)/(admin)/admin/diagnoses/actions/create-diagnosis'
import { updateDiagnosis } from '@/app/(shadcn)/(admin)/admin/diagnoses/actions/update-diagnosis'
import { Diagnosis, createDiagnosisSchema } from '@/app/(shadcn)/(admin)/admin/diagnoses/data/schema'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { toastifyActionResponse } from '@/lib/toastify-action-response'
import { zodResolver } from '@hookform/resolvers/zod'
import { PersonToContact } from '@prisma/client'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type Props = {
  closeDialog: () => void
  editMode?: boolean
  diagnosis?: Diagnosis
}

export const DiagnosisForm = ({ closeDialog, editMode = false, diagnosis }: Props) => {
  const form = useForm<z.infer<typeof createDiagnosisSchema>>({
    resolver: zodResolver(createDiagnosisSchema),
    defaultValues: {
      name: '',
      description: '',
      personToContact: 'OOGARTS',
      personToContactZiekenhuis: 'OOGARTS',
      treatment: '',
      accessTime: '24uur',
    },
  })

  useEffect(() => {
    if (editMode && diagnosis) {
      const fetchUserData = async () => {
        try {          
          form.reset({
            name: diagnosis.name || '',
            description: diagnosis.description || '',
            personToContact: diagnosis.personToContact || PersonToContact.OOGARTS,
            personToContactZiekenhuis: diagnosis.personToContactZiekenhuis || PersonToContact.OOGARTS,
            treatment: diagnosis.treatment || '',
            accessTime: diagnosis.accessTime || '24uur',
          })
        } catch (error) {
          console.error('Failed to fetch diagnosis data:', error)
        }
      }

      fetchUserData()
    }
  }, [editMode, diagnosis, form])

  const onSubmit = async (data: z.infer<typeof createDiagnosisSchema>) => {
    let actionPromise
    let loadingMessage
    let successMessageCallback

    if (editMode && diagnosis) {
      // Update user data
      const updatedDiagnosisData = { ...data, id: diagnosis.id }
      actionPromise = updateDiagnosis(updatedDiagnosisData)
      loadingMessage = 'Diagnose bijwerken...'
      successMessageCallback = (data: { name: string | null }) => `Diagnose '${data.name}' bijgewerkt!`
    } else {
      // Create new user
      actionPromise = createDiagnosis(data)
      loadingMessage = 'Diagnose aanmaken...'
      successMessageCallback = (data: { name: string | null }) => `Diagnose '${data.name}' aangemaakt!`
    }

    toastifyActionResponse(actionPromise, { loadingMessage, successMessage: successMessageCallback })

    const result = await actionPromise
    if (result.data) {
      closeDialog()
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
                  <Input placeholder='Fluxus Neuralis Hyperkineticus' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Omschrijving</FormLabel>
                <FormControl>
                  <Textarea
                    className='h-52 lg:h-32 lg:w-[600px]'
                    placeholder='Fluxus Neuralis Hyperkineticus Transdimensionalis (FNHT)" is een denkbeeldige aandoening die wordt gekenmerkt door een abnormale en ongecontroleerde toestand van neuronale activiteit in de ...'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='treatment'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Behandeling</FormLabel>
                <FormControl>
                  <Textarea className='h-52 lg:h-32 lg:w-[600px]' placeholder='Beschrijf hier de aanbevolen behandeling...' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col md:flex-row gap-24">
          <FormField
            control={form.control}
            name='personToContact'
            render={({ field }) => (
              <FormItem className='space-y-3'>
                <FormLabel>Contactpersoon (Ziekenhuis)</FormLabel>
                <FormControl>
                  <RadioGroup onValueChange={field.onChange} value={field.value} className='flex flex-col space-y-1'>
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='OOGARTS' />
                      </FormControl>
                      <FormLabel className='font-normal'>Oogarts</FormLabel>
                    </FormItem>
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='OPTOMETRIST' />
                      </FormControl>
                      <FormLabel className='font-normal'>Optometrist</FormLabel>
                    </FormItem>
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='OPTICIEN' />
                      </FormControl>
                      <FormLabel className='font-normal'>Opticien</FormLabel>
                    </FormItem>
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='ORTHOPTIST' />
                      </FormControl>
                      <FormLabel className='font-normal'>Orthoptist</FormLabel>
                    </FormItem>
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='HUISARTS' />
                      </FormControl>
                      <FormLabel className='font-normal'>Huisarts</FormLabel>
                    </FormItem>
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='NEUROLOOG' />
                      </FormControl>
                      <FormLabel className='font-normal'>Neuroloog</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='personToContactZiekenhuis'
            render={({ field }) => (
              <FormItem className='space-y-3'>
                <FormLabel>Contactpersoon  (Huisarts)</FormLabel>
                <FormControl>
                  <RadioGroup onValueChange={field.onChange} value={field.value} className='flex flex-col space-y-1'>
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='OOGARTS' />
                      </FormControl>
                      <FormLabel className='font-normal'>Oogarts</FormLabel>
                    </FormItem>
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='OPTOMETRIST' />
                      </FormControl>
                      <FormLabel className='font-normal'>Optometrist</FormLabel>
                    </FormItem>
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='OPTICIEN' />
                      </FormControl>
                      <FormLabel className='font-normal'>Opticien</FormLabel>
                    </FormItem>
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='ORTHOPTIST' />
                      </FormControl>
                      <FormLabel className='font-normal'>Orthoptist</FormLabel>
                    </FormItem>
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='HUISARTS' />
                      </FormControl>
                      <FormLabel className='font-normal'>Huisarts</FormLabel>
                    </FormItem>
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='NEUROLOOG' />
                      </FormControl>
                      <FormLabel className='font-normal'>Neuroloog</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>
          <FormField
            control={form.control}
            name='accessTime'
            render={({ field }) => (
              <FormItem className='space-y-3'>
                <FormLabel>Toegangstijd</FormLabel>
                <FormControl>
                  <RadioGroup onValueChange={field.onChange} value={field.value} className='flex flex-col space-y-1'>
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem key='Binnen 24 uur' value='24uur' />
                      </FormControl>
                      <FormLabel className='font-normal'>Binnen 24 uur</FormLabel>
                    </FormItem>
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='Binnen 2 to 4 werkdagen' />
                      </FormControl>
                      <FormLabel className='font-normal'>Binnen 2 to 4 werkdagen</FormLabel>
                    </FormItem>
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='Binnen twee weken' />
                      </FormControl>
                      <FormLabel className='font-normal'>Binnen twee weken</FormLabel>
                    </FormItem>
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='Binnen 4 weken' />
                      </FormControl>
                      <FormLabel className='font-normal'>Binnen 4 weken</FormLabel>
                    </FormItem>
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='Binnen 1-3 maanden' />
                      </FormControl>
                      <FormLabel className='font-normal'>Binnen 1-3 maanden</FormLabel>
                    </FormItem>
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='Reguliere tijd' />
                      </FormControl>
                      <FormLabel className='font-normal'>Reguliere tijd</FormLabel>
                    </FormItem>
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='Niet' />
                      </FormControl>
                      <FormLabel className='font-normal'>Niet</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' disabled={!form.formState.isDirty && !form.formState.isValid}>
            {editMode ? 'Diagnose aanpassen' : 'Diagnose aanmaken'}
          </Button>
          <Button variant={'link'} type='button' onClick={closeDialog}>
            Annuleren
          </Button>
        </fieldset>
      </form>
    </Form>
  )
}
