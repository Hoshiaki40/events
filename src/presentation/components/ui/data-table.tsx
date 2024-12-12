import * as React from "react";
import { cn } from "@/src/utils";
import {
  flexRender,
  Row,
  type Table as TanstackTable,
} from "@tanstack/react-table";

import { DataTablePagination } from "@/src/presentation/components/ui/data-table-pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/presentation/components/ui/table";

interface DataTableProps<TData> extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The table instance returned from useDataTable hook with pagination, sorting, filtering, etc.
   * @type TanstackTable<TData>
   */
  table: TanstackTable<TData>;

  totalPage: number;

  getRowClassName?: (row: Row<TData>) => string;
}

export function DataTable<TData>({
  table,
  children,
  totalPage,
  className,
  getRowClassName,
  ...props
}: DataTableProps<TData>) {
  return (
    <div
      className={cn("w-full space-y-2.5 overflow-auto", className)}
      {...props}
    >
      {children}

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={getRowClassName ? getRowClassName(row) : ""}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={table.getAllColumns().length}
                className="h-24 text-center"
              >
                Aucun résultat
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="sticky flex flex-col gap-2.5">
        <DataTablePagination table={table} totalPage={totalPage} />
      </div>
    </div>
  );
}
