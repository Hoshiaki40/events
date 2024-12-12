"use client";

import React, { ReactNode, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { EllipsisVerticalIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/src/presentation/components/ui/button";
import { DataTableColumnHeader } from "@/src/presentation/components/ui/data-table-column-header";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/presentation/components/ui/dropdown-menu";

import { Checkbox } from "../components/ui/checkbox";
import { ConfirmDeleteDialog } from "../components/ui/confirm-delete-dialog";
import { IModel } from "../types/default.type";

type CustomColumnDef = ColumnDef<any> & {
  accessorKey: string;
  title: string;
};

type Props = {
  scope: string;
  cells: CustomColumnDef[];
  Form?: any;
  menu?: {
    onSelect: () => void;
    icon: ReactNode;
    text: ReactNode;
  }[];
  deletable?: boolean;
  deleteItemApi?: (id: number) => Promise<boolean>;
};

export function useColumns<TModel extends IModel>({
  scope,
  cells,
  deletable = false,
  Form,
  menu,
  deleteItemApi,
}: Props): ColumnDef<TModel>[] {
  const columns: ColumnDef<TModel>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          className="z-50"
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          className="z-0"
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];

  for (const col of cells) {
    columns.push({
      accessorKey: col.accessorKey,
      header: ({ column }) => (
        <DataTableColumnHeader
          className="min-w-[200px] flex-1"
          column={column}
          title={col.title}
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="min-w-[200px] flex-1">
            <span className="truncate font-medium">
              {(row.original as any)[col.accessorKey]}
            </span>
          </div>
        );
      },
      size: 300,
    });
  }

  columns.push({
    id: "actions",
    cell: function Cell({ row }) {
      const [openSubjectForm, setOpenSubjectForm] = useState(false);
      const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

      const [itemToDelete, setItemToDelete] = useState<number | null>(null);

      const queryClient = useQueryClient();
      const deleteMutation = useMutation({
        mutationFn: (id: number) => deleteItemApi!(id),
        onSuccess: () => {
          toast.success("Suppression réussie");
          queryClient.invalidateQueries({
            predicate: (query) => {
              return (
                Array.isArray(query.queryKey) && query.queryKey[0] === scope
              );
            },
          });
        },
        onError: (error) => {
          toast.error("Une erreur est survenue lors de la suppression.");
        },
      });

      const handleDelete = (id: number) => {
        setItemToDelete(id);
        setIsDeleteDialogOpen(true);
      };
      return (
        <>
          {Form && (
            <Form
              open={openSubjectForm}
              onOpenChange={setOpenSubjectForm}
              initialData={row.original}
            />
          )}
          <ConfirmDeleteDialog
            isOpen={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
            onConfirm={() => {
              if (itemToDelete !== null) {
                deleteMutation.mutate(itemToDelete);
              }
              setIsDeleteDialogOpen(false);
            }}
            title="Confirmez la suppression"
            description="Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible."
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                aria-label="Open menu"
                variant="ghost"
                size={"icon"}
                className="flex size-8 p-0 data-[state=open]:bg-muted"
              >
                <EllipsisVerticalIcon className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[225px]">
              <DropdownMenuItem
                onSelect={() => {
                  setOpenSubjectForm(true);
                }}
              >
                <PencilIcon className="mr-2 size-3.5" />
                Modifier
              </DropdownMenuItem>
              {deletable && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive"
                    onSelect={() => {
                      handleDelete(Number(row.original.id ?? 0));
                    }}
                  >
                    <Trash2Icon className="mr-2 size-3.5" />
                    Supprimer
                  </DropdownMenuItem>
                </>
              )}
              {menu?.map((menuItem, key) => (
                <React.Fragment key={key}>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className=""
                    onSelect={(event: Event) => {
                      menuItem.onSelect.call(row.original);
                    }}
                  >
                    {menuItem.icon}
                    {menuItem.text}
                  </DropdownMenuItem>
                </React.Fragment>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  });

  return columns;
}
