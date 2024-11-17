'use client'

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
import { MailPlus } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Alert</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className='space-y-4 flex flex-col'>
        <p>
          Welcome to our online trust box This trust box is here for you to try
          out how submitting a report works. You can send a test message and see
          how it is processed.{' '}
        </p>
        <p>
          Nenech to být (NNTB) allows anonymous reporting of bullying,
          inappropriate behavior, or any issue that you are not comfortable
          discussing in person. Thanks to anonymity, you don't have to worry
          about the report being used against you.
        </p>
        <p>
          If you want to report a real case, find your school and send the
          report directly there. In case of a life-threatening emergency, call
          the emergency line 112.
        </p>
      </CardContent>
      <CardFooter>
        <div className='flex justify-between'>
          <Button size='default' onClick={() => router.push('/alerts/add')}>
            <MailPlus />
            Add Alert
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
