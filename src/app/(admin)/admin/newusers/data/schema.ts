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
