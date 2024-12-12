import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MoreVertical } from "lucide-react";

import { useCurrentSession } from "@/src/presentation/hooks/use-current-session";
import { Button } from "@/src/presentation/components/ui/button";
import { ConfirmDeleteDialog } from "@/src/presentation/components/ui/confirm-delete-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/presentation/components/ui/dropdown-menu";
import { Project } from "@/src/domain/jee/project";
import { Role } from "@/src/domain/jee/roles";
import { EditProjectDialog } from "@/src/presentation/jee/components/EditProjectDialog";

export function ProjectMenu({ project }: { project: Project }) {
  const user = useCurrentSession();
  const queryClient = useQueryClient();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Vérifier si l'utilisateur est admin du projet
  const isAdmin = project.members.some(
    (member) => member.userId === user?.id && member.role === Role.ADMIN
  );

  const deleteProjectMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(
        `http://localhost:8080/api/projects/${project.id}`,
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
        throw new Error("Failed to delete project");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project"] });
    },
  });

  const handleDelete = () => {
    setIsDeleteDialogOpen(true);
  };
  if (!isAdmin) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground"
        >
          <MoreVertical className="h-5 w-5" />
          <span className="sr-only">Plus d'options</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={() => setIsEditDialogOpen(true)}>
          Modifier
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-red-600"
          onClick={handleDelete}
          disabled={deleteProjectMutation.isPending}
        >
          {deleteProjectMutation.isPending ? "Suppression..." : "Supprimer"}
        </DropdownMenuItem>
      </DropdownMenuContent>

      {/* Dialog de confirmation */}
      <ConfirmDeleteDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={() => deleteProjectMutation.mutate()}
      />

      {/* Dialog de modification */}
      <EditProjectDialog
        project={project}
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      />
    </DropdownMenu>
  );
}
