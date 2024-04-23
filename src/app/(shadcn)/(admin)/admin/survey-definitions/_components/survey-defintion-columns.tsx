'use client'

import { ColumnDefWithVisibility } from '@/components/data-table/data-table'

import { SurveyDefinitionTableRowActions } from '@/app/(shadcn)/(admin)/admin/survey-definitions/_components/survey-definition-row-actions'
import { SurveyDefinition } from '@/app/(shadcn)/(admin)/admin/survey-definitions/_data/schema'
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { Checkbox } from '@/components/ui/checkbox'

export const surveyDefinitionColumns: ColumnDefWithVisibility<SurveyDefinition>[] = [
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
    accessorKey: 'version',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Versie' />,
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-[500px] truncate font-medium'>{row.getValue('version')}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'active',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Actief' />,
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          {(row.getValue('active') as boolean) && <span className='px-1.5 inline-flex items-center justify-center rounded-full bg-green-500 text-sm font-medium text-gray-50'>Actief</span>}
        </div>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <SurveyDefinitionTableRowActions row={row} />,
  },
]
