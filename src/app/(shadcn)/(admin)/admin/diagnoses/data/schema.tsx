import { z } from 'zod'

const descriptionValidation = z.string({ required_error: 'Verplicht veld' }).min(2, {
  message: 'Omschrijving moet minimaal 2 karakters zijn.',
})

export const diagnosisSchema = z.object({
  id: z.string(),
  name: z.string({ required_error: 'Verplicht veld' }).min(2, {
    message: 'Naam moet minimaal 2 karakters zijn.',
  }),
  description: descriptionValidation.nullable(),
  personToContact: z.enum(['OOGARTS', 'OPTOMETRIST', 'HUISARTS', 'OPTICIEN', 'ORTHOPTIST', 'NEUROLOOG'], { required_error: 'Verplicht veld' }),
  personToContactZiekenhuis: z.enum(['OOGARTS', 'OPTOMETRIST', 'ORTHOPTIST', 'BASISARTS'], { required_error: 'Verplicht veld' }),
  accessTime: z.string({ required_error: 'Verplicht veld' }).nullable(),
  treatment: z.string().optional().nullable(),
})

export type Diagnosis = z.infer<typeof diagnosisSchema>

export const createDiagnosisSchema = diagnosisSchema.omit({ id: true }).extend({ description: descriptionValidation.optional(), accessTime: z.string().optional(), treatment: z.string().optional() })
export const updateDiagnosisSchema = diagnosisSchema.extend({ description: descriptionValidation.optional(), accessTime: z.string().optional(), treatment: z.string().optional() })
export const deleteDiagnosisSchema = diagnosisSchema.pick({ id: true })
