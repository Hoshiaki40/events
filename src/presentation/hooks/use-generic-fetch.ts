import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

import { FetchOptions, PaginatedResponse } from "../lib/api";
import { ApiErrors } from "@/src/lib/utils";

// export const useGenericFetch = <T>(
//     queryKey: string[],
//     queryFn: (option?: FetchOptions) => Promise<PaginatedResponse<T>>,
//     option?: FetchOptions
// ) => {
//     const query = useQuery<PaginatedResponse<T>>({
//         queryKey: queryKey,
//         queryFn: () => queryFn(option),
//     })

//     return query
// }

type GenericFetchOptions<R> = Omit<
  UseQueryOptions<R, ApiErrors>,
  "queryKey" | "queryFn"
>;

type QueryFnType<T, R> =
  | ((id: number) => Promise<R>)
  | ((file: File) => Promise<R>)
  | ((option?: FetchOptions) => Promise<R>);

type UseGenericFetchProp<T, R extends T | PaginatedResponse<T>> = {
  queryKey: string[];
  queryFn: QueryFnType<T, R>;
  options?: GenericFetchOptions<R>;
  param?: number | File | FetchOptions;
};

export const useGenericFetch = <T, R extends T | PaginatedResponse<T>>(
  queryKey: string[],
  queryFn: QueryFnType<T, R>,
  options?: GenericFetchOptions<R>,
  param?: number | File | FetchOptions
) => {
  const query = useQuery<R, ApiErrors>({
    queryKey: queryKey,
    queryFn: () => {
      if (typeof queryFn === "function") {
        if (typeof param === "number") {
          return (queryFn as (id: number) => Promise<R>)(param);
        } else if (param instanceof File) {
          return (queryFn as (file: File) => Promise<R>)(param);
        } else {
          return (queryFn as (option?: FetchOptions) => Promise<R>)(param);
        }
      }
      throw new Error("Invalid queryFn");
    },
    ...options,
  });

  return query as UseQueryResult<R, ApiErrors>;
};
