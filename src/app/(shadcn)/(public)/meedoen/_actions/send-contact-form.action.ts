'use server'
import { contactFormSchema } from '@/app/(shadcn)/(public)/meedoen/_actions/schema'
import { ServerActionError } from '@/lib/action-error'
import { sendMail } from '@/lib/mailer/mail.transporter'
import { publicAction } from '@/lib/safe-actions'

export const sendContactFormAction = publicAction(contactFormSchema, async (contactForm) => {
  const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

  const formData = new FormData()
  formData.append('secret', process.env.TURNSTILE_SECRET_KEY!)
  formData.append('response', contactForm.token)

  try {
    const result = await fetch(url, {
      body: formData,
      method: 'POST',
    })

    const outcome = await result.json()

    if (outcome.success) {
      await sendMail({
        templateName: 'contact.hbs',
        templateData: contactForm,
        to: 'info@oogned.nl',
        subject: 'OOGNED - Verzoek ontvangen',
      })
      return { success: true }
    } else {
      throw new ServerActionError('Captcha verificatie mislukt! Probeer het opnieuw, of neem contact met ons op via info@oogned.nl')
    }
  } catch (err) {
    throw new ServerActionError('Captcha verificatie mislukt! Probeer het opnieuw, of neem contact met ons op via info@oogned.nl')
  }
})
