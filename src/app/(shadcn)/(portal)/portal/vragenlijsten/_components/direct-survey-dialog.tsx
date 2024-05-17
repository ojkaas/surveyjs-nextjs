import { createSurvey } from '@/app/(shadcn)/(portal)/portal/vragenlijsten/_actions/create-survey.action'
import { createSurveySchema } from '@/app/(shadcn)/(portal)/portal/vragenlijsten/data/schema'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { toastifyActionResponse } from '@/lib/toastify-action-response'
import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

type Props = {
  closeDialog: () => void
}

export const DirectSurveyForm = ({ closeDialog }: Props) => {
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
    const actionPromise = createSurvey({ ...data, sendEmail: false })
    const loadingMessage = 'Vragenlijst aanmaken...'
    const successMessageCallback = (data: { key: string }) => `Vragenlijst met ID: '${data.key}' aangemaakt!`

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
                <p>Dit zal een vragenlijst aanmaken zonder een uitnodiging te versturen. De link die wordt gegenereerd kan gebruikt worden om de vragenlijst direct te starten.</p>
                <Button type='submit' disabled={!form.formState.isDirty && !form.formState.isValid}>
                  Vragenlijst aanmaken
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
              <h2 className='text-xl font-bold'>Vragenlijst aangemaakt.</h2>
              <p className='text-sm text-muted-foreground'>De vragenlijst is aangemaakt. Dit is uw unieke ID & Link voor referentie.</p>
            </div>
            <div className='flex items-center space-x-4'>
              <p className='font-semibold'>ID: {userKey}</p>
            </div>
            <div className='flex items-center space-x-4'>
              <p className='font-semibold'>
                <span>Link:</span>
                <span className='m-1'>
                  <Link className='hover:underline' href={`${process.env.NEXT_PUBLIC_SITE_URL}survey/${userKey}`} target='_blank'>
                    {process.env.NEXT_PUBLIC_SITE_URL}survey/{userKey}
                  </Link>
                </span>
              </p>
            </div>
            <div className='flex items-center space-x-4 pt-4'>
              <Button
                size='sm'
                onClick={() => {
                  navigator.clipboard.writeText(userKey)
                  toast.success('ID gekopieerd naar klembord.')
                }}
              >
                Kopieer ID
              </Button>
              <Button
                size='sm'
                onClick={() => {
                  navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_SITE_URL}survey/${userKey}`)
                  toast.success('Link gekopieerd naar klembord.')
                }}
              >
                Kopieer Link
              </Button>
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
