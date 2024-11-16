'use client'

import { ReportsTable } from '@/components/reports-table'
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

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Age', accessor: 'age' },
    { header: 'File included', accessor: 'file', isBoolean: true },
    { header: 'Note', accessor: 'note' },
    {
      header: 'Actions',
      accessor: '',
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
    },
  ]

  return (
    <div>
      <div className='grid'>
        <Card>
          <ReportsTable
            data={alerts}
            columns={columns}
            caption='A list of all alerts'
          />
        </Card>
      </div>
    </div>
  )
}
