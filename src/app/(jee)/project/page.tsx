"use client";

import React, { useMemo, useState } from "react";
import {
  BeakerIcon,
  CheckSquare,
  Clock,
  MoreVertical,
  Users,
} from "lucide-react";

import { Button } from "@/src/presentation/components/ui/button";
import { Card } from "@/src/presentation/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/presentation/components/ui/dropdown-menu";
import { Input } from "@/src/presentation/components/ui/input";
import { useProjects } from "@/src/presentation/jee/useProjects";

import { ProjectCard } from "./_components/ProjectCard";

export interface Project {
  id: string;
  title: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  creatorId: string;
  members: Array<{ userId: string; role: Role }>;
  taskIds: string[];
}

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
  COLLABORATOR = "COLLABORATOR",
}

const projects: Project[] = [
  {
    id: "1",
    title: "jee_nosql",
    description: "A NoSQL database project for Java EE",
    createdAt: "2023-10-01T10:00:00Z",
    updatedAt: "2023-10-25T14:30:00Z",
    creatorId: "~eoC3XJdoV3TYHNin",
    members: [
      { userId: "~eoC3XJdoV3TYHNin", role: Role.ADMIN },
      { userId: "~eoC3XJdoV3T", role: Role.COLLABORATOR },
    ],
    taskIds: ["task1", "task2", "task3"],
  },
  {
    id: "2",
    title: "Playground-exercice",
    description: "Interactive coding exercises platform",
    createdAt: "2023-10-10T09:00:00Z",
    updatedAt: "2023-10-24T16:45:00Z",
    creatorId: "~eoC3XJdoV3T",
    members: [
      { userId: "~eoC3XJdoV3T", role: Role.ADMIN },
      { userId: "~eoC3XJdoV3TYHNin", role: Role.COLLABORATOR },
      { userId: "~eoC3XJdoV3TY", role: Role.USER },
    ],
    taskIds: ["task1", "task2"],
  },
  // ... Ajoutez d'autres projets ici
];

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: projects = [], isLoading, error } = useProjects();

  const filteredProjects = useMemo(() => {
    return projects.filter((project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [projects, searchQuery]);

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Erreur lors du chargement des projets</div>;
  }

  return (
    <div className="min-h-screen bg-background p-6 text-foreground">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="relative">
          <Input
            className="w-full border-input bg-background focus:border-ring"
            placeholder="Rechercher un projet..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
