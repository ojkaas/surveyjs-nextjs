import { User, createUserSchema } from '@/app/(shadcn)/(admin)/admin/users/data/schema'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { toastifyActionResponse } from '@/lib/toastify-action-response'
import { zodResolver } from '@hookform/resolvers/zod'
import { Role } from '@prisma/client'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { createUser } from '../actions/create-user'
import { updateUser } from '../actions/update-user'

type Props = {
  closeDialog: () => void
  editMode?: boolean
  user?: User
}

export const UserForm = ({ closeDialog, editMode = false, user }: Props) => {
  const form = useForm<z.infer<typeof createUserSchema>>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: '',
      email: '',
      role: 'ADMIN',
    },
  })

  useEffect(() => {
    if (editMode && user) {
      // Fetch user data based on userId and populate the form fields
      // You can use an API call or any other method to fetch the user data
      const fetchUserData = async () => {
        try {
          form.reset({ name: user.name || '', email: user.email || '', role: user.role || Role.ADMIN })
        } catch (error) {
          console.error('Failed to fetch user data:', error)
        }
      }

      fetchUserData()
    }
  }, [editMode, user, form])

  const onSubmit = async (data: z.infer<typeof createUserSchema>) => {
    let actionPromise
    let loadingMessage
    let successMessageCallback

    if (editMode && user) {
      // Update user data
      const updatedUserData = { ...data, id: user.id }
      actionPromise = updateUser(updatedUserData)
      loadingMessage = 'Gebruiker bijwerken...'
      successMessageCallback = (data: { name: string | null }) => `Gebruiker '${data.name}' bijgewerkt!`
    } else {
      // Create new user
      actionPromise = createUser(data)
      loadingMessage = 'Gebruiker aanmaken...'
      successMessageCallback = (data: { name: string | null }) => `Gebruiker '${data.name}' aangemaakt!`
    }

    toastifyActionResponse(actionPromise, { loadingMessage, successMessage: successMessageCallback })

    const result = await actionPromise
    if (result.data) {
      closeDialog()
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => onSubmit(data))} className='space-y-8'>
        <fieldset className='space-y-8' disabled={form.formState.isSubmitting}>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Naam</FormLabel>
                <FormControl>
                  <Input placeholder='Anne Appelboom' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='anne@appelboom.nl' {...field} disabled={editMode} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='role'
            render={({ field }) => (
              <FormItem className='space-y-3'>
                <FormLabel>Gebruikers rol</FormLabel>
                <FormControl>
                  <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className='flex flex-col space-y-1'>
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='ADMIN' />
                      </FormControl>
                      <FormLabel className='font-normal'>Administrator</FormLabel>
                    </FormItem>
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='PORTAL' />
                      </FormControl>
                      <FormLabel className='font-normal'>Specialist</FormLabel>
                    </FormItem>
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='USER' />
                      </FormControl>
                      <FormLabel className='font-normal'>Gebruiker</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' disabled={!form.formState.isDirty && !form.formState.isValid}>
            {editMode ? 'Gebruiker aanpassen' : 'Gebruiker aanmaken'}
          </Button>
          <Button variant={'link'} type='button' onClick={closeDialog}>
            Annuleren
          </Button>
        </fieldset>
      </form>
    </Form>
  )
}
