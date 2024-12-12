import { PropsWithChildren } from "react";
import { auth } from "@/auth";
import { SessionProvider as Provider } from "next-auth/react";

export const SessionProvider = async ({ children }: PropsWithChildren) => {
  const session = await auth();
  return <Provider session={session}>{children}</Provider>;
};
