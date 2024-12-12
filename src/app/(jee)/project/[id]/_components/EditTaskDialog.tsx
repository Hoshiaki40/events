import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/presentation/components/ui/dialog";
import { Task } from "@/src/domain/jee/task";
import { EditTaskForm } from "@/src/presentation/jee/components/edit-taks-form";

interface EditTaskDialogProps {
  task: Task | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditTaskDialog({
  task,
  isOpen,
  onOpenChange,
}: EditTaskDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit task</DialogTitle>
        </DialogHeader>
        {task && (
          <EditTaskForm task={task} onSuccess={() => onOpenChange(false)} />
        )}
      </DialogContent>
    </Dialog>
  );
}
