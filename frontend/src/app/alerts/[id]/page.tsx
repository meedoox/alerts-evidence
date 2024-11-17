'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { deleteAlert, getAlertById } from '@/services/alerts'
import { Alert } from '@/types/alert'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { format } from 'date-fns'
import { ConfirmationDialog } from '@/components/ConfirmDialog'
import { Trash2 } from 'lucide-react'

export default function AlertDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const [alert, setAlert] = useState<Alert | null>(null)

  useEffect(() => {
    const loadAlert = async () => {
      if (!id) return
      try {
        const data = await getAlertById(Number(id))
        setAlert(data)
      } catch (error) {
        console.error('Failed to load alert:', error)
      }
    }
    loadAlert()
  }, [id])

  if (!alert) {
    return <div>Loading...</div>
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteAlert(id)
      setAlert(null)
      router.push('/alerts')
    } catch (error) {
      console.error('Failed to delete alert:', error)
    }
  }

  return (
    <div>
      <div className='grid'>
        <Card className='h-full'>
          <CardHeader>
            <CardTitle>Alert Detail</CardTitle>
            <CardDescription>
              <div className='flex space-x-3'>
                <span>Created:</span>
                <span>
                  {alert?.createdAt
                    ? format(alert.createdAt, 'yyyy-MM-dd HH:mm')
                    : 'No date available'}
                </span>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid w-full items-center gap-4'>
              <div className='flex space-x-3'>
                <span>Name:</span>
                <span>{alert.name}</span>
              </div>
              <div className='flex space-x-3'>
                <span>Age:</span>
                <span>{alert.age}</span>
              </div>
              <div className='flex space-x-3'>
                <span>Note:</span>
                <span>{alert.note}</span>
              </div>
              {alert.file && (
                <div>
                  <Label>File:</Label>
                  <a
                    href={alert.file}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Download File
                  </a>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className='flex justify-between'>
            <Button variant='outline' onClick={() => router.push('/alerts')}>
              Back to Alerts
            </Button>
            <div className='space-x-4 flex'>
              <ConfirmationDialog
                trigger={
                  <Button variant='destructive' size='icon'>
                    <Trash2 />
                  </Button>
                }
                title='Are you absolutely sure?'
                description='This action cannot be undone. This will permanently delete this alert.'
                confirmText='Delete'
                onConfirm={() => handleDelete(alert.id)}
              />
              <Button onClick={() => router.push(`/alerts/edit/${alert.id}`)}>
                Edit Alert
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
