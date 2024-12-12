"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/presentation/components/ui/avatar";
import { Button } from "@/src/presentation/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/presentation/components/ui/dropdown-menu";

interface NavBarProps {
  isLoggedIn: boolean;
  userInitials?: string;
  userAvatar?: string;
  userRole?: "ADMIN" | "ORGANIZER" | "PARTICIPANT";
}

export function NavBar({
  isLoggedIn,
  userInitials,
  userAvatar,
  userRole,
}: NavBarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/events"
            className="bg-gradient-to-r from-primary to-accent bg-clip-text text-2xl font-bold text-transparent"
          >
            EventHub
          </Link>
          <nav className="hidden items-center space-x-4 md:flex">
            {isLoggedIn ? (
              <>
                <Link href="/events/create">
                  <Button
                    variant="ghost"
                    className="text-primary transition-colors hover:text-primary"
                  >
                    Create Event
                  </Button>
                </Link>
                <Link href="/my-events">
                  <Button
                    variant="ghost"
                    className="text-primary transition-colors hover:text-primary"
                  >
                    My Events
                  </Button>
                </Link>
                {userRole === "ADMIN" && (
                  <Link href="/admin/dashboard">
                    <Button
                      variant="ghost"
                      className="text-primary transition-colors hover:text-primary"
                    >
                      Admin Dashboard
                    </Button>
                  </Link>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-8 w-8 rounded-full"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={userAvatar} alt="User avatar" />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {userInitials}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="cursor-pointer">
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings" className="cursor-pointer">
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer text-destructive">
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  className="text-secondary transition-colors hover:text-primary"
                >
                  Login
                </Button>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Sign Up
                </Button>
              </>
            )}
          </nav>
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="border-t border-border md:hidden">
          <nav className="container mx-auto flex flex-col space-y-4 px-4 py-4">
            {isLoggedIn ? (
              <>
                <Link
                  href="/events/create"
                  className="text-primary transition-colors hover:text-primary/80"
                >
                  Create Event
                </Link>
                <Link
                  href="/my-events"
                  className="text-primary transition-colors hover:text-primary/80"
                >
                  My Events
                </Link>
                {userRole === "ADMIN" && (
                  <Link
                    href="/admin/dashboard"
                    className="text-primary transition-colors hover:text-primary/80"
                  >
                    Admin Dashboard
                  </Link>
                )}
                <Link
                  href="/profile"
                  className="text-primary transition-colors hover:text-primary/80"
                >
                  Profile
                </Link>
                <Link
                  href="/settings"
                  className="text-primary transition-colors hover:text-primary/80"
                >
                  Settings
                </Link>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-destructive"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-secondary transition-colors hover:text-primary"
                >
                  Login
                </Button>
                <Button className="w-full justify-start bg-primary text-primary-foreground hover:bg-primary/90">
                  Sign Up
                </Button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
