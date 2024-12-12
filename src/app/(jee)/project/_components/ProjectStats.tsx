import { CheckSquare, Users } from "lucide-react";

import { Project } from "@/src/domain/jee/project";

export function ProjectStats({ project }: { project: Project }) {
  return (
    <div className="flex items-center gap-4 text-sm text-muted-foreground">
      <div className="flex items-center gap-1">
        <Users className="h-4 w-4" />
        <span>{project.members.length}</span>
      </div>
      <div className="flex items-center gap-1">
        <CheckSquare className="h-4 w-4" />
        <span>{project.taskIds.length}</span>
      </div>
    </div>
  );
}
