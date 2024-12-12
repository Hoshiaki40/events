import { ChevronRight, GraduationCap } from "lucide-react";

import { Button } from "@/src/presentation/components/ui/button";
import {
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/src/presentation/components/ui/sidebar";

const domains = ["Algèbre", "Géométrie", "Analyse"];

export function DomainsList() {
  return (
    <>
      <SidebarGroupLabel>Domains</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {domains.map((domain, index) => (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton asChild>
                <a href="#">
                  <GraduationCap className="mr-2 h-4 w-4" />
                  <span>{domain}</span>
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
