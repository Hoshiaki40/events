import { PrismaClient, Questions } from "@prisma/client";

import { SubmitExerciseInput } from "@/src/presentation/schemas/exercise.schema";

import { IAgentRepository } from "../interfaces/agent.repository";
import { AdaptiveAgent } from "./agent.usecase";

// src/domain/usecases/ExerciseSubmissionUseCase.ts
export class ExerciseSubmissionUseCase {
  constructor(
    private readonly agentRepository: IAgentRepository,
    private readonly prisma: PrismaClient
  ) {}

  async execute(input: SubmitExerciseInput) {
    // Calculer le score moyen
    const exercise = await this.prisma.exercise.findUnique({
      where: { id: input.exerciseId },
      include: { questions: true },
    });

    if (!exercise) {
      throw new Error("Exercise not found");
    }

    // Mise à jour de l'agent
    const agent = new AdaptiveAgent(input.userId, this.agentRepository);
    await agent.initialize();

    const normalizedDifficulty = input.difficultyLevel / 5;
    const averageScore = this.calculateAverageScore(
      input.answers,
      exercise.questions
    );

    const newSkill = await agent.updateSkill(
      input.domain,
      averageScore,
      normalizedDifficulty
    );

    // Enregistrer l'historique
    await this.prisma.exerciseHistory.create({
      data: {
        userId: input.userId,
        exerciseId: input.exerciseId,
        average: averageScore,
      },
    });

    return {
      newSkill,
      averageScore,
      success: true,
    };
  }

  private calculateAverageScore(
    answers: Record<string, string>,
    questions: Questions[]
  ): number {
    let totalScore = 0;
    let answeredQuestions = 0;

    questions.forEach((question) => {
      const answer = answers[question.id];
      if (answer) {
        // Logique simple de notation - à adapter selon vos besoins
        const score = this.evaluateAnswer(answer, question.response || "");
        totalScore += score;
        answeredQuestions++;
      }
    });

    return answeredQuestions > 0 ? (totalScore / answeredQuestions) * 5 : 0;
  }

  private evaluateAnswer(studentAnswer: string, correctAnswer: string): number {
    // Implémenter votre logique d'évaluation ici
    // Exemple simple de comparaison
    return studentAnswer.trim().toLowerCase() ===
      correctAnswer.trim().toLowerCase()
      ? 1
      : 0;
  }
}
