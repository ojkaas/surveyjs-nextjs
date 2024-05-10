import { z } from 'zod'

const diagnoseLinkObject = z.object({
  id: z.string(),
})

export const linkDiagnoseSchema = z.object({
  pageId: z.string(),
  diagnoses: z.array(diagnoseLinkObject),
})
