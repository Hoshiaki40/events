import React from "react";

import { DomainCardList } from "@/src/presentation/components/subject/domain-card";

function DomainPage({ params }: { params: { code: string } }) {
  return <DomainCardList code={params.code} />;
}

export default DomainPage;
