import { DuplicateFinding } from "@/lib/insurance/types";

export function DuplicatesPanel({ duplicates }: { duplicates: DuplicateFinding[] }) {
  if (duplicates.length === 0) {
    return (
      <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800 ring-1 ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:ring-emerald-900">
        לא נמצאו כפילויות כיסוי בין הפוליסות שהוזנו.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {duplicates.map((d) => (
        <div
          key={d.categoryId}
          className="rounded-2xl bg-amber-50 p-4 ring-1 ring-amber-200 dark:bg-amber-950/30 dark:ring-amber-900"
        >
          <h3 className="text-sm font-bold text-amber-900 dark:text-amber-300">{d.categoryName}</h3>
          <p className="mt-1 text-xs text-amber-800 dark:text-amber-400">
            מכוסה על ידי {d.policies.length} פוליסות: {d.policies.map((p) => p.policyName).join(", ")}
          </p>
          <p className="mt-1 text-xs font-semibold text-amber-900 dark:text-amber-300">
            עלות כפולה משוערת: כ-{d.estimatedMonthlyOverlapCost} ₪ לחודש
          </p>
        </div>
      ))}
    </div>
  );
}
