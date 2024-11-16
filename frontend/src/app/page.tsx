import { AlertForm } from '@/components/AlertsForm'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function Home() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Alert</CardTitle>
        <CardDescription>
          Do you have something on your mind? You can tell us ❤️
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AlertForm />
      </CardContent>
    </Card>
  )
}
