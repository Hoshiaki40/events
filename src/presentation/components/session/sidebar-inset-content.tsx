"use client";

import { PropsWithChildren, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { PlusCircle } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/src/presentation/components/ui/breadcrumb";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/presentation/components/ui/dialog";
import { Separator } from "@/src/presentation/components/ui/separator";
import {
  SidebarInset,
  SidebarTrigger,
} from "@/src/presentation/components/ui/sidebar";

import { ProjectForm } from "../../jee/components/project-form";
import { Button } from "../ui/button";

type SidebarInsetContentProps = {};

export function SidebarInsetContent({
  children,
}: PropsWithChildren<SidebarInsetContentProps>) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const pathname = usePathname();

  const breadcrumbItems = useMemo(() => {
    // Ignorer le premier slash et diviser le chemin
    const segments = pathname.split("/").filter((segment) => segment);

    return segments.map((segment, index) => {
      const path = `/${segments.slice(0, index + 1).join("/")}`;
      const label =
        segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");

      const isLast = index === segments.length - 1;

      return {
        label,
        path,
        isLast,
      };
    });
  }, [pathname]);

  return (
    <SidebarInset className="p-4">
      <header className="flex h-16 shrink-0 items-center">
        <div className="flex w-full items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="h-4" />
            <Breadcrumb className="inline-flex whitespace-nowrap">
              <BreadcrumbList className="flex items-center">
                {breadcrumbItems.length === 2 ? (
                  <>
                    <BreadcrumbItem className="hidden items-center md:flex">
                      <BreadcrumbLink href={breadcrumbItems[0].path}>
                        {breadcrumbItems[0].label}
                      </BreadcrumbLink>
                      <BreadcrumbSeparator />
                    </BreadcrumbItem>
                    <BreadcrumbItem className="flex items-center">
                      <BreadcrumbPage>
                        {breadcrumbItems[1].label}
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                ) : (
                  <BreadcrumbItem className="flex items-center">
                    <BreadcrumbPage>
                      {breadcrumbItems[breadcrumbItems.length - 1]?.label || ""}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
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
        </div>
      </header>
      {children}
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0"></div>
    </SidebarInset>
  );
}
