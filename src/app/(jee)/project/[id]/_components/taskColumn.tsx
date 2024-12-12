"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Calendar,
  Check,
  Clock,
  Edit,
  Flag,
  Folder,
  MoreHorizontal,
  Plus,
  Trash2,
  Users,
} from "lucide-react";

import { useCurrentSession } from "@/src/presentation/hooks/use-current-session";
import { Badge } from "@/src/presentation/components/ui/badge";
import { Button } from "@/src/presentation/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/presentation/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/presentation/components/ui/dialog";
import { Task } from "@/src/domain/jee/task";
import { TaskPriority } from "@/src/domain/jee/TaskPriority";
import { TaskStatus } from "@/src/domain/jee/TaskStatus";
import { EditTaskForm } from "@/src/presentation/jee/components/edit-taks-form";
import TaskForm, {
  FormValues,
} from "@/src/presentation/jee/components/task-form";

import { DeleteTaskButton } from "./DeleteTaskButton";
import { EditTaskDialog } from "./EditTaskDialog";
import UserAssignmentPopover from "./UserAssignmentPopover";

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  status: TaskStatus;
}

const TaskColumn: React.FC<TaskColumnProps> = ({ title, tasks, status }) => {
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const queryClient = useQueryClient();
  const { id: projectId } = useParams();
  const user = useCurrentSession();

  const createTaskMutation = useMutation<Task, Error, FormValues>({
    mutationFn: async (values: FormValues) => {
      const value = { ...values, status, projectId };
      console.log("value", value);
      const response = await fetch(`http://localhost:8080/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        credentials: "include",
        body: JSON.stringify(value),
      });

      if (!response.ok) {
        throw new Error("Failed to create task");
      }

      return (await response.json()) as Task;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", projectId],
      });
      setIsDialogOpen(false);
    },
  });

  const assignUserMutation = useMutation({
    mutationFn: async ({
      taskId,
      userId,
    }: {
      taskId: string;
      userId: string;
    }) => {
      const response = await fetch(
        `http://localhost:8080/api/tasks/${taskId}/assign`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
          credentials: "include",
          body: JSON.stringify([userId]),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to assign user to task");
      }

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", projectId] });
    },
  });

  const revokeUserMutation = useMutation({
    mutationFn: async ({
      taskId,
      userId,
    }: {
      taskId: string;
      userId: string;
    }) => {
      const response = await fetch(
        `http://localhost:8080/api/tasks/${taskId}/unassign/${userId}`,
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
        throw new Error("Failed to revoke user from task");
      }

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", projectId] });
    },
  });

  const onSuccess = () => {
    setIsEditDialogOpen(false);
  };

  const filteredTasks = tasks.filter((task) => task.status === status);

  return (
    <Card className="flex h-[calc(100vh-2rem)] w-[350px] flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <Plus className="h-4 w-4" />
              <span className="sr-only">Add task</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
            </DialogHeader>
            <TaskForm
              onSubmit={createTaskMutation.mutateAsync}
              isSubmitting={createTaskMutation.isPending}
            />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto">
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <Card key={task.id}>
              <CardHeader className="space-y-0 pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-sm font-medium">
                    {task.title}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setTaskToEdit(task);
                        setIsEditDialogOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <DeleteTaskButton task={task} />
                  </div>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {task.description || "No description"}
                </p>
              </CardHeader>
              <CardContent>
                <div className="mb-2 flex items-center space-x-2 text-sm text-muted-foreground">
                  <UserAssignmentPopover
                    taskId={task.id}
                    assignedUserIds={task.assigneeIds}
                    onAssign={(userId) =>
                      assignUserMutation.mutate({ taskId: task.id, userId })
                    }
                    onRevoke={(userId) =>
                      revokeUserMutation.mutate({ taskId: task.id, userId })
                    }
                  />
                </div>
                <div className="mb-2 flex items-center space-x-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{task.deadline || "No deadline"}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant={
                      task.priority === TaskPriority.HIGH
                        ? "destructive"
                        : task.priority === TaskPriority.MEDIUM
                          ? "default"
                          : "secondary"
                    }
                  >
                    <Flag className="mr-1 h-4 w-4" />
                    {task.priority}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <EditTaskDialog
          task={taskToEdit}
          isOpen={isEditDialogOpen}
          onOpenChange={(open) => {
            setIsEditDialogOpen(open);
            if (!open) setTaskToEdit(null);
          }}
        />
      </CardContent>
    </Card>
  );
};

export default TaskColumn;
