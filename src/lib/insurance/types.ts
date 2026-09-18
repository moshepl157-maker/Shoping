export const POLICY_TYPES = [
  "פרטי",
  'קולקטיבי (מקום עבודה)',
  'שב"ן (משלים קופ"ח)',
] as const;
export type PolicyType = (typeof POLICY_TYPES)[number];

export interface CoverageCategory {
  id: string;
  name: string;
  description: string;
  /** תחום ליבה שחוסרו מהווה חשיפה משמעותית */
  essential: boolean;
}

export interface InsurancePolicy {
  id: string;
  name: string;
  insurer: string;
  policyType: PolicyType;
  monthlyPremium: number;
  coverageIds: string[];
  notes?: string;
}

export interface DuplicateFinding {
  categoryId: string;
  categoryName: string;
  policies: { policyId: string; policyName: string; monthlyPremium: number }[];
  estimatedMonthlyOverlapCost: number;
}

export type RiskLevel = "גבוה" | "בינוני" | "נמוך";

export interface RiskFinding {
  categoryId: string;
  categoryName: string;
  level: RiskLevel;
  reason: string;
}

export interface Recommendation {
  id: string;
  level: RiskLevel;
  title: string;
  detail: string;
}

export interface ComparisonSummary {
  policyCount: number;
  totalMonthlyPremium: number;
  duplicateCount: number;
  highRiskCount: number;
}
