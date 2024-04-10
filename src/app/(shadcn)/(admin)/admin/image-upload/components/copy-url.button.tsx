'use client'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

type Props = {
  url: string
}

const copyToClipboard = async (url: string) => {
  try {
    await navigator.clipboard.writeText(url)
    toast.success('URL gekopieerd naar klembord.')
  } catch (error) {
    console.log(error)
  }
}

const CopyUrlButton = (props: Props) => {
  return (
    <Button
      className='p-1 w-52 md:w-1/2  rounded-md text-xs'
      onClick={() => {
        copyToClipboard(props.url)
      }}
    >
      Kopieer URL
      <span className='sr-only'>URL gekopieerd</span>
    </Button>
  )
}

export default CopyUrlButton
