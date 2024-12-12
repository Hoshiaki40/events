import { Clock } from "lucide-react";

import { Project } from "@/src/domain/jee/project";
import { Role } from "@/src/domain/jee/roles";

export function ProjectFooter({ project }: { project: Project }) {
  return (
    <div className="border-t border-border pt-4">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">
            Mis à jour le {formatDate(project.createdAt)}
          </span>
        </div>
        <div className={`font-medium ${getRoleColor(project.members[0].role)}`}>
          {project.members[0].role}
        </div>
      </div>
    </div>
  );
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function getRoleColor(role: Role): string {
  switch (role) {
    case Role.ADMIN:
      return "text-red-400";
    case Role.COLLABORATOR:
      return "text-blue-400";
    case Role.USER:
    default:
      return "text-green-400";
  }
}
