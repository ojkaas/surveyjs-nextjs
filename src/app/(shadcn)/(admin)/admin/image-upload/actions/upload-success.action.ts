'use server'

import { authAdminAction } from '@/lib/safe-actions'
import { revalidateTag } from 'next/cache'

export const uploadSuccessAction = authAdminAction({}, async () => {
  revalidateTag('images')
})
