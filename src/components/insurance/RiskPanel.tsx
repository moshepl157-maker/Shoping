import { riskBadgeClass, riskCardClass } from "@/lib/insurance/riskStyle";
import { RiskFinding } from "@/lib/insurance/types";

export function RiskPanel({ risks }: { risks: RiskFinding[] }) {
  if (risks.length === 0) {
    return (
      <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800 ring-1 ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:ring-emerald-900">
        לא זוהו פערי כיסוי בתחומי הליבה.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {risks.map((r) => (
        <div key={r.categoryId} className={`rounded-2xl p-4 ${riskCardClass(r.level)}`}>
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-bold text-neutral-800 dark:text-neutral-100">{r.categoryName}</h3>
            <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${riskBadgeClass(r.level)}`}>
              סיכון {r.level}
            </span>
          </div>
          <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-300">{r.reason}</p>
        </div>
      ))}
    </div>
  );
}
