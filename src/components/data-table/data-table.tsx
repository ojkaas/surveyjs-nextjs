'use client'

import {
  ColumnDef,
  ColumnFiltersState,
  Row,
  RowData,
  SortingState,
  Table as TableType,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import * as React from 'react'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import { DataTablePagination } from './data-table-pagination'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  disablePagination?: boolean
  toolbar?: React.ComponentType<DataTableToolbarProps<TData>>
}

export type ColumnDefWithVisibility<D> = ColumnDef<D> & {
  visible?: boolean
}

export interface DataTableToolbarProps<TData> {
  table: TableType<TData>
}

export interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

function getInVisibleColumn<T extends RowData>(columns: ColumnDefWithVisibility<T>[]) {
  let inVisibleColumns: Record<string, boolean> = {}

  for (const col of columns) {
    if (col.visible === false) {
      if ('accessorKey' in col && typeof col.accessorKey === 'string') {
        inVisibleColumns[col.accessorKey] = false
      }
    }
  }
  return inVisibleColumns
}

export function DataTable<TData, TValue>({ columns, data, toolbar: Toolbar, disablePagination = false }: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [sorting, setSorting] = React.useState<SortingState>([])

  // Update the type of the 'columns' array to 'ColumnDefWithVisibility<TData>[]'
  const columnsWithVisibility: ColumnDefWithVisibility<TData>[] = columns as ColumnDefWithVisibility<TData>[]

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    initialState: {
      columnVisibility: getInVisibleColumn<TData>(columnsWithVisibility),
    },
    enableRowSelection: true,
    manualPagination: disablePagination,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  return (
    <div className='space-y-4'>
      {Toolbar && <Toolbar table={table} />}
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  Geen resultaten.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  )
}
