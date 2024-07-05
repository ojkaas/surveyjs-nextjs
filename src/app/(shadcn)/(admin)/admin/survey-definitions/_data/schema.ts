import { z } from 'zod'

const literalSchema = z.union([z.string(), z.number(), z.boolean(), z.null()])
type Literal = z.infer<typeof literalSchema>
export type Json = Literal | { [key: string]: Json } | Json[]
const jsonSchema: z.ZodType<Json> = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]))

export const surveyDefinitionSchema = z.object({
  id: z.string(),
  name: z.string(),
  data: jsonSchema.nullable(),
  version: z.string(),
  internalVersion: z.string().nullable(),
  active: z.boolean(),
  notes: z.string().nullable(),
  questionCount: z.number().nullable().optional(),
})

export type SurveyDefinition = z.infer<typeof surveyDefinitionSchema>

export const updateSurveyDefinitionSchema = surveyDefinitionSchema.omit({ internalVersion: true, active: true, data: true }).omit({ questionCount: true }).extend({ notes: z.string().optional() })
export const addCreatorDataToSurveyDefinitionSchema = surveyDefinitionSchema.omit({ name: true, active: true, notes: true, version: true }).extend({ notes: z.string().optional() })
export const createSurveyDefinitionSchema = surveyDefinitionSchema
  .omit({ id: true, questionCount: true })
  .extend({ notes: z.string().optional(), internalVersion: z.string().nullable().optional(), active: z.boolean().optional(), data: jsonSchema.nullable().optional() })

export const createSurveyDefinitionActionSchema = createSurveyDefinitionSchema.extend({ copyOf: z.string().optional() })

export type CreateSurvey = z.infer<typeof createSurveyDefinitionSchema>

export const deleteSurveyDefinitionSchema = surveyDefinitionSchema.pick({ id: true })
export const retrieveSurveyDefinitionSchema = surveyDefinitionSchema.pick({ id: true })
export const activateSurveyDefinitionSchema = surveyDefinitionSchema.pick({ id: true })

export const dummySchema = z.object({
  go: z.boolean().optional(),
})
