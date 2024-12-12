// src/hooks/use-query.ts
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

interface QueryConfig<T>
  extends Omit<UseQueryOptions<T>, "queryKey" | "queryFn"> {
  requiresAuth?: boolean;
}

export function useGenericQuery<T>(
  queryKey: string[],
  queryFn: () => Promise<T>,
  config: QueryConfig<T> = {}
) {
  return useQuery({
    queryKey,
    queryFn,
    ...config,
  });
}
