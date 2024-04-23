'use client'

import { ColumnDefWithVisibility } from '@/components/data-table/data-table'
import { Checkbox } from '@/components/ui/checkbox'

import { SurveyTableRowActions } from '@/app/(shadcn)/(portal)/portal/vragenlijsten/components/survey-table-row-actions'
import { availables, finisheds } from '@/app/(shadcn)/(portal)/portal/vragenlijsten/data/data'
import { Survey } from '@/app/(shadcn)/(portal)/portal/vragenlijsten/data/schema'
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { DateTime } from 'luxon'

export const surveyColumns: ColumnDefWithVisibility<Survey>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label='Select row' className='translate-y-[2px]' />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'key',
    header: ({ column }) => <DataTableColumnHeader column={column} title='ID' />,
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-[500px] truncate font-medium'>{row.getValue('key')}</span>
        </div>
      )
    },
    visible: true,
    enableHiding: false,
  },
  {
    accessorKey: 'available',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Beschikbaar' />,
    cell: ({ row }) => {
      const available = availables.find((available) => available.value === row.getValue('available'))

      if (!available) {
        return null
      }

      return (
        <div className='flex w-[100px] items-center'>
          {available.icon && (
            <div className='flex items-center mr-1'>
              <available.icon className='h-4 w-4 text-muted-foreground' />
            </div>
          )}
          <span>{available.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    visible: true,
  },
  {
    accessorKey: 'finished',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Afgerond' />,
    cell: ({ row }) => {
      const finished = finisheds.find((finished) => finished.value === row.getValue('finished'))

      if (!finished) {
        return null
      }

      return (
        <div className='flex w-[100px] items-center'>
          {finished.icon && (
            <div className='flex items-center mr-1'>
              <finished.icon className='mr-2 h-4 w-4 text-muted-foreground' />
            </div>
          )}
          <span>{finished.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    visible: true,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Aangemaakt op' />,
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-[500px] truncate font-medium'>
            {row.getValue('createdAt')
              ? DateTime.fromJSDate(new Date(row.getValue('createdAt'))).hasSame(DateTime.now(), 'day')
                ? DateTime.fromJSDate(new Date(row.getValue('createdAt'))).toRelative({ locale: 'nl' })
                : DateTime.fromJSDate(new Date(row.getValue('createdAt'))).toLocaleString(DateTime.DATE_SHORT, { locale: 'nl' })
              : '-'}
          </span>
        </div>
      )
    },
  },

  {
    id: 'actions',
    cell: ({ row }) => <SurveyTableRowActions row={row} />,
  },
]
