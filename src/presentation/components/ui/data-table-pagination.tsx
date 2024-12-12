import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { type Table } from "@tanstack/react-table";

import { Button } from "@/src/presentation/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/src/presentation/components/ui/select";
import { usePagination } from "@/app/hooks/use-pagination";

interface DataTablePaginationProps<TData> {
  totalPage: number;
  table: Table<TData>;
  pageSizeOptions?: number[];
}

export function DataTablePagination<TData>({
  table,
  totalPage,
  pageSizeOptions = [5, 10, 20, 30, 40, 50, 100],
}: DataTablePaginationProps<TData>) {
  const {
    navigateTo,
    getPageUrl,
    getPerPageUrl,
    page,
    page_content,
    isFirstPage,
    isLastPage,
  } = usePagination(totalPage);

  return (
    <div className="flex w-full flex-col-reverse items-center justify-between gap-4 overflow-auto p-1 sm:flex-row sm:gap-8">
      <div className="flex-1 whitespace-nowrap text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} de{" "}
        {table.getFilteredRowModel().rows.length} rangée(s) sélectionnée(s).
      </div>
      <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
        <RowsPerPageSelector
          page_content={page_content}
          pageSizeOptions={pageSizeOptions}
          onValueChange={(value) => navigateTo(getPerPageUrl(Number(value)))}
        />
        <div className="flex items-center justify-center whitespace-nowrap text-sm font-medium">
          Page {page} sur {totalPage}
        </div>
        <PaginationControls
          isFirstPage={isFirstPage}
          isLastPage={isLastPage}
          onFirstPage={() => navigateTo(getPageUrl(1))}
          onPreviousPage={() => navigateTo(getPageUrl(page - 1))}
          onNextPage={() => navigateTo(getPageUrl(page + 1))}
          onLastPage={() => navigateTo(getPageUrl(totalPage))}
        />
      </div>
    </div>
  );
}

interface RowsPerPageSelectorProps {
  page_content: number;
  pageSizeOptions: number[];
  onValueChange: (value: string) => void;
}

function RowsPerPageSelector({
  page_content,
  pageSizeOptions,
  onValueChange,
}: RowsPerPageSelectorProps) {
  return (
    <div className="flex items-center space-x-2">
      <p className="whitespace-nowrap text-sm font-medium">Rangées par page</p>
      <Select value={`${page_content}`} onValueChange={onValueChange}>
        <SelectTrigger className="h-8 w-[4.5rem]">
          <span>{page_content}</span>
        </SelectTrigger>
        <SelectContent side="top">
          {pageSizeOptions.map((pageSize) => (
            <SelectItem key={pageSize} value={`${pageSize}`}>
              {pageSize}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

interface PaginationControlsProps {
  isFirstPage: boolean;
  isLastPage: boolean;
  onFirstPage: () => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onLastPage: () => void;
}

function PaginationControls({
  isFirstPage,
  isLastPage,
  onFirstPage,
  onPreviousPage,
  onNextPage,
  onLastPage,
}: PaginationControlsProps) {
  return (
    <div className="flex items-center space-x-2">
      <PaginationButton
        onClick={onFirstPage}
        disabled={isFirstPage}
        className="hidden size-8 p-0 lg:flex"
        aria-label="Go to first page"
        icon={<DoubleArrowLeftIcon className="size-4" aria-hidden="true" />}
      />
      <PaginationButton
        onClick={onPreviousPage}
        disabled={isFirstPage}
        aria-label="Go to previous page"
        icon={<ChevronLeftIcon className="size-4" aria-hidden="true" />}
      />
      <PaginationButton
        onClick={onNextPage}
        disabled={isLastPage}
        aria-label="Go to next page"
        icon={<ChevronRightIcon className="size-4" aria-hidden="true" />}
      />
      <PaginationButton
        onClick={onLastPage}
        disabled={isLastPage}
        className="hidden size-8 lg:flex"
        aria-label="Go to last page"
        icon={<DoubleArrowRightIcon className="size-4" aria-hidden="true" />}
      />
    </div>
  );
}

interface PaginationButtonProps {
  onClick: () => void;
  disabled: boolean;
  className?: string;
  "aria-label": string;
  icon: React.ReactNode;
}

function PaginationButton({
  onClick,
  disabled,
  className,
  "aria-label": ariaLabel,
  icon,
}: PaginationButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      variant="outline"
      size="icon"
      className={`size-8 ${className || ""}`}
      aria-label={ariaLabel}
    >
      {icon}
    </Button>
  );
}
