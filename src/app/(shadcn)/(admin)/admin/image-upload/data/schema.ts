import { z } from 'zod'

const MAX_FILE_SIZE = 1024 * 1024 * 5 // 5MB
const ACCEPTED_IMAGE_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

export const requestUploadUrl = z.object({
  filename: z.string(),
})

export const deleteImage = z.object({
  filename: z.string(),
})

export const uploadFileForm = z.object({
  image: z
    .custom<FileList>()
    .refine((files) => files?.length === 1, 'Selecteer een bestand.')
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE
    }, `Maximale afbeedling grote is 5MB.`)
    .refine((files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type), 'Alleen .jpg, .jpeg, .png and .webp afbeeldingen zijn ondersteund.'),
})
