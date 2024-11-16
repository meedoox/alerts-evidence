import { AlertForm } from '@/components/AlertsForm'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Image from 'next/image'

export default function Home() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <AlertForm />
      </CardContent>
      <CardFooter className='flex justify-end'>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  )
}
