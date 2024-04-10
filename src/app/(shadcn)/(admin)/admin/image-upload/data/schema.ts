import { z } from 'zod'

const MAX_FILE_SIZE = 1024 * 1024 * 10 // 10MB
const ACCEPTED_IMAGE_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

export const requestUploadUrl = z.object({
  filename: z.string(),
})

export const uploadFileForm = z.object({
  image: z
    .custom<FileList>()
    .refine((files) => files?.length === 1, 'Please select a file.')
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE
    }, `Max image size is 5MB.`)
    .refine((files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type), 'Only .jpg, .jpeg, .png and .webp formats are supported.'),
})
