import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { X, Check, Pen, Trash2, Eye } from 'lucide-react'
import { Button } from './ui/button'

const invoices = [
  {
    id: 1,
    name: 'Matyas Herman',
    age: 24,
    file: true,
    note: 'Some note the user has written',
  },
  {
    id: 2,
    name: 'Matyas Herman',
    age: 14,
    file: false,
    note: 'Some note the user has written',
  },
  {
    id: 3,
    name: 'Matyas Herman',
    age: 33,
    file: false,
    note: 'Some note the user has written',
  },
  {
    id: 4,
    name: 'Matyas Herman',
    age: 29,
    file: true,
    note: 'Some note the user has written',
  },
]

export function ReportsTable() {
  return (
    <Table>
      <TableCaption>A list of all reports</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Age</TableHead>
          <TableHead>File included</TableHead>
          <TableHead className='w-max'>Note</TableHead>
          <TableHead className='text-right'>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className='font-medium'>{invoice.name}</TableCell>
            <TableCell>{invoice.age}</TableCell>
            <TableCell>{invoice.file === true ? <Check /> : <X />}</TableCell>
            <TableCell className=''>{invoice.note}</TableCell>
            <TableCell className='text-right'>
              <Button variant='destructive' size='icon'>
                <Eye />
              </Button>
              <Button variant='destructive' size='icon'>
                <Pen />
              </Button>
              <Button variant='destructive' size='icon'>
                <Trash2 />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
