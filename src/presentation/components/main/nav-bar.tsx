"use client";

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { SidebarOutlineIcon } from "@/src/presentation/components/icons";
import { ThemeSwitch } from "@/components/theme-switch";

export const CustomNavbar = () => (
  <div className="flex justify-center w-full">
    <div className="flex w-full h-full flex-row flex-nowrap justify-between items-center p-4 gap-4 rounded-large border-small border-default-200/20 shadow-md backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50">
      <div className="sm:flex gap-4 justify-start">
        <div>
          <Button isIconOnly variant="light">
            <SidebarOutlineIcon className="h-6 w-6" />
          </Button>
        </div>
      </div>
      <div className=" border">
        <ThemeSwitch />
      </div>
    </div>
  </div>
);
