'use server'

import { requestUploadUrl } from '@/app/(shadcn)/(admin)/admin/image-upload/data/schema'
import { authAction } from '@/lib/safe-actions'
import { s3Client } from '@/lib/utils/s3-file-management'

export const requestPresignedUrl = authAction(requestUploadUrl, async (uploadFile) => {
  try {
    return await s3Client.presignedPutObject(process.env.S3_BUCKET_NAME || '', uploadFile.filename, 60 * 60)
  } catch (error) {
    console.error('Failed to request presigned URL:', error)
    //throw error
  }
})
