"use client";

import { useState } from "react";
import { coverageCategories } from "@/lib/insurance/categories";
import { PolicyInput } from "@/lib/insurance/store";
import { POLICY_TYPES, PolicyType } from "@/lib/insurance/types";

const emptyForm: PolicyInput = {
  name: "",
  insurer: "",
  policyType: POLICY_TYPES[0],
  monthlyPremium: 0,
  coverageIds: [],
  notes: "",
};

export function PolicyForm({
  initial,
  submitLabel,
  onSubmit,
  onCancel,
}: {
  initial?: PolicyInput;
  submitLabel: string;
  onSubmit: (input: PolicyInput) => void;
  onCancel?: () => void;
}) {
  const [form, setForm] = useState<PolicyInput>(initial ?? emptyForm);

  function toggleCoverage(id: string) {
    setForm((f) => ({
      ...f,
      coverageIds: f.coverageIds.includes(id)
        ? f.coverageIds.filter((c) => c !== id)
        : [...f.coverageIds, id],
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.insurer.trim()) return;
    onSubmit(form);
    if (!initial) setForm(emptyForm);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-2">
        <input
          type="text"
          placeholder="שם הפוליסה (למשל: בריאות משפחתי)"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          className="col-span-2 rounded-lg border border-black/10 bg-neutral-50 px-3 py-2 text-sm outline-none ring-teal-600 focus:ring-2 dark:border-white/10 dark:bg-neutral-950"
        />
        <input
          type="text"
          placeholder="חברת ביטוח"
          value={form.insurer}
          onChange={(e) => setForm((f) => ({ ...f, insurer: e.target.value }))}
          className="rounded-lg border border-black/10 bg-neutral-50 px-3 py-2 text-sm outline-none ring-teal-600 focus:ring-2 dark:border-white/10 dark:bg-neutral-950"
        />
        <select
          value={form.policyType}
          onChange={(e) => setForm((f) => ({ ...f, policyType: e.target.value as PolicyType }))}
          className="rounded-lg border border-black/10 bg-neutral-50 px-2 py-2 text-sm outline-none dark:border-white/10 dark:bg-neutral-950"
        >
          {POLICY_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <input
          type="number"
          min={0}
          step={1}
          placeholder="פרמיה חודשית (₪)"
          value={form.monthlyPremium || ""}
          onChange={(e) => setForm((f) => ({ ...f, monthlyPremium: Number(e.target.value) || 0 }))}
          className="col-span-2 rounded-lg border border-black/10 bg-neutral-50 px-3 py-2 text-sm outline-none ring-teal-600 focus:ring-2 dark:border-white/10 dark:bg-neutral-950"
        />
      </div>

      <div>
        <p className="mb-1.5 text-xs font-semibold text-neutral-600 dark:text-neutral-300">תחומי כיסוי</p>
        <div className="flex flex-wrap gap-1.5">
          {coverageCategories.map((cat) => {
            const active = form.coverageIds.includes(cat.id);
            return (
              <button
                key={cat.id}
                type="button"
                title={cat.description}
                onClick={() => toggleCoverage(cat.id)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                  active
                    ? "bg-teal-700 text-white shadow-sm"
                    : "bg-white text-neutral-600 ring-1 ring-black/10 hover:bg-neutral-50 dark:bg-neutral-900 dark:text-neutral-300 dark:ring-white/10"
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      <textarea
        placeholder="הערות (אופציונלי)"
        value={form.notes ?? ""}
        onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
        rows={2}
        className="resize-none rounded-lg border border-black/10 bg-neutral-50 px-3 py-2 text-sm outline-none ring-teal-600 focus:ring-2 dark:border-white/10 dark:bg-neutral-950"
      />

      <div className="flex gap-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-lg bg-neutral-100 px-4 py-2.5 text-sm font-semibold text-neutral-700 ring-1 ring-black/10 transition hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-200 dark:ring-white/10"
          >
            ביטול
          </button>
        )}
        <button
          type="submit"
          className="flex-1 rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
