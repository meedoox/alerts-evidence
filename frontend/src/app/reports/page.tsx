'use client'

import { AlertsTable, ReportsTableProps } from '@/components/AlertsTable'
import { ConfirmationDialog } from '@/components/ConfirmDialog'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { deleteAlert, getAlerts } from '@/services/alerts'
import { Alert } from '@/types/alert'
import { Eye, Pen, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Reports() {
  const [alerts, setAlerts] = useState<Alert[]>([])

  useEffect(() => {
    const loadAlerts = async () => {
      const data = await getAlerts()
      setAlerts(data)
    }
    loadAlerts()
  }, [])

  const handleDelete = async (id: number) => {
    try {
      await deleteAlert(id)
      setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id))
    } catch (error) {
      console.error('Failed to delete alert:', error)
    }
  }

  const columns: ReportsTableProps['columns'] = [
    { header: 'Name', value: 'name' },
    { header: 'Age', value: 'age' },
    { header: 'File included', value: 'file', isBoolean: true },
    { header: 'Note', value: 'note', className: 'w-max' },
    {
      header: 'Actions',
      value: '',
      renderAction: (item: Alert) => (
        <div className='flex justify-between'>
          <Button variant='outline' size='icon'>
            <Eye />
          </Button>
          <Button className='bg-blue-200 text-slate-800' size='icon'>
            <Pen />
          </Button>
          <ConfirmationDialog
            trigger={
              <Button variant='destructive' size='icon'>
                <Trash2 />
              </Button>
            }
            title='Are you absolutely sure?'
            description='This action cannot be undone. This will permanently delete this alert.'
            confirmText='Delete'
            onConfirm={() => handleDelete(item.id)}
          />
        </div>
      ),
      className: 'w-[170px]',
    },
  ]

  return (
    <div>
      <div className='grid'>
        <Card>
          <AlertsTable
            data={alerts}
            columns={columns}
            caption='A list of your alerts'
          />
        </Card>
      </div>
    </div>
  )
}
