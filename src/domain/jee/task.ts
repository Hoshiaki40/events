import { TaskPriority } from "./TaskPriority";
import { TaskStatus } from "./TaskStatus";

export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  deadline: string | null;
  assigneeIds: string[];
  projectId: string;
  createdAt: string | null;
  updatedAt: string | null;
}
