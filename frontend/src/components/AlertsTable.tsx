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

export interface ReportsTableProps {
  data: any[]
  columns: {
    header: string
    value: string
    isBoolean?: boolean
    renderAction?: (item: any) => React.ReactNode
    className?: string
  }[]
  caption?: string
}

export function AlertsTable({ data, columns, caption }: ReportsTableProps) {
  return (
    <Table>
      {caption && <TableCaption>{caption}</TableCaption>}
      <TableHeader>
        <TableRow>
          {columns.map((column, index) => (
            <TableHead key={index} className={column.className ?? ''}>
              {column.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, rowIndex) => (
          <TableRow key={rowIndex}>
            {columns.map((column, colIndex) => (
              <TableCell key={colIndex} className={column.className ?? ''}>
                {column.isBoolean ? (
                  item[column.value] ? (
                    <Check />
                  ) : (
                    <X />
                  )
                ) : column.renderAction ? (
                  column.renderAction(item)
                ) : (
                  item[column.value]
                )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
