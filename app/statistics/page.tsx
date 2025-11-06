"use client";

import { StatisticsPage } from "@/components/StatisticsPage";
import { useRouter } from "next/navigation";

export default function StatisticsRoute() {
  const router = useRouter();

  return <StatisticsPage onClose={() => router.back()} />;
}

