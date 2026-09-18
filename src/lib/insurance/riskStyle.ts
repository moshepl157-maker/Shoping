import { RiskLevel } from "./types";

export function riskBadgeClass(level: RiskLevel): string {
  switch (level) {
    case "גבוה":
      return "bg-red-50 text-red-700 ring-1 ring-red-200 dark:bg-red-950 dark:text-red-400 dark:ring-red-900";
    case "בינוני":
      return "bg-amber-50 text-amber-800 ring-1 ring-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:ring-amber-900";
    case "נמוך":
      return "bg-neutral-100 text-neutral-600 ring-1 ring-black/10 dark:bg-neutral-800 dark:text-neutral-300 dark:ring-white/10";
  }
}

export function riskCardClass(level: RiskLevel): string {
  switch (level) {
    case "גבוה":
      return "bg-red-50 ring-1 ring-red-200 dark:bg-red-950/30 dark:ring-red-900";
    case "בינוני":
      return "bg-amber-50 ring-1 ring-amber-200 dark:bg-amber-950/30 dark:ring-amber-900";
    case "נמוך":
      return "bg-white ring-1 ring-black/10 dark:bg-neutral-900 dark:ring-white/10";
  }
}
