"use client";

import * as React from "react";
import { cn } from "@/src/utils";
import type { Table } from "@tanstack/react-table";

import { DataTableExportOptions } from "@/src/presentation/components/ui/data-table-export-options";
import { DataTableViewOptions } from "@/src/presentation/components/ui/data-table-view-options";

import SearchBarFacetedFilter from "../search-bar-faceted-filter";

interface DataTableToolbarProps<TData>
  extends React.HTMLAttributes<HTMLDivElement> {
  isSearch?: boolean;
  table: Table<TData>;
  facetedFilterComponent?: React.ComponentType<any>;
  exportTemplateComponent?: React.ComponentType<any>;
}

export function DataTableToolbar<TData>({
  isSearch = true,
  table,
  facetedFilterComponent: FacetedFilterComponent,
  exportTemplateComponent: ExportTemplateComponent,
  children,
  className,
  ...props
}: DataTableToolbarProps<TData>) {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-between space-x-2 overflow-auto p-1",
        className
      )}
      {...props}
    >
      <div className="flex flex-1 items-center space-x-2">
        {isSearch && <SearchBarFacetedFilter />}
        {FacetedFilterComponent && <FacetedFilterComponent />}
      </div>
      <div className="flex items-center justify-end gap-2">
        <div className="flex items-center gap-2">
          {children}
          <DataTableExportOptions table={table}>
            {ExportTemplateComponent && <ExportTemplateComponent />}
          </DataTableExportOptions>
          <DataTableViewOptions table={table} />
        </div>
      </div>
    </div>
  );
}
