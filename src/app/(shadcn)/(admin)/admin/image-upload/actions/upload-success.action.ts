'use server'

import { authAction } from '@/lib/safe-actions'
import { revalidateTag } from 'next/cache'

export const uploadSuccessAction = authAction({}, async () => {
  revalidateTag('images')
})
