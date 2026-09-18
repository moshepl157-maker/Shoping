"use client";

import { useMemo, useSyncExternalStore } from "react";
import { assessRisks, buildRecommendations, computeSummary, findDuplicateCoverage } from "@/lib/insurance/engine";
import * as insuranceStore from "@/lib/insurance/store";

export function useInsuranceComparison() {
  const policies = useSyncExternalStore(
    insuranceStore.subscribe,
    insuranceStore.getSnapshot,
    insuranceStore.getServerSnapshot
  );

  const duplicates = useMemo(() => findDuplicateCoverage(policies), [policies]);
  const risks = useMemo(() => assessRisks(policies), [policies]);
  const recommendations = useMemo(() => buildRecommendations(duplicates, risks), [duplicates, risks]);
  const summary = useMemo(() => computeSummary(policies, duplicates, risks), [policies, duplicates, risks]);

  return {
    policies,
    duplicates,
    risks,
    recommendations,
    summary,
    addPolicy: insuranceStore.addPolicy,
    updatePolicy: insuranceStore.updatePolicy,
    removePolicy: insuranceStore.removePolicy,
    clearPolicies: insuranceStore.clearPolicies,
  };
}
