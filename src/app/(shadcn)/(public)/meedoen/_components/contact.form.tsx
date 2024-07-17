'use client'
import { contactFormSchema } from '@/app/(shadcn)/(public)/meedoen/_actions/schema'
import { sendContactFormAction } from '@/app/(shadcn)/(public)/meedoen/_actions/send-contact-form.action'
import DebugErrorsPanel from '@/components/forms/debug-errors'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toastifyActionResponse } from '@/lib/toastify-action-response'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircledIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Turnstile from 'react-turnstile'
import { z } from 'zod'

type Props = {}

const ContactForm = (props: Props) => {
  const [formSent, setFormSent] = useState(false)
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      practice: '',
      phone: '',
      message: '',
      token: '',
    },
  })

  const setToken = (token: string) => form.setValue('token', token)

  const onSubmit = async (data: z.infer<typeof contactFormSchema>) => {
    // Create new user
    const actionPromise = sendContactFormAction(data)
    const loadingMessage = 'Verzoek verzenden...'

    toastifyActionResponse(actionPromise, { loadingMessage, successMessage: () => `Verzoek is verzonden!` })

    const result = await actionPromise

    if (result.data) {
      setFormSent(true)
      form.reset()
    }
  }

  return (
    <>
      {formSent && (
        <>
          <p className='mt-3 text-sm text-muted-foreground inline-flex items-center'>
            <CheckCircledIcon className='mr-2' /> Bedankt voor uw verzoek! We nemen zo snel mogelijk contact met u op.
          </p>
        </>
      )}
      {!formSent && (
        <Form {...form}>
          <DebugErrorsPanel errors={form.formState.errors} />
          <form onSubmit={form.handleSubmit((data) => onSubmit(data))} className='space-y-8'>
            <fieldset className='space-y-8' disabled={form.formState.isSubmitting}>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Naam*</FormLabel>
                    <FormControl>
                      <Input placeholder='Vul uw naam in' {...field} />
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
                    <FormLabel>Email*</FormLabel>
                    <FormControl>
                      <Input placeholder='Vul uw email in' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='practice'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Praktijk naam</FormLabel>
                    <FormControl>
                      <Input placeholder='Vul uw praktijk naam in' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefoonnummer*</FormLabel>
                    <FormControl>
                      <Input placeholder='Vul uw telefoonnummer in' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='message'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bericht</FormLabel>
                    <FormControl>
                      <Textarea className='h-52' placeholder='Hier kunt u aanvullende informatie toevoegen' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Turnstile sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!} onVerify={(token) => setToken(token)} />
              <Button type='submit' className='w-full' disabled={!form.formState.isDirty && !form.formState.isValid}>
                Verzoek opsturen
              </Button>
            </fieldset>
          </form>
        </Form>
      )}
    </>
  )
}

export default ContactForm
