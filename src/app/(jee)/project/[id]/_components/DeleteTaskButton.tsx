"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";

import { useCurrentSession } from "@/src/presentation/hooks/use-current-session";
import { Button } from "@/src/presentation/components/ui/button";
import { ConfirmDeleteDialog } from "@/src/presentation/components/ui/confirm-delete-dialog";
import { Task } from "@/src/domain/jee/task";

interface DeleteTaskButtonProps {
  task: Task;
}

export function DeleteTaskButton({ task }: DeleteTaskButtonProps) {
  const user = useCurrentSession();
  const queryClient = useQueryClient();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const deleteTaskMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(
        `http://localhost:8080/api/tasks/${task.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", task.projectId],
      });
    },
  });

  const handleDelete = () => {
    setIsDeleteDialogOpen(true);
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="text-destructive hover:text-destructive"
        onClick={handleDelete}
        disabled={deleteTaskMutation.isPending}
      >
        <Trash2 className="h-4 w-4" />
      </Button>

      <ConfirmDeleteDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={() => deleteTaskMutation.mutate()}
        title="Supprimer la tâche"
        description="Êtes-vous sûr de vouloir supprimer cette tâche ? Cette action est irréversible."
      />
    </>
  );
}
