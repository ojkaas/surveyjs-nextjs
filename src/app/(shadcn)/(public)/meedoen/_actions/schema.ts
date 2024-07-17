import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z.string({ required_error: 'Verplicht veld' }).min(2, {
    message: 'Naam moet minimaal 2 karakters zijn.',
  }),
  email: z.string({ required_error: 'Verplicht veld' }).email({ message: 'Ongeldig emailadres' }),
  practice: z.string().min(2, 'Praktijk naam moet minimaal 2 karakters zijn.').optional().or(z.literal('')),
  phone: z.string({ required_error: 'Verplicht veld' }).min(10, { message: 'Telefoonnummer moet minimaal 10 karakters zijn.' }),
  message: z.string().optional(),
  token: z.string({ required_error: 'CAPTCHA validatie mislukt!' }),
})
