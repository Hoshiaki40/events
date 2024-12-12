"use client";

import { PropsWithChildren, useState } from "react";
import { cn, exportData } from "@/src/utils";
import type { Table } from "@tanstack/react-table";
import { CheckIcon, DownloadIcon, FileSpreadsheetIcon } from "lucide-react";

import { Button } from "@/src/presentation/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/src/presentation/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/presentation/components/ui/popover";
import { Separator } from "@/src/presentation/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/presentation/components/ui/tooltip";

interface DataTableExportOptionsProps<TData> {
  table: Table<TData>;
}

export function DataTableExportOptions<TData>({
  table,
  children,
}: PropsWithChildren<DataTableExportOptionsProps<TData>>) {
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const totalColumn = table
    .getAllColumns()
    .filter(
      (column) =>
        typeof column.accessorFn !== "undefined" && column.getCanHide()
    );
  const totalColumnLength = totalColumn.length;

  const handleColumnSelect = (columnId: string) => {
    setSelectedColumns((prev) =>
      prev.includes(columnId)
        ? prev.filter((id) => id !== columnId)
        : [...prev, columnId]
    );
  };

  const handleClear = () => {
    setSelectedColumns([]);
  };

  const toggleAll = () => {
    if (selectedColumns.length === totalColumnLength) {
      handleClear();
    } else {
      const allValues = totalColumn.map((column) => column.id);

      setSelectedColumns([...allValues]);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          aria-label="Toggle columns"
          variant="outline-destructive"
          size="sm"
        >
          <DownloadIcon className="mr-2 size-4" aria-hidden="true" />
          Export
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="h-auto w-auto p-0">
        <Command className="h-auto w-full">
          <CommandList>
            <CommandGroup heading="Champs à exporter">
              <CommandItem
                key="all"
                onSelect={toggleAll}
                className="cursor-pointer"
              >
                <div
                  className={cn(
                    "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                    selectedColumns.length === totalColumnLength
                      ? "bg-primary text-primary-foreground"
                      : "opacity-50 [&_svg]:invisible"
                  )}
                >
                  <CheckIcon className="h-4 w-4" />
                </div>
                <span>(Tout sélectionner)</span>
              </CommandItem>
              {totalColumn.map((column) => {
                const isSelected = selectedColumns.includes(column.id);
                return (
                  <CommandItem
                    key={column.id}
                    className="capitalize"
                    onSelect={() => handleColumnSelect(column.id)}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <CheckIcon className="h-4 w-4" />
                    </div>
                    <span className="truncate">{column.id}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Options">
              <TooltipProvider>
                <div className="flex items-center justify-between gap-2">
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger>
                      <Button
                        className="items-center bg-slate-300 text-black hover:bg-slate-400"
                        size="icon"
                        onClick={() =>
                          exportData("csv", table, selectedColumns)
                        }
                      >
                        <i className="pi pi-file flex size-6 items-center justify-center text-2xl"></i>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p>CSV</p>
                    </TooltipContent>
                  </Tooltip>
                  <Separator
                    orientation="vertical"
                    className="flex h-full min-h-6"
                  />
                  <Tooltip>
                    <TooltipTrigger>
                      <Button
                        variant="success"
                        size="icon"
                        onClick={() =>
                          exportData("xlsx", table, selectedColumns)
                        }
                      >
                        <FileSpreadsheetIcon className="size-6 text-2xl" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p>XLSX</p>
                    </TooltipContent>
                  </Tooltip>
                  <Separator
                    orientation="vertical"
                    className="flex h-full min-h-6"
                  />
                  <Tooltip>
                    <TooltipTrigger>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() =>
                          exportData("pdf", table, selectedColumns)
                        }
                      >
                        <i className="pi pi-file-pdf flex size-6 items-center justify-center text-2xl"></i>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p>PDF</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TooltipProvider>
            </CommandGroup>
            {children && (
              <>
                <CommandSeparator />
                <CommandGroup heading="Template">{children}</CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
