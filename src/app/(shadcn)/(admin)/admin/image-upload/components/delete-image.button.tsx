'use client'
import { deleteImageAction } from '@/app/(shadcn)/(admin)/admin/image-upload/actions/delete-image.action'
import { Button } from '@/components/ui/button'
import { toastifyActionResponse } from '@/lib/toastify-action-response'
import { TrashIcon } from '@radix-ui/react-icons'

type Props = {
  filename: string | undefined
}

const deleteImage = async (imageName: string) => {
  const resultPromise = deleteImageAction({ filename: imageName })
  toastifyActionResponse(resultPromise, { loadingMessage: 'Afbeelding verwijderen...', successMessage: (data) => `Afbeelding verwijderd!` })
}

const DeleteImageButton = (props: Props) => {
  return (
    <Button
      variant='outline'
      size='icon'
      onClick={() => {
        deleteImage(props.filename || '')
      }}
    >
      <TrashIcon className='h-4 w-4' />
    </Button>
  )
}

export default DeleteImageButton
