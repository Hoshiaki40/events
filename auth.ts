import authConfig from "@/auth.config";
import { env } from "@/src/env.mjs";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";

import prisma from "@/src/infrastructure/database/prisma";

import { UserRepository } from "./src/infrastructure/repositories/user.repository";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  callbacks: {
    // async signIn({ user, account }) {
    //   if (!user.id) return false

    //   if (account?.provider !== "credentials") return true

    // if (!existingUser || !existingUser.emailVerified) return false

    // if (existingUser.isTwoFactorEnabled) {
    //   const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
    //     existingUser.id
    //   )

    //   if (!twoFactorConfirmation) return false

    //   await db.twoFactorConfirmation.delete({
    //     where: { id: twoFactorConfirmation.id },
    //   })
    // }

    //   return true
    // },

    async session({ token, session }) {
      if (token.user && session.user) {
        session.user = {
          id: token.user.id,
          image: token.user.image,
          name:
            token.user.profile?.lastName + " " + token.user.profile?.firstName,
          email: token.user.email,
          username: token.user.username,
          emailVerified: token.user.emailVerified,
          client: token.user.client,
        };
      }
      return session;
    },

    async jwt({ token, user }) {
      if (!token.sub) return token;

      const userRepository = new UserRepository();

      const userFound = await userRepository.getUserById(token.sub);

      if (!userFound) return token;
      const { password, ...existingUser } = userFound;
      token.user = existingUser;

      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
