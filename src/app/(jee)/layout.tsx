"use client";

// import { Button, Link, User } from "@nextui-org/react";
import { logout } from "@/src/server-actions/auth/logout.action";

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
