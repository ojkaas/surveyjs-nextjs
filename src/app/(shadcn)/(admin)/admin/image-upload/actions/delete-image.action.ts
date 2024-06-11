'use server'

import { deleteImage } from '@/app/(shadcn)/(admin)/admin/image-upload/data/schema'
import { authAdminAction } from '@/lib/safe-actions'
import { s3Client } from '@/lib/utils/s3-file-management'
import { revalidatePath, revalidateTag } from 'next/cache'

export const deleteImageAction = authAdminAction(deleteImage, async (deleteImage) => {
  s3Client.removeObject(process.env.S3_BUCKET_NAME || '', deleteImage.filename)
  revalidateTag('images')
  revalidatePath('/admin/image-upload')
  return true
})
