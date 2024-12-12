import { DefaultSession } from "next-auth";
import JWT from "next-auth/jwt";

import { User } from "@/src/domain/entities/user";

import { ILogin } from "./src/domain/entities/login";

declare module "next-auth" {
  interface Session {
    /** The user's postal address. */
    user: DefaultSession["user"] &
      Pick<
        User,
        "id" | "email" | "username" | "client" | "profile" | "emailVerified"
      >;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    /** OpenID ID Token */
    id: string;
    token: string;
    role: string;
    user?: Omit<
      User,
      | "password"
      | "active"
      | "isTwoFactorEnabled"
      | "createdBy"
      | "updatedBy"
      | "createdAt"
      | "updatedAt"
    >;
  }
}
