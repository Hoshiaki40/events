"use client";

import React, { PropsWithChildren } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { useCurrentSession } from "@/src/presentation/hooks/use-current-session";
import { Task } from "@/src/domain/jee/task";
import { TaskPriority } from "@/src/domain/jee/TaskPriority";
import { TaskStatus } from "@/src/domain/jee/TaskStatus";

import TaskColumn from "./_components/taskColumn";

const tasks = [
  {
    id: "1",
    title: "create-user-repository",
    description: "Create a new repository for user management",
    status: TaskStatus.PENDING,
    priority: TaskPriority.HIGH,
    deadline: "2023-06-30",
    assigneeIds: ["user1", "user2"],
    projectId: "project1",
    createdAt: "2023-05-15T10:00:00Z",
    updatedAt: "2023-05-15T10:00:00Z",
  },
  // Ajouter d'autres tâches si nécessaire
];

type PageProps = {};

function page({ children }: PropsWithChildren<PageProps>) {
  const { id: projectId } = useParams();
  const user = useCurrentSession();

  const { data: tasks = [], isLoading } = useQuery<Task[]>({
    queryKey: ["tasks", projectId],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:8080/api/projects/${projectId}/tasks`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="min-h-screen bg-background p-4">
      <h1 className="mb-4 text-2xl font-bold">Task Management</h1>
      <div className="overflow-x-auto">
        <div className="flex space-x-4 pb-4">
          <TaskColumn title="TO DO" tasks={tasks} status={TaskStatus.PENDING} />
          <TaskColumn
            title="IN PROGRESS"
            tasks={tasks}
            status={TaskStatus.IN_PROGRESS}
          />
          <TaskColumn
            title="DONE"
            tasks={tasks}
            status={TaskStatus.COMPLETED}
          />
        </div>
      </div>
    </div>
  );
}

export default page;
