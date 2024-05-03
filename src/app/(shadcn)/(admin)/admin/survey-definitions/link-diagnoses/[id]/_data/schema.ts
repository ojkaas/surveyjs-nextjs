import { z } from 'zod'

export const weightedDiagnoseSchema = z.object({
  diagnose_id: z.string(),
  answer_id: z.string(),
  weight: z.number(),
})
