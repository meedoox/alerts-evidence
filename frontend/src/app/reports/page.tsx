'use client'

import { AlertsTable, ReportsTableProps } from '@/components/AlertsTable'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { getAlerts } from '@/services/alerts'
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
          <Button variant='destructive' size='icon'>
            <Pen />
          </Button>
          <Button variant='destructive' size='icon'>
            <Trash2 />
          </Button>
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
            caption='A list of all alerts'
          />
        </Card>
      </div>
    </div>
  )
}
