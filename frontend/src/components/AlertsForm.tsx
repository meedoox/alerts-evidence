'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { getAlertById, updateAlert, createAlert } from '@/services/alerts'
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

interface AlertFormProps {
  alertId?: number
  isEditMode?: boolean
}

export function AlertForm({
  alertId = undefined,
  isEditMode = false,
}: AlertFormProps) {
  const router = useRouter()
  const [defaultValues, setDefaultValues] = useState<FormData>({
    name: '',
    age: '0',
    note: '',
    file: null,
  })

  useEffect(() => {
    if (isEditMode && alertId) {
      console.log('in')
      const loadAlert = async () => {
        try {
          const data = await getAlertById(alertId)
          console.log(data)
          setDefaultValues({
            name: data.name,
            age: data.age.toString(),
            note: data.note || '',
            file: null,
          })
          console.log(defaultValues)
        } catch (error) {
          console.error('Failed to load alert:', error)
        }
      }
      loadAlert()
    }
  }, [alertId, isEditMode])

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  useEffect(() => {
    if (defaultValues) {
      console.log('defaultValues changed:', defaultValues)
      form.reset(defaultValues)
    }
  }, [defaultValues])

  async function onSubmit(values: FormData) {
    try {
      const formData = new FormData()
      formData.append('name', values.name)
      formData.append('age', values.age.toString())
      if (values.note) formData.append('note', values.note)
      if (values.file && values.file[0]) formData.append('file', values.file[0])

      if (isEditMode && alertId) {
        await updateAlert(alertId, formData)
        router.push(`/alerts/${alertId}`)
      } else {
        const response = await createAlert(formData)
        router.push(`/alerts/${response.id}`)
      }
    } catch (error) {
      console.error(
        isEditMode ? 'Failed to update alert:' : 'Failed to create alert:',
        error
      )
    }
  }

  if (!defaultValues) {
    return <div>Loading...</div>
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Who is not feeling well? <span className='text-red-500'>*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder='Enter name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='age'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Age <span className='text-red-500'>*</span>
              </FormLabel>
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
                <Input
                  placeholder='Additional note (optional)'
                  {...field}
                  defaultValue={defaultValues.note}
                />
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
                  <Label htmlFor='file'>
                    {isEditMode ? 'Upload New File' : 'File'}
                  </Label>
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
        <div className='flex justify-between'>
          <Button
            type='button'
            variant='outline'
            onClick={() => router.push(`/alerts/${alertId}`)}
          >
            Back to Alert
          </Button>
          <Button type='submit'>{isEditMode ? 'Update' : 'Create'}</Button>
        </div>
      </form>
    </Form>
  )
}
