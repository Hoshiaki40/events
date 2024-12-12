import { BookOpenCheck, ChevronRight } from "lucide-react";

import { Button } from "@/src/presentation/components/ui/button";
import {
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/src/presentation/components/ui/sidebar";

const recentExercises = [
  { title: "Équations du second degré", domain: "Algèbre" },
  { title: "Théorème de Pythagore", domain: "Géométrie" },
  { title: "Limites et continuité", domain: "Analyse" },
  { title: "Limites et continuité", domain: "Analyse" },
  { title: "Théorème de Pythagore", domain: "Géométrie" },
  { title: "Systèmes d'équations linéaires", domain: "Algèbre" },
  { title: "Trigonométrie", domain: "Géométrie" },
  { title: "Théorème de Pythagore", domain: "Géométrie" },
  { title: "Limites et continuité", domain: "Analyse" },
  { title: "Trigonométrie", domain: "Géométrie" },
  { title: "Limites et continuité", domain: "Analyse" },
  { title: "Trigonométrie", domain: "Géométrie" },
  { title: "Limites et continuité", domain: "Analyse" },
];

export function RecentExercises() {
  return (
    <>
      <SidebarGroupLabel>Recent Exercises</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {recentExercises.slice(0, 10).map((exercise, index) => (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton asChild>
                <a href="#" className="flex w-full items-center">
                  <BookOpenCheck className="mr-2 h-4 w-4 flex-shrink-0" />
                  <div className="flex flex-col overflow-hidden">
                    <span className="truncate">{exercise.title}</span>
                    <span className="truncate text-xs text-muted-foreground">
                      {exercise.domain}
                    </span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
          <div className="mt-2 px-3">
            <Button
              variant="link"
              className="w-full justify-start p-0 text-xs font-normal"
            >
              <span>View all</span>
              <ChevronRight className="ml-1 h-3 w-3" />
            </Button>
          </div>
        </SidebarMenu>
      </SidebarGroupContent>
    </>
  );
}
