// "useclient";

import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/src/presentation/components/ui/sidebar";

import { SidebarFooterContent } from "./sidebar-footer-content";
import { SidebarHeader as Head } from "./sidebar-header";
import { SidebarMainContent } from "./sidebar-main-content";

export function Sidebar() {
  return (
    <SidebarComponent variant="inset" className="flex flex-col">
      <SidebarHeader>
        <Head />
      </SidebarHeader>
      <SidebarContent className="flex flex-grow flex-col">
        <SidebarMainContent />
      </SidebarContent>
      <SidebarFooter className="flex-shrink-0">
        <SidebarFooterContent />
      </SidebarFooter>
    </SidebarComponent>
  );
}
