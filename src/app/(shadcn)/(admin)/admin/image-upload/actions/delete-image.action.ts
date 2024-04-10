'use server'

import { deleteImage } from '@/app/(shadcn)/(admin)/admin/image-upload/data/schema'
import { authAction } from '@/lib/safe-actions'
import { s3Client } from '@/lib/utils/s3-file-management'
import { revalidateTag } from 'next/cache'

export const deleteImageAction = authAction(deleteImage, async (deleteImage) => {
  s3Client.removeObject(process.env.S3_BUCKET_NAME || '', deleteImage.filename)
  revalidateTag('images')
  return true
})
