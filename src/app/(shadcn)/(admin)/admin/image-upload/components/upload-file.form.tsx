'use client'
import { requestPresignedUrl } from '@/app/(shadcn)/(admin)/admin/image-upload/actions/request-presigned-url.action'
import { uploadSuccessAction } from '@/app/(shadcn)/(admin)/admin/image-upload/actions/upload-success.action'
import { uploadFileForm } from '@/app/(shadcn)/(admin)/admin/image-upload/data/schema'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

type Props = {}

export const UploadFileForm = (props: Props) => {
  const form = useForm<z.infer<typeof uploadFileForm>>({
    resolver: zodResolver(uploadFileForm),
    defaultValues: {
      image: undefined,
    },
  })

  const onSubmit = async (data: z.infer<typeof uploadFileForm>) => {
    const result = await requestPresignedUrl({ filename: data.image[0].name })
    if (result?.data) {
      fetch(result.data, {
        method: 'PUT',
        body: data.image[0],
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
        },
      }).then(() => {
        uploadSuccessAction({ go: true })
        form.reset()
        toast.success('Afbeelding succesvol geüpload.')
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => onSubmit(data))} className='space-y-8'>
        <div className='border rounded-lg p-4 md:w-1/2 md:p-6 m-6'>
          <div className='flex flex-col gap-2'>
            <h1 className='text-2xl font-semibold'>Upload</h1>
            <p className='max-w-prose'>
              Upload uw afbeelding en ontvang een URL die is te gebruiken in een vragenlijst. Maximale bestandsgrootte 10MB. Ondersteunde bestandstypen: jpg, png, gif, webp.
            </p>
          </div>
          <div className='flex flex-col gap-4 mt-4'>
            <div className='flex flex-col gap-2'>
              <FormField
                control={form.control}
                name='image'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Selecteer afbeelding om te uploaden.</FormLabel>
                    <FormControl>
                      <Input
                        accept='image/*'
                        className='w-full'
                        id='file'
                        data-testid='image-upload'
                        type='file'
                        onBlur={field.onBlur}
                        name={field.name}
                        onChange={(e) => {
                          field.onChange(e.target.files)
                        }}
                        ref={field.ref}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Label className='text-base' htmlFor='file'></Label>
            </div>
            <Button>Upload afbeelding</Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
