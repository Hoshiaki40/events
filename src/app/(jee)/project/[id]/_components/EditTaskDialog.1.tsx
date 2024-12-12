import { EditTaskDialogProps } from "./EditTaskDialog";

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
