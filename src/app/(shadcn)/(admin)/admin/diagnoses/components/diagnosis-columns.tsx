'use client'

import { ColumnDefWithVisibility } from '@/components/data-table/data-table'
import { Checkbox } from '@/components/ui/checkbox'

import { DiagnosisTableRowActions } from '@/app/(shadcn)/(admin)/admin/diagnoses/components/diagnosis-table-row-actions'
import { personsToContact } from '@/app/(shadcn)/(admin)/admin/diagnoses/data/data'
import { Diagnosis } from '@/app/(shadcn)/(admin)/admin/diagnoses/data/schema'
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'

export const diagnosisColumns: ColumnDefWithVisibility<Diagnosis>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Selecteer allemaal'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label='Selecteer rij' className='translate-y-[2px]' />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Naam' />,
    cell: ({ row }) => (
      <div className='flex space-x-2'>
        <span className='max-w-[500px] truncate font-medium'>{row.getValue('name')}</span>
      </div>
    ),
    enableHiding: false,
  },
  {
    accessorKey: 'description',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Omschrijving' />,
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-[500px] truncate font-medium'>{row.getValue('description')}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'accessTime',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Toegangstijd' />,
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-[500px] truncate font-medium'>{row.getValue('accessTime')}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'personToContact',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Contactpersoon' />,
    cell: ({ row }) => {
      const personToContact = personsToContact.find((personToContact) => personToContact.value === row.getValue('personToContact'))

      if (!personToContact) {
        return null
      }

      return (
        <div className='flex w-[100px] items-center'>
          {personToContact.icon && <personToContact.icon className='mr-2 h-4 w-4 text-muted-foreground' />}
          <span>{personToContact.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DiagnosisTableRowActions row={row} />,
  },
]
