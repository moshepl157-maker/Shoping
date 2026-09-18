import { riskBadgeClass } from "@/lib/insurance/riskStyle";
import { Recommendation } from "@/lib/insurance/types";

export function RecommendationsPanel({ recommendations }: { recommendations: Recommendation[] }) {
  if (recommendations.length === 0) {
    return (
      <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800 ring-1 ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:ring-emerald-900">
        אין המלצות פעולה כרגע — הכיסוי הביטוחי נראה מאוזן.
      </div>
    );
  }

  return (
    <ol className="flex flex-col gap-2">
      {recommendations.map((rec, index) => (
        <li
          key={rec.id}
          className="rounded-2xl bg-white p-4 ring-1 ring-black/10 dark:bg-neutral-900 dark:ring-white/10"
        >
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-bold text-neutral-800 dark:text-neutral-100">
              {index + 1}. {rec.title}
            </h3>
            <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${riskBadgeClass(rec.level)}`}>
              עדיפות {rec.level}
            </span>
          </div>
          <p className="mt-1 text-xs leading-relaxed text-neutral-600 dark:text-neutral-300">{rec.detail}</p>
        </li>
      ))}
    </ol>
  );
}
