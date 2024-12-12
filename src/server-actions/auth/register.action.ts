"use server";

import { actionClient } from "@/src/infrastructure/services/safe-action";
import { registerSchema } from "@/src/presentation/schemas/auth.schema";
import { ConflictError } from "../../utils/errors";
import { Container } from "@/src/infrastructure/store/container";

export const register = actionClient
  .schema(registerSchema)
  .action(async ({ parsedInput }) => {
    try {
      const container = Container.getInstance();
      const authUseCase = container.getAuthUseCase();

      await authUseCase.register(parsedInput);

      return { success: true };

      // throw new Error("Une erreur est survenue lors de la connexion");
    } catch (error) {
      if (error instanceof ConflictError)
        console.error("Action error:", error.message);
      throw error;
    }
  });
