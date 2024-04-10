/**
 * v0 by Vercel.
 * @see https://v0.dev/t/bhC02Yk0ma5
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import CopyUrlButton from '@/app/(shadcn)/(admin)/admin/image-upload/components/copy-url.button'
import DeleteImageButton from '@/app/(shadcn)/(admin)/admin/image-upload/components/delete-image.button'
import { UploadFileForm } from '@/app/(shadcn)/(admin)/admin/image-upload/components/upload-file.form'
import NextCloudImage from '@/components/image/next-cloudimage'
import { s3Client } from '@/lib/utils/s3-file-management'
import { DateTime } from 'luxon'
import { BucketItem } from 'minio'
import { unstable_cache } from 'next/cache'

const getFiles = unstable_cache(
  async () => {
    return new Promise<BucketItem[]>((resolve, reject) => {
      const dataArray: BucketItem[] = [] // Array to collect data

      const objectStream = s3Client.listObjectsV2(process.env.S3_BUCKET_NAME || '')

      objectStream.on('data', (data) => {
        // Add data to the array
        dataArray.push(data)
      })

      objectStream.on('end', () => {
        // Resolve the promise with the collected data array
        resolve(dataArray)
      })

      objectStream.on('error', (error) => {
        // Reject the promise if there's an error
        reject(error)
      })
    })
  },
  ['all-images'],
  { tags: ['images'] }
)

export default async function ImageUploadPage() {
  const files = await getFiles()

  return (
    <>
      <UploadFileForm />
      <div className='flex flex-col w-full gap-4 p-4 md:gap-8 md:p-6'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 border rounded-lg p-4 md:gap-8'>
          {files.map((file) => (
            <div className='flex items-center gap-4' key={file.name}>
              <NextCloudImage src={`https://clzjyyuyna.cloudimg.io/${process.env.S3_BUCKET_NAME}/${file.name}`} alt='Test' className='h-52 w-52 aspect-video rounded-md object-cover overflow-hidden' />
              <div className='flex-1 grid gap-1 text-sm'>
                <p className='line-clamp-2'>
                  <b>Naam: </b>
                  {file.name}
                </p>
                <p className='line-clamp-2'>
                  <b>Toegevoegd: </b> {file.lastModified ? DateTime.fromJSDate(new Date(file.lastModified)).toRelative({ locale: 'nl' }) : '-'}
                </p>
                <div className='flex gap-1 text-sm'>
                  <DeleteImageButton filename={file.name} />
                  <CopyUrlButton url={`https://clzjyyuyna.cloudimg.io/${process.env.S3_BUCKET_NAME}/${file.name}?func=cropfit&gravity=smart&aspect_ratio=1`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
