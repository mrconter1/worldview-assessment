"use client";

import { StatisticsPage } from "@/components/StatisticsPage";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

function StatisticsContent() {
  const router = useRouter();
  return <StatisticsPage onClose={() => router.back()} />;
}

export default function StatisticsRoute() {
  return (
    <Suspense fallback={null}>
      <StatisticsContent />
    </Suspense>
  );
}

