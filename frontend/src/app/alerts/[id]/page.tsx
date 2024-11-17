'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { getAlertById } from '@/services/alerts'
import { Alert } from '@/types/alert'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

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
    <div className='space-y-8'>
      <h1 className='text-2xl font-bold'>Alert Detail</h1>
      <div className='space-y-4'>
        <div>
          <Label>Name:</Label>
          <div>{alert.name}</div>
        </div>
        <div>
          <Label>Age:</Label>
          <div>{alert.age}</div>
        </div>
        <div>
          <Label>Note:</Label>
          <div>{alert.note || 'No note provided'}</div>
        </div>
        {alert.file && (
          <div>
            <Label>File:</Label>
            <a href={alert.file} target='_blank' rel='noopener noreferrer'>
              Download File
            </a>
          </div>
        )}
      </div>
      <Button variant='outline' onClick={() => router.push('/reports')}>
        Back to Alerts
      </Button>
    </div>
  )
}
