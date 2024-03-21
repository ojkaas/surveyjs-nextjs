/**
 * v0 by Vercel.
 * @see https://v0.dev/t/bhC02Yk0ma5
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default async function ImageUploadPage() {
  //const test = await s3Client.presignedPutObject('images', 'oogned.png', 60 * 60)
  return (
    <div className='flex flex-col w-full gap-4 p-4 md:gap-8 md:p-6'>
      <div className='border rounded-lg p-4'>
        <div className='flex flex-col gap-2'>
          <h1 className='text-2xl font-semibold'>Upload</h1>
          <p className='max-w-prose'>Upload uw afbeeldingen en ontvang een URL om ze te delen of in te bedden. Maximale bestandsgrootte 10MB. Ondersteunde bestandstypen: jpg, png, gif, webp.</p>
        </div>
        <div className='flex flex-col gap-4 mt-4'>
          <div className='flex flex-col gap-2'>
            <Label className='text-base' htmlFor='file'>
              Selecteer afbeeldingen om te uploaden.
            </Label>
            <Input accept='image/*' className='w-full' id='file' multiple type='file' />
          </div>
          <Button>Upload</Button>
        </div>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 border rounded-lg p-4 md:gap-8'>
        <div className='flex items-center gap-4'>
          <img alt='Image' className='aspect-video rounded-md object-cover overflow-hidden' height='100' src='/placeholder.svg' width='150' />
          <div className='flex-1 grid gap-1 text-sm'>
            <p className='line-clamp-2'>/images/lorem-ipsum-dolor-sit-amet-consectetur-adipiscing-elit</p>
            <Button className='p-1 bg-gray-200 rounded-md text-xs hover:bg-gray-300'>
              Kopieer URL
              <span className='sr-only'>URL gekopieerd</span>
            </Button>
          </div>
        </div>
        <div className='flex items-center gap-4'>
          <img alt='Image' className='aspect-video rounded-md object-cover overflow-hidden' height='100' src='/placeholder.svg' width='150' />
          <div className='flex-1 grid gap-1 text-sm'>
            <p className='line-clamp-2'>/images/lorem-ipsum-dolor-sit-amet-consectetur-adipiscing-elit</p>
            <Button className='p-1 bg-gray-200 rounded-md text-xs hover:bg-gray-300'>
              Kopieer URL
              <span className='sr-only'>URL gekopieerd</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
