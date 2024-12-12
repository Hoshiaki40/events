import "@/styles/globals.css";

import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { Toaster } from "sonner";

import { fontSans } from "@/config/fonts";
import { siteConfig } from "@/config/site";

import QueryProvider from "../presentation/components/providers/query-provider";
import { SessionProvider } from "../presentation/components/providers/session-provider";
import { ThemeProvider } from "../presentation/components/providers/theme-provider";
import { TailwindIndicator } from "../presentation/components/tailwind-indicator";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <html suppressHydrationWarning lang="fr">
        <head />
        <body
          className={clsx(
            "min-h-screen bg-background font-sans antialiased dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(0,24,51,0.6),rgba(25,25,5,0.5))]",
            fontSans.variable
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={true}
          >
            <QueryProvider>{children}</QueryProvider>
          </ThemeProvider>
          <Toaster />
          <TailwindIndicator />
        </body>
      </html>
    </SessionProvider>
  );
}
