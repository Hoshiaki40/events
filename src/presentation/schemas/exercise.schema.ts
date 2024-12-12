// src/presentation/validation/exercise.schema.ts
import { z } from "zod";

export const evaluateExerciseSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  domain: z.string().min(1, "Domain is required"),
  score: z
    .number()
    .min(0, "Score must be at least 0")
    .max(5, "Score cannot exceed 5"),
  difficulty: z
    .number()
    .min(0, "Difficulty must be at least 0")
    .max(1, "Difficulty cannot exceed 1"),
});

export type EvaluateExerciseInput = z.infer<typeof evaluateExerciseSchema>;

export const submitExerciseSchema = z.object({
  userId: z.string().min(1),
  exerciseId: z.string().min(1),
  answers: z.record(z.string(), z.string()),
  domain: z.string().min(1),
  difficultyLevel: z.number().min(0).max(5),
});

export type SubmitExerciseInput = z.infer<typeof submitExerciseSchema>;

export const selectExerciseSchema = z.object({
  userId: z.string(),
  domain: z.string(),
});

export type SelectExerciseInput = z.infer<typeof selectExerciseSchema>;
