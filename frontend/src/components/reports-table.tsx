'use client'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { X, Check } from 'lucide-react'
import { useEffect } from 'react'

interface ReportsTableProps {
  data: any[]
  columns: {
    header: string
    accessor: string
    isBoolean?: boolean
    renderAction?: (item: any) => React.ReactNode
  }[]
  caption?: string
}

export function ReportsTable({ data, columns, caption }: ReportsTableProps) {
  return (
    <Table>
      {caption && <TableCaption>{caption}</TableCaption>}
      <TableHeader>
        <TableRow>
          {columns.map((column, index) => (
            <TableHead key={index}>{column.header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, rowIndex) => (
          <TableRow key={rowIndex}>
            {columns.map((column, colIndex) => (
              <TableCell key={colIndex}>
                {column.isBoolean ? (
                  item[column.accessor] ? (
                    <Check />
                  ) : (
                    <X />
                  )
                ) : column.renderAction ? (
                  column.renderAction(item)
                ) : (
                  item[column.accessor]
                )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
