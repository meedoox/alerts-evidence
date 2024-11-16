'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { createAlert } from '@/services/alerts'
import { useRouter } from 'next/navigation'
import { Label } from './ui/label'

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  age: z
    .string()
    .min(1, { message: 'Age must be at least 1.' })
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), {
      message: 'Age must be a valid number.',
    }),
  note: z.string().optional(),
  file: z.any().optional(),
})
type FormData = z.infer<typeof formSchema>

export function AlertForm() {
  const router = useRouter()
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      age: 0,
      note: '',
      file: false,
    },
  })

  async function onSubmit(values: FormData) {
    try {
      const formData = new FormData()
      formData.append('name', values.name)
      formData.append('age', values.age.toString())
      if (values.note) formData.append('note', values.note)
      if (values.file && values.file[0]) formData.append('file', values.file[0])

      await createAlert(formData)
      router.push('/reports')
    } catch (error) {
      console.error('Failed to create alert:', error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='Enter name' {...field} />
              </FormControl>
              <FormDescription>
                Enter the name of the person reporting.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='age'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input type='number' placeholder='Enter age' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='note'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note</FormLabel>
              <FormControl>
                <Input placeholder='Additional note (optional)' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='file'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                  <Label htmlFor='file'>File</Label>
                  <Input
                    id='file'
                    type='file'
                    onChange={(e) => field.onChange(e.target.files)}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  )
}
