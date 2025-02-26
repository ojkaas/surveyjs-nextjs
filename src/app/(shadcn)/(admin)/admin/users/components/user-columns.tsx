'use client'

import { ColumnDefWithVisibility } from '@/components/data-table/data-table'
import { Checkbox } from '@/components/ui/checkbox'
import { DateTime } from 'luxon'

import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { roles } from '../data/data'
import { User } from '../data/schema'
import { UserTableRowActions } from './user-table-row-actions'

export const userColumns: ColumnDefWithVisibility<User>[] = [
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
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title='ID' />,
    cell: ({ row }) => (
      <div className='flex items-center gap-3'>
        <div className='avatar'>
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className='rounded-full w-10' src={`https://ui-avatars.com/api/?background=random&name=${row.getValue('name')}`} alt='Avatar' />
          </div>
        </div>
        <div>
          <div className='font-bold'>{row.getValue('name')}</div>
          <div className='text-sm opacity-50'>{row.getValue('email')}</div>
        </div>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Naam' />,
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-[500px] truncate font-medium'>{row.getValue('name')}</span>
        </div>
      )
    },
    visible: false,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Email' />,
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-[500px] truncate font-medium'>{row.getValue('email')}</span>
        </div>
      )
    },
    visible: false,
  },
  {
    accessorKey: 'emailVerified',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Laatst actief' />,
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-[500px] truncate font-medium'>{row.getValue('emailVerified') ? DateTime.fromJSDate(new Date(row.getValue('emailVerified'))).toRelative({ locale: 'nl' }) : '-'}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'role',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Rol' />,
    cell: ({ row }) => {
      const role = roles.find((role) => role.value === row.getValue('role'))

      if (!role) {
        return null
      }

      return (
        <div className='flex w-[100px] items-center'>
          {role.icon && <role.icon className='mr-2 h-4 w-4 text-muted-foreground' />}
          <span>{role.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'type',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Type' />,
    cell: ({ row }) => {
      const type = row.getValue('type')

      if (!type) {
        return '-'
      }

      return type === 'ZIEKENHUIS' ? 'Ziekenhuis' : 'Huisarts'
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <UserTableRowActions row={row} />,
  },
]
