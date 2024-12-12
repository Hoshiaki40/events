import Link from "next/link";

import { Button } from "@/src/presentation/components/ui/button";
import { Card } from "@/src/presentation/components/ui/card";
import { Project } from "@/src/domain/jee/project";

import { ProjectFooter } from "./ProjectFooter";
import { ProjectMenu } from "./ProjectMenu";
import { ProjectStats } from "./ProjectStats";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="bg-card text-card-foreground transition-shadow hover:shadow-md">
      <div className="space-y-4 p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <Link href={`project/${project.id}`} className="block">
              <h2 className="text-xl font-semibold">{project.title}</h2>
            </Link>
            <p className="text-sm text-muted-foreground">
              {project.description}
            </p>
          </div>
          <ProjectMenu project={project} />
        </div>

        <ProjectStats project={project} />
        <ProjectFooter project={project} />
      </div>
    </Card>
  );
}
