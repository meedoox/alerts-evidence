'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { getAlertById } from '@/services/alerts'
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
            <Button variant='outline' onClick={() => router.push('/reports')}>
              Back to Alerts
            </Button>
            <Button>Edit Alert</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
