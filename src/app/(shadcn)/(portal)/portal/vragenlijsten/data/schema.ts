import { z } from 'zod'

export const surveySchema = z.object({
  id: z.string(),
  key: z.string(),
  available: z.boolean(),
  finished: z.boolean(),
})

export type Survey = z.infer<typeof surveySchema>

export const createSurveySchema = z.object({
  email: z.string(),
  name: z.string().optional(),
})

export const createSurveyActionSchema = createSurveySchema.extend({
  sendEmail: z.boolean(),
  email: z.string().optional(),
})

export type CreateSurvey = z.infer<typeof createSurveySchema>
