"use client";

import * as React from "react";
import { signOut } from "@/auth";
import { logout } from "@/src/server-actions/auth/logout.action";
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  Laptop,
  LogOut,
  Moon,
  Sparkles,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/presentation/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/presentation/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/src/presentation/components/ui/sidebar";

import { useCurrentSession } from "../../hooks/use-current-session";

const userStatic = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
};

export function SidebarFooterContent() {
  const { theme, setTheme } = useTheme();
  const user = useCurrentSession();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={user?.image ?? userStatic.avatar}
                  alt={user?.name ?? userStatic.name}
                />
                <AvatarFallback className="rounded-lg">{`${user?.name?.charAt(0) ?? "C"}${user?.name?.charAt(1) ?? "N"}`}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {user?.name ?? userStatic.name}
                </span>
                <span className="truncate text-xs">
                  {user?.email ?? userStatic.email}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side="bottom"
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={user?.image ?? userStatic.avatar}
                    alt={user?.name ?? userStatic.name}
                  />
                  <AvatarFallback className="rounded-lg">{`${user?.name?.charAt(0) ?? "C"}${user?.name?.charAt(1) ?? "N"}`}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {user?.name ?? userStatic.name}
                  </span>
                  <span className="truncate text-xs">
                    {user?.email ?? userStatic.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck className="mr-2 h-4 w-4" />
                <span>Account</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Billing</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell className="mr-2 h-4 w-4" />
                <span>Notifications</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Theme</DropdownMenuLabel>
            <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
              <DropdownMenuRadioItem value="light">
                <Sun className="mr-2 h-4 w-4" />
                <span>Light</span>
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="dark">
                <Moon className="mr-2 h-4 w-4" />
                <span>Dark</span>
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
            <DropdownMenuSeparator />
            <form
              action={async () => {
                await logout();
              }}
            >
              <DropdownMenuItem asChild>
                <button type="submit" className="flex w-full items-center">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </button>
              </DropdownMenuItem>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
