import { coverageCategories, coverageCategoryName } from "./categories";
import {
  ComparisonSummary,
  DuplicateFinding,
  InsurancePolicy,
  Recommendation,
  RiskFinding,
  RiskLevel,
} from "./types";

function riskOrder(level: RiskLevel): number {
  return level === "גבוה" ? 2 : level === "בינוני" ? 1 : 0;
}

export function findDuplicateCoverage(policies: InsurancePolicy[]): DuplicateFinding[] {
  const byCategory = new Map<string, InsurancePolicy[]>();

  policies.forEach((policy) => {
    policy.coverageIds.forEach((categoryId) => {
      const list = byCategory.get(categoryId) ?? [];
      list.push(policy);
      byCategory.set(categoryId, list);
    });
  });

  const findings: DuplicateFinding[] = [];
  byCategory.forEach((matchingPolicies, categoryId) => {
    if (matchingPolicies.length < 2) return;

    // הפוליסה הזולה ביותר נשארת; שאר הפוליסות נחשבות לכיסוי כפול.
    const sorted = [...matchingPolicies].sort((a, b) => a.monthlyPremium - b.monthlyPremium);
    const overlapCost = sorted
      .slice(1)
      .reduce((sum, p) => sum + p.monthlyPremium / Math.max(p.coverageIds.length, 1), 0);

    findings.push({
      categoryId,
      categoryName: coverageCategoryName(categoryId),
      policies: matchingPolicies.map((p) => ({
        policyId: p.id,
        policyName: p.name,
        monthlyPremium: p.monthlyPremium,
      })),
      estimatedMonthlyOverlapCost: Math.round(overlapCost),
    });
  });

  return findings.sort((a, b) => b.policies.length - a.policies.length);
}

export function assessRisks(policies: InsurancePolicy[]): RiskFinding[] {
  const covered = new Set<string>();
  policies.forEach((p) => p.coverageIds.forEach((id) => covered.add(id)));

  const findings: RiskFinding[] = coverageCategories
    .filter((cat) => !covered.has(cat.id))
    .map((cat) => ({
      categoryId: cat.id,
      categoryName: cat.name,
      level: cat.essential ? "גבוה" : "בינוני",
      reason: cat.essential
        ? `אין כיסוי כלל לתחום "${cat.name}" — חשיפה משמעותית במקרה של אירוע רפואי.`
        : `אין כיסוי לתחום "${cat.name}" — כדאי לשקול בהתאם לצרכים האישיים.`,
    }));

  if (policies.length === 0) {
    findings.unshift({
      categoryId: "no-policies",
      categoryName: "אין פוליסות פעילות",
      level: "גבוה",
      reason: "לא הוזנו פוליסות ביטוח להשוואה — לא ניתן להעריך את מצב הכיסוי.",
    });
  }

  return findings.sort((a, b) => riskOrder(b.level) - riskOrder(a.level));
}

export function buildRecommendations(
  duplicates: DuplicateFinding[],
  risks: RiskFinding[]
): Recommendation[] {
  const recommendations: Recommendation[] = [];

  duplicates.forEach((d) => {
    const sortedByPremium = [...d.policies].sort((a, b) => a.monthlyPremium - b.monthlyPremium);
    const keep = sortedByPremium[0];
    const drop = sortedByPremium.slice(1).map((p) => p.policyName);

    recommendations.push({
      id: `dup-${d.categoryId}`,
      level: "בינוני",
      title: `כפל ביטוחי בתחום "${d.categoryName}"`,
      detail: `הפוליסות ${d.policies
        .map((p) => p.policyName)
        .join(", ")} מכסות את אותו התחום. שקול לבטל את הכיסוי הכפול בפוליסות ${drop.join(
        ", "
      )} ולהשאיר אותו במסגרת "${keep.policyName}" — חיסכון משוער של כ-${
        d.estimatedMonthlyOverlapCost
      } ₪ לחודש.`,
    });
  });

  risks.forEach((r) => {
    if (r.categoryId === "no-policies") {
      recommendations.push({
        id: "start",
        level: "גבוה",
        title: "הוסף פוליסות להשוואה",
        detail: r.reason,
      });
      return;
    }

    recommendations.push({
      id: `gap-${r.categoryId}`,
      level: r.level,
      title: `בדוק הוספת כיסוי ל"${r.categoryName}"`,
      detail: r.reason,
    });
  });

  return recommendations.sort((a, b) => riskOrder(b.level) - riskOrder(a.level));
}

export function computeSummary(
  policies: InsurancePolicy[],
  duplicates: DuplicateFinding[],
  risks: RiskFinding[]
): ComparisonSummary {
  return {
    policyCount: policies.length,
    totalMonthlyPremium: policies.reduce((sum, p) => sum + p.monthlyPremium, 0),
    duplicateCount: duplicates.length,
    highRiskCount: risks.filter((r) => r.level === "גבוה").length,
  };
}
