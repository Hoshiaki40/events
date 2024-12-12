"use server";

import { ExerciseSubmissionUseCase } from "@/src/domain/usecases/exercise.usecase";
import prisma from "@/src/infrastructure/database/prisma";
import { AgentRepository } from "@/src/infrastructure/repositories/agent.repository";
import { actionClient } from "@/src/infrastructure/services/safe-action";
import { submitExerciseSchema } from "@/src/presentation/schemas/exercise.schema";

export const submitExercise = actionClient
  .schema(submitExerciseSchema)
  .action(async ({ parsedInput }) => {
    const agentRepository = new AgentRepository();
    const submissionUseCase = new ExerciseSubmissionUseCase(
      agentRepository,
      prisma
    );
    return await submissionUseCase.execute(parsedInput);
  });
