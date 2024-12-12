import { Inter } from "next/font/google";

import { NavBar } from "@/src/presentation/event/NavBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`flex min-h-screen flex-col bg-background text-foreground`}>
      <NavBar isLoggedIn={true} userInitials="JD" userRole="ADMIN" />
      <main className="container mx-auto flex-grow px-4 py-8">{children}</main>
      <footer className="mt-auto bg-muted py-6">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          © 2024 EventHub. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
