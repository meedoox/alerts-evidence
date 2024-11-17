'use client'

import { useParams } from 'next/navigation'
import { AlertForm } from '@/components/AlertsForm'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function UpdateAlertPage() {
  const { id } = useParams()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Alert</CardTitle>
        <CardDescription>
          Do you have something on your mind? You can tell us ❤️ This is your
          previously submited problem, you can update it here.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AlertForm alertId={Number(id)} isEditMode={true} />
      </CardContent>
    </Card>
  )
}
