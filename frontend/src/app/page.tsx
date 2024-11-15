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
      <CardContent>Test</CardContent>
      <CardFooter className='flex justify-between'>
        <Button variant='default'>Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  )
}
