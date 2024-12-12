"use client";

import { json } from "stream/consumers";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Check, ChevronsUpDown, Command } from "lucide-react";
import { useSession } from "next-auth/react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/src/presentation/components/ui/sidebar";
import { Project } from "@/src/domain/jee/project";

import { useCurrentSession } from "../../hooks/use-current-session";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export function SidebarHeader() {
  const user = useCurrentSession();
  const router = useRouter();
  const params = useParams();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["project"],
    queryFn: async () => {
      const response = await fetch("http://localhost:8080/api/projects", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      return response.json();
    },
    enabled: !!user?.email,
  });

  useEffect(() => {
    if (projects.length > 0) {
      // Si un projectId est dans l'URL, sélectionner ce projet
      if (params.projectId) {
        const projectFromUrl = projects.find((p) => p.id === params.projectId);
        if (projectFromUrl) {
          setSelectedProject(projectFromUrl);
          return;
        }
      }
      // Sinon sélectionner le premier projet
      if (!selectedProject) {
        setSelectedProject(null);
      }
    }
  }, [projects, params.projectId, selectedProject]);

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
    router.push(`/project/${project.id}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    // <SidebarMenu>
    //   <SidebarMenuItem>
    //     <SidebarMenuButton size="lg" asChild>
    //       <a href="#">
    //         <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
    //           <Command className="size-4" />
    //         </div>
    //         <div className="grid flex-1 text-left text-sm leading-tight">
    //           <span className="truncate font-semibold">Acme Inc</span>
    //           <span className="truncate text-xs">Enterprise</span>
    //         </div>
    //       </a>
    //     </SidebarMenuButton>
    //   </SidebarMenuItem>
    // </SidebarMenu>
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Command className="size-4" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold">
                  {selectedProject?.title || "No Project"}
                </span>
                <span className="text-xs">Project</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width]"
            align="start"
          >
            {projects.map((project) => (
              <DropdownMenuItem
                key={project.id}
                onSelect={() => handleProjectSelect(project)}
              >
                {project.title}
                {project.id === selectedProject?.id && (
                  <Check className="ml-auto size-4" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
