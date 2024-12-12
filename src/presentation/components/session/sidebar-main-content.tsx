import { SidebarGroup } from "@/src/presentation/components/ui/sidebar";

import { DomainsList } from "./domain-list";
import { QuickActions } from "./quick-action";
import { RecentExercises } from "./recent-exercice";

export function SidebarMainContent() {
  return (
    <>
      <SidebarGroup className="flex-shrink-0">
        <QuickActions />
      </SidebarGroup>
      <div className="flex-grow overflow-auto">
        <SidebarGroup>{/* <DomainsList /> */}</SidebarGroup>
        <SidebarGroup>{/* <RecentExercises /> */}</SidebarGroup>
      </div>
    </>
  );
}
