import { env } from "@/src/env.mjs";
import { verifyPassword } from "@/src/utils";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { User } from "@/src/domain/jee/users";
import { UserRepository } from "@/src/infrastructure/repositories/user.repository";
import { loginSchema } from "@/src/presentation/schemas/auth.schema";

export default {
  trustHost: true,
  providers: [
    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const userRepository = new UserRepository();
        const validatedFields = loginSchema.parse(credentials);
        const { identifier, password } = validatedFields;
        let userLogin = await userRepository.getUserByEmail(identifier);
        if (!userLogin) {
          userLogin = await userRepository.getUserByUsername(identifier);
        }
        if (!userLogin) return null;
        const passwordMatch = await verifyPassword(
          password,
          userLogin.password
        );
        if (!passwordMatch) return null;
        return userLogin;
      },
    }),
  ],
} satisfies NextAuthConfig;
