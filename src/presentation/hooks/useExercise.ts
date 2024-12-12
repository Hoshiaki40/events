import { selectExercise } from "@/src/server-actions/exercise/select-exercice.action";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

interface UseExerciseProps {
  userId: string;
  domain: string;
}

// Définir le type de retour de selectExercise
type SelectExerciseReturn = {
  exercise: {
    id: string;
    statement: string;
    domain: string;
    difficultyLevel: number;
    questions: {
      id: string;
      statement: string;
      domain: string;
      createdAt: Date;
      updatedAt: Date;
      exerciseId: string;
      method: string | null;
      response: string | null;
      explication: string | null;
    }[];
  };
  predictedLevel: number;
  success: boolean;
  error?: string;
};

export function useExercise({
  userId,
  domain,
}: UseExerciseProps): UseQueryResult<SelectExerciseReturn, unknown> {
  return useQuery({
    queryKey: ["exercise", userId, domain],
    queryFn: async () => {
      const result = await selectExercise({ userId, domain });
      return result;
    },
    enabled: !!userId && !!domain,
  });
}
