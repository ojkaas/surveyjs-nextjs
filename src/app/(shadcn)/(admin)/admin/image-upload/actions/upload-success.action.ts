'use server'

import { dummySchema } from '@/app/(shadcn)/(admin)/admin/survey-definitions/_data/schema'
import { authAdminAction } from '@/lib/safe-actions'
import { revalidatePath, revalidateTag } from 'next/cache'

export const uploadSuccessAction = authAdminAction.schema(dummySchema).action(async () => {
  revalidateTag('images')
  revalidatePath('/admin/image-upload')
})
