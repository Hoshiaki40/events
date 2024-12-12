import { Project } from "@/src/domain/jee/project";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { EditProjectForm } from "./edit-project-form";

// EditProjectDialog.tsx
interface EditProjectDialogProps {
  project: Project;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditProjectDialog({
  project,
  isOpen,
  onOpenChange,
}: EditProjectDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifier le projet</DialogTitle>
        </DialogHeader>
        <EditProjectForm
          project={project}
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
