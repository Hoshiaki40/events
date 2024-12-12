"use server";

import { AdaptiveAgent } from "@/src/domain/usecases/agent.usecase";
import { AgentRepository } from "@/src/infrastructure/repositories/agent.repository";
import { actionClient } from "@/src/infrastructure/services/safe-action";
// src/server-actions/exercise/evaluate.action.ts
import { evaluateExerciseSchema } from "@/src/presentation/schemas/exercise.schema";

export const evaluateExercise = actionClient
  .schema(evaluateExerciseSchema)
  .action(async ({ parsedInput }) => {
    const repository = new AgentRepository();
    const agent = new AdaptiveAgent(parsedInput.userId, repository);
    await agent.initialize();

    const newSkill = await agent.updateSkill(
      parsedInput.domain,
      parsedInput.score,
      parsedInput.difficulty
    );

    return {
      newSkill,
      success: true,
    };
  });
