import { createSurvey } from '@/app/(shadcn)/(portal)/portal/vragenlijsten/actions/create-survey.action'
import { createSurveySchema } from '@/app/(shadcn)/(portal)/portal/vragenlijsten/data/schema'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toastifyActionResponse } from '@/lib/toastify-action-response'
import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

type Props = {
  closeDialog: () => void
}

export const SurveyForm = ({ closeDialog }: Props) => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [userKey, setUserKey] = useState('')

  const form = useForm<z.infer<typeof createSurveySchema>>({
    resolver: zodResolver(createSurveySchema),
    defaultValues: {
      name: '',
      email: '',
    },
  })

  const onSubmit = async (data: z.infer<typeof createSurveySchema>) => {
    const actionPromise = createSurvey(data)
    const loadingMessage = 'Uitnodiging versturen...'
    const successMessageCallback = (data: { key: string }) => `Uitnodiging met ID: '${data.key}' aangemaakt!`

    toastifyActionResponse(actionPromise, { loadingMessage, successMessage: successMessageCallback })

    const result = await actionPromise
    if (result.data) {
      setIsSubmitted(true)
      setUserKey(result.data.key)
    }
  }

  return (
    <AnimatePresence mode='wait'>
      <motion.div key={isSubmitted ? 'form' : 'result'} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} transition={{ duration: 0.2 }}>
        {!isSubmitted ? (
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
                        <Input placeholder='Jan Janssen' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder='jan@janssen.nl' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type='submit' disabled={!form.formState.isDirty && !form.formState.isValid}>
                  Uitnodiging versturen
                </Button>
                <Button variant={'link'} type='button' onClick={closeDialog}>
                  Annuleren
                </Button>
              </fieldset>
            </form>
          </Form>
        ) : (
          <>
            <div className='mb-5'>
              <h2 className='text-xl font-bold'>Uitnodiging verstuurd.</h2>
              <p className='text-sm text-muted-foreground'>De uitnodiging is succesvol verstuurd. Dit is uw unieke ID voor referentie.</p>
            </div>
            <div className='flex items-center space-x-4'>
              <p className='font-semibold'>ID: {userKey}</p>
              <Button
                size='sm'
                onClick={() => {
                  navigator.clipboard.writeText(userKey)
                  toast.success('ID gekopieerd naar klembord.')
                }}
              >
                Kopieer ID
              </Button>
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
