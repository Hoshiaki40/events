// src/server-actions/exercise/select-exercise.action.ts
"use server";

import { AdaptiveAgent } from "@/src/domain/usecases/agent.usecase";
import prisma from "@/src/infrastructure/database/prisma";
import { AgentRepository } from "@/src/infrastructure/repositories/agent.repository";
import { SelectExerciseInput } from "@/src/presentation/schemas/exercise.schema";

export async function selectExercise(input: SelectExerciseInput) {
  try {
    const repository = new AgentRepository();
    const agent = new AdaptiveAgent(input.userId, repository);
    await agent.initialize();

    const predictedLevel = agent.predictPerformance(input.domain);
    const selectedLevel = Math.ceil(predictedLevel * 5);

    const exercise = await prisma.exercise.findFirst({
      where: {
        domain: input.domain,
        difficultyLevel: selectedLevel,
      },
      include: {
        questions: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    if (!exercise) {
      throw new Error("No exercise found for this level and domain");
    }

    return {
      exercise,
      predictedLevel,
      success: true,
    };
  } catch (error) {
    console.error("Error selecting exercise:", error);
    return {
      success: false,
      error: "Failed to select exercise",
    };
  }
}

// export const selectExercise = actionClient
//   .schema(selectExerciseSchema)
//   .action(async ({ parsedInput }) => {
//     const repository = new AgentRepository();
//     const agent = new AdaptiveAgent(parsedInput.userId, repository);
//     await agent.initialize();

//     const predictedLevel = agent.predictPerformance(parsedInput.domain);
//     const selectedLevel = Math.ceil(predictedLevel * 5); // Convertir en niveau 1-5

//     // Sélectionner un exercice aléatoire du niveau approprié
//     const exercise = await prisma.exercise.findFirst({
//       where: {
//         domain: parsedInput.domain,
//         difficultyLevel: selectedLevel,
//       },
//       include: {
//         questions: true,
//       },
//       orderBy: {
//         // Sélection aléatoire
//         createdAt: "asc",
//       },
//     });

//     return { exercise, predictedLevel };
//   });
