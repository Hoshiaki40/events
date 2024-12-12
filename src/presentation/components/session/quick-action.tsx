"use client";

import { useState } from "react";
import { History, MessageSquare, PlusCircle } from "lucide-react";

import { Button } from "@/src/presentation/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/presentation/components/ui/dialog";
import {
  SidebarMenu,
  SidebarMenuItem,
} from "@/src/presentation/components/ui/sidebar";

import { useIsClient } from "../../hooks/use-is-client";
import { ProjectForm } from "../../jee/components/project-form";

// import { NewProjectForm } from "./new-project-form";

export function QuickActions() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isClient = useIsClient();

  if (!isClient) {
    return null;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full justify-start" variant="ghost">
              <PlusCircle className="mr-2 h-4 w-4" />
              Nouveau Project
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
            </DialogHeader>
            <ProjectForm onSuccess={() => setIsDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </SidebarMenuItem>
      <SidebarMenuItem>
        {/* <Button className="w-full justify-start" variant="ghost">
          <History className="mr-2 h-4 w-4" />
          Exercise History
        </Button> */}
      </SidebarMenuItem>
      <SidebarMenuItem>
        {/* <Button className="w-full justify-start" variant="ghost">
          <MessageSquare className="mr-2 h-4 w-4" />
          Feedback
        </Button> */}
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
