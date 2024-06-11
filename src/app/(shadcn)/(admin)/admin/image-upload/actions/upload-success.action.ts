'use server'

import { authAdminAction } from '@/lib/safe-actions'
import { revalidatePath, revalidateTag } from 'next/cache'

export const uploadSuccessAction = authAdminAction({}, async () => {
  revalidateTag('images')
  revalidatePath('/admin/image-upload')
})
