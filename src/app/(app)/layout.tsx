"use client";

// import { Button, Link, User } from "@nextui-org/react";
import { logout } from "@/src/server-actions/auth/logout.action";

import {
  MinusCircleOutlineIcon,
  QuestionCircleOutlineIcon,
} from "@/src/presentation/components/icons";
import { CustomNavbar } from "@/src/presentation/components/main/nav-bar";
import { Sidebar } from "@/src/presentation/components/main/side-bar";

export default function Component({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
  // <div className="flex h-dvh w-full">
  //   <div className="relative flex h-full w-72 max-w-[288px] flex-1 flex-col border-r p-6">
  //     <div className="flex items-center gap-2 px-2">
  //       <div className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground">
  //         <svg
  //           fill="none"
  //           height="32"
  //           viewBox="0 0 32 32"
  //           width="32"
  //           className="text-background"
  //         >
  //           <path
  //             clipRule="evenodd"
  //             d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
  //             fill="currentColor"
  //             fillRule="evenodd"
  //           ></path>
  //         </svg>
  //       </div>
  //       <span className="text-small font-bold uppercase">Acme</span>
  //     </div>
  //     <div className="mt-8 flex items-center gap-3 px-3">
  //       <User
  //         name="Junior Garcia"
  //         description={
  //           <Link href="https://twitter.com/jrgarciadev" size="sm" isExternal>
  //             @jrgarciadev
  //           </Link>
  //         }
  //         avatarProps={{
  //           src: "https://avatars.githubusercontent.com/u/30373425?v=4",
  //         }}
  //       />
  //     </div>
  //     <Sidebar />
  //     <div className="mt-auto flex flex-col gap-2">
  //       <Button variant="light" className="justify-start">
  //         <QuestionCircleOutlineIcon className="mr-2 h-4 w-4" />
  //         Help & Information
  //       </Button>
  //       <Button
  //         variant="light"
  //         className="justify-start"
  //         onClick={async () => {
  //           await logout();
  //         }}
  //       >
  //         <MinusCircleOutlineIcon className="mr-2 h-4 w-4" />
  //         Log Out
  //       </Button>
  //     </div>
  //   </div>
  //   <div className="w-full h-[100%] flex-1 flex-col p-4">
  //     <CustomNavbar />
  //     <main className="mt-4 h-[100%] w-full border rounded-xl overflow-x-auto">
  //       <div className="flex h-[90%] w-full flex-col gap-4"></div>
  //     </main>
  //   </div>
  // </div>
}
