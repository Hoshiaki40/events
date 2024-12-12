import { useQuery } from "@tanstack/react-query";

import { Project } from "@/src/domain/jee/project";

import { useCurrentSession } from "../hooks/use-current-session";

export function useProjects() {
  const user = useCurrentSession();

  return useQuery<Project[]>({
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

      const data: Project[] = (await response.json()) as Project[];

      return data;
    },
    enabled: !!user?.email,
  });
}
