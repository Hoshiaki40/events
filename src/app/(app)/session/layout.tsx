// "useclient";

import * as React from "react";

import { SidebarProvider } from "@/src/presentation/components/ui/sidebar";
import { Sidebar } from "@/src/presentation/components/session/sidebar";
import { SidebarInsetContent } from "@/src/presentation/components/session/sidebar-inset-content";

type SessionLayoutProps = {};

export default function SessionLayout({
  children,
}: React.PropsWithChildren<SessionLayoutProps>) {
  return (
    <SidebarProvider>
      <Sidebar />
      <SidebarInsetContent>{children}</SidebarInsetContent>
    </SidebarProvider>
  );
}
