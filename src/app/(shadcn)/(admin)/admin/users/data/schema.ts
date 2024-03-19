import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const userSchema = z.object({
  id: z.string(),
  name: z.optional(z.string().nullable()),
  email: z.string().nullable(),
  emailVerified: z.date().nullable(),
  image: z.optional(z.string().nullable()),
  role: z.enum(['ADMIN', 'PORTAL', 'USER']),
})

export type User = z.infer<typeof userSchema>

export const createUserSchema = z.object({
  name: z.string({ required_error: 'Verplicht veld' }).min(2, {
    message: 'Naam moet minimaal 2 karakters zijn.',
  }),
  email: z.string({ required_error: 'Verplicht veld' }).email({ message: 'Dit is geen geldig e-mailadres.' }),
  role: z.enum(['ADMIN', 'PORTAL', 'USER'], { required_error: 'Verplicht veld' }),
})

export const updateUserSchema = z.object({
  id: z.string(),
  name: z.string({ required_error: 'Verplicht veld' }).min(2, {
    message: 'Naam moet minimaal 2 karakters zijn.',
  }),
  role: z.enum(['ADMIN', 'PORTAL', 'USER'], { required_error: 'Verplicht veld' }),
})

export type CreateUser = z.infer<typeof createUserSchema>

export const userIdSchema = z.object({
  id: z.string(),
})

export type DeleteUser = z.infer<typeof createUserSchema>
