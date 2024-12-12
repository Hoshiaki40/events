// src/presentation/hooks/useServerAction.ts
import { useQuery } from "@tanstack/react-query";
import { type SafeActionFn, type SafeActionResult } from "next-safe-action";

import {
  AppError,
  BadRequestError,
  InternalServerError,
  NotFoundError,
  ValidationError,
} from "@/src/utils/errors";

interface UseServerActionOptions<TInput> {
  input?: TInput;
  enabled?: boolean;
  queryKey: string[];
}

export async function handleActionResult<Data>(
  action: Promise<
    SafeActionResult<any, any, any, any, any, Data, any> | undefined
  >
): Promise<Data> {
  const result = await action;

  if (!result) {
    throw new BadRequestError("Action returned with undefined result.");
  }

  if ("validationError" in result && result.validationError) {
    throw new ValidationError(result.validationError);
  }

  if ("serverError" in result && result.serverError) {
    throw new InternalServerError(result.serverError);
  }

  const data = result.data;
  if (typeof data === "undefined") {
    throw new NotFoundError("Action returned with data undefined.");
  }

  return data;
}

export function useServerAction<TInput, TOutput>(
  action: SafeActionFn<any, any, any, any, any, TOutput>,
  options: UseServerActionOptions<TInput>
) {
  const { input, enabled = true, queryKey } = options;

  return useQuery({
    queryKey,
    queryFn: async () => {
      try {
        return await handleActionResult(action(input));
      } catch (error) {
        if (error instanceof AppError) {
          throw error;
        }
        throw new InternalServerError(
          error instanceof Error
            ? error.message
            : "Une erreur inattendue s'est produite"
        );
      }
    },
    enabled,
  });
}
