"use client";

import { coverageCategoryName } from "@/lib/insurance/categories";
import { InsurancePolicy } from "@/lib/insurance/types";

export function PolicyList({
  policies,
  onEdit,
  onRemove,
}: {
  policies: InsurancePolicy[];
  onEdit: (policy: InsurancePolicy) => void;
  onRemove: (id: string) => void;
}) {
  if (policies.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-black/10 py-10 text-center text-sm text-neutral-500 dark:border-white/10 dark:text-neutral-400">
        עדיין לא הוספת פוליסות. הוסף פוליסה למעלה כדי להתחיל בהשוואה.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {policies.map((p) => (
        <div
          key={p.id}
          className="rounded-2xl bg-white p-4 ring-1 ring-black/10 dark:bg-neutral-900 dark:ring-white/10"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="truncate text-sm font-bold text-neutral-800 dark:text-neutral-100">{p.name}</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {p.insurer} · {p.policyType}
              </p>
            </div>
            <span className="shrink-0 rounded-full bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-800 dark:bg-teal-950 dark:text-teal-400">
              {p.monthlyPremium} ₪ / חודש
            </span>
          </div>

          {p.coverageIds.length > 0 ? (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {p.coverageIds.map((cid) => (
                <span
                  key={cid}
                  className="rounded-full bg-neutral-100 px-2 py-0.5 text-[11px] text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300"
                >
                  {coverageCategoryName(cid)}
                </span>
              ))}
            </div>
          ) : (
            <p className="mt-2 text-xs text-neutral-400 dark:text-neutral-500">לא נבחרו תחומי כיסוי</p>
          )}

          {p.notes && <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">{p.notes}</p>}

          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => onEdit(p)}
              className="flex-1 rounded-lg bg-neutral-100 px-3 py-1.5 text-xs font-semibold text-neutral-700 ring-1 ring-black/10 transition hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-200 dark:ring-white/10"
            >
              עריכה
            </button>
            <button
              type="button"
              onClick={() => onRemove(p.id)}
              className="flex-1 rounded-lg bg-neutral-100 px-3 py-1.5 text-xs font-semibold text-red-700 ring-1 ring-red-200 transition hover:bg-red-50 dark:bg-neutral-900 dark:text-red-400 dark:ring-red-900"
            >
              מחיקה
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
