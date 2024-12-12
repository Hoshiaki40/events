// "use client";

import React from "react";
import { getSubjects } from "@/src/server-actions/subject/get-subject.action";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { handleActionResult } from "@/src/presentation/hooks/use-server-action";
import { SubjectCardList } from "@/src/presentation/components/subject/subject-card";

export default async function SubjectSelection() {
  const queryClient = new QueryClient();

  // Précharger les données
  await queryClient.prefetchQuery({
    queryKey: ["subjects"],
    queryFn: async () => {
      return await handleActionResult(
        getSubjects({
          levelId: 1,
          schoolYearId: 1,
          serie: "A",
        })
      );
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SubjectCardList />
    </HydrationBoundary>
  );
}
