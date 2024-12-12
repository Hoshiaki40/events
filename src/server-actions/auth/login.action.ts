"use server";

import { actionClient } from "@/src/infrastructure/services/safe-action";
import { loginSchema } from "@/src/presentation/schemas/auth.schema";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import {
  InternalServerError,
  InvalidCredentialError,
} from "../../utils/errors";

export const login = actionClient
  .schema(loginSchema)
  .action(async ({ parsedInput: { identifier, password, rememberMe } }) => {
    try {
      const result = await signIn("credentials", {
        identifier,
        password,
        redirect: false,
      });
      if (result?.error) {
        throw result?.error;
      }

      // Retournez un objet indiquant le succès et l'URL de redirection
      return { success: true, redirectTo: DEFAULT_LOGIN_REDIRECT };
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            throw new InvalidCredentialError("Email ou mot de passe incorrect");
          default:
            throw new InternalServerError(
              "Une erreur est survenue lors de la connexion",
            );
        }
      }

      console.error(error);

      throw new InternalServerError(
        "Une erreur est survenue lors de la connexion",
      );
    }
  });
