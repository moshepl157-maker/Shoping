import { ComparisonSummary } from "@/lib/insurance/types";

export function SummaryBar({ summary }: { summary: ComparisonSummary }) {
  const tiles: { label: string; value: string; accent: string }[] = [
    { label: "פוליסות", value: String(summary.policyCount), accent: "text-teal-700 dark:text-teal-400" },
    {
      label: "פרמיה חודשית",
      value: `${summary.totalMonthlyPremium} ₪`,
      accent: "text-teal-700 dark:text-teal-400",
    },
    {
      label: "כפילויות כיסוי",
      value: String(summary.duplicateCount),
      accent: summary.duplicateCount > 0 ? "text-amber-700 dark:text-amber-400" : "text-neutral-500",
    },
    {
      label: "סיכונים גבוהים",
      value: String(summary.highRiskCount),
      accent: summary.highRiskCount > 0 ? "text-red-700 dark:text-red-400" : "text-neutral-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {tiles.map((tile) => (
        <div
          key={tile.label}
          className="rounded-2xl bg-white p-3 text-center ring-1 ring-black/10 dark:bg-neutral-900 dark:ring-white/10"
        >
          <p className={`text-lg font-bold ${tile.accent}`}>{tile.value}</p>
          <p className="text-[11px] text-neutral-500 dark:text-neutral-400">{tile.label}</p>
        </div>
      ))}
    </div>
  );
}
