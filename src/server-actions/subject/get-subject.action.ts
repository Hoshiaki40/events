"use server";

// src/server-actions/exercise/evaluate.action.ts
import { AdaptiveAgent } from "@/src/domain/usecases/agent.usecase";
import { AgentRepository } from "@/src/infrastructure/repositories/agent.repository";
import { actionClient } from "@/src/infrastructure/services/safe-action";
import { Container } from "@/src/infrastructure/store/container";
import { evaluateExerciseSchema } from "@/src/presentation/schemas/exercise.schema";
import { subjectFilterSchema } from "@/src/presentation/schemas/subject.schema";

export const getSubjects = actionClient
  .schema(subjectFilterSchema)
  .action(async ({ parsedInput }) => {
    const container = Container.getInstance();
    const subjectsUseCase = container.getSubjectsUseCase();

    const subjects = await subjectsUseCase.getSubjects(parsedInput);

    return subjects;
  });

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
