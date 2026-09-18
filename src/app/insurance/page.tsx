"use client";

import { useMemo, useState } from "react";
import { ConfirmClearModal } from "@/components/ConfirmClearModal";
import { DuplicatesPanel } from "@/components/insurance/DuplicatesPanel";
import { InsuranceReportModal } from "@/components/insurance/InsuranceReportModal";
import { PolicyForm } from "@/components/insurance/PolicyForm";
import { PolicyFormModal } from "@/components/insurance/PolicyFormModal";
import { PolicyList } from "@/components/insurance/PolicyList";
import { RecommendationsPanel } from "@/components/insurance/RecommendationsPanel";
import { RiskPanel } from "@/components/insurance/RiskPanel";
import { SummaryBar } from "@/components/insurance/SummaryBar";
import { Toast } from "@/components/Toast";
import { useInsuranceComparison } from "@/hooks/useInsuranceComparison";
import { useToast } from "@/hooks/useToast";
import { PolicyInput } from "@/lib/insurance/store";
import { DuplicateFinding, InsurancePolicy, Recommendation, RiskFinding } from "@/lib/insurance/types";

function buildReportText(
  policies: InsurancePolicy[],
  duplicates: DuplicateFinding[],
  risks: RiskFinding[],
  recommendations: Recommendation[]
): string {
  const today = new Date().toLocaleDateString("he-IL");
  let text = `דוח השוואת ביטוחי בריאות - ${today}\n\n`;

  text += `פוליסות (${policies.length}):\n`;
  policies.forEach((p) => {
    text += `- ${p.name} | ${p.insurer} | ${p.policyType} | ${p.monthlyPremium} ₪ לחודש\n`;
  });

  text += `\nכפילויות כיסוי (${duplicates.length}):\n`;
  if (duplicates.length === 0) {
    text += "- לא נמצאו כפילויות.\n";
  } else {
    duplicates.forEach((d) => {
      text += `- ${d.categoryName}: ${d.policies.map((p) => p.policyName).join(", ")} (חיסכון משוער ${d.estimatedMonthlyOverlapCost} ₪ לחודש)\n`;
    });
  }

  text += `\nסיכונים ופערי כיסוי (${risks.length}):\n`;
  if (risks.length === 0) {
    text += "- לא זוהו פערים.\n";
  } else {
    risks.forEach((r) => {
      text += `- [${r.level}] ${r.categoryName}: ${r.reason}\n`;
    });
  }

  text += `\nהמלצות פעולה:\n`;
  if (recommendations.length === 0) {
    text += "- אין המלצות כרגע.\n";
  } else {
    recommendations.forEach((rec, i) => {
      text += `${i + 1}. [${rec.level}] ${rec.title} — ${rec.detail}\n`;
    });
  }

  return text.trim();
}

export default function InsurancePage() {
  const { policies, duplicates, risks, recommendations, summary, addPolicy, updatePolicy, removePolicy, clearPolicies } =
    useInsuranceComparison();
  const { message, showToast } = useToast();
  const [editingPolicy, setEditingPolicy] = useState<InsurancePolicy | null>(null);
  const [reportOpen, setReportOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const reportText = useMemo(
    () => buildReportText(policies, duplicates, risks, recommendations),
    [policies, duplicates, risks, recommendations]
  );

  function handleAdd(input: PolicyInput) {
    addPolicy(input);
    showToast(`נוספה פוליסה: ${input.name.trim()}`);
  }

  function handleUpdate(input: PolicyInput) {
    if (!editingPolicy) return;
    updatePolicy(editingPolicy.id, input);
    showToast(`עודכנה פוליסה: ${input.name.trim()}`);
  }

  function handleRemove(id: string) {
    const policy = policies.find((p) => p.id === id);
    removePolicy(id);
    if (policy) showToast(`הוסרה פוליסה: ${policy.name}`);
  }

  return (
    <div className="mx-auto max-w-xl px-4 pb-28 pt-6 sm:px-6">
      <div className="mb-6 rounded-2xl bg-teal-800 px-5 py-4 text-white shadow-sm">
        <h1 className="text-lg font-bold">השוואת ביטוחי בריאות</h1>
        <p className="mt-0.5 text-sm text-teal-100">
          הזן את פוליסות הביטוח שלך כדי לאתר כפילויות כיסוי, פערי סיכון ולקבל המלצות פעולה.
        </p>
      </div>

      <SummaryBar summary={summary} />

      <div className="mt-6 rounded-2xl bg-white p-4 ring-1 ring-black/10 dark:bg-neutral-900 dark:ring-white/10">
        <h2 className="mb-3 text-base font-bold text-neutral-800 dark:text-neutral-100">הוספת פוליסה</h2>
        <PolicyForm submitLabel="הוסף פוליסה" onSubmit={handleAdd} />
      </div>

      <div className="mt-6 mb-2 flex items-center gap-2">
        <h2 className="text-base font-bold text-neutral-800 dark:text-neutral-100">הפוליסות שלי</h2>
        {policies.length > 0 && (
          <span className="text-xs text-neutral-500 dark:text-neutral-400">({policies.length})</span>
        )}
      </div>
      <PolicyList policies={policies} onEdit={setEditingPolicy} onRemove={handleRemove} />

      <div className="mt-6 mb-2">
        <h2 className="text-base font-bold text-neutral-800 dark:text-neutral-100">כפילויות כיסוי</h2>
      </div>
      <DuplicatesPanel duplicates={duplicates} />

      <div className="mt-6 mb-2">
        <h2 className="text-base font-bold text-neutral-800 dark:text-neutral-100">מיפוי סיכונים</h2>
      </div>
      <RiskPanel risks={risks} />

      <div className="mt-6 mb-2">
        <h2 className="text-base font-bold text-neutral-800 dark:text-neutral-100">המלצות לפעולה</h2>
      </div>
      <RecommendationsPanel recommendations={recommendations} />

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-black/5 bg-white/95 px-4 py-3 backdrop-blur dark:border-white/10 dark:bg-neutral-950/95">
        <div className="mx-auto flex max-w-xl gap-3">
          <button
            type="button"
            onClick={() => policies.length > 0 && setConfirmOpen(true)}
            disabled={policies.length === 0}
            className="flex-1 rounded-lg bg-neutral-100 px-4 py-3 text-sm font-semibold text-red-700 ring-1 ring-red-200 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-neutral-900 dark:text-red-400 dark:ring-red-900"
          >
            נקה הכל
          </button>
          <button
            type="button"
            onClick={() => {
              if (policies.length === 0) {
                showToast("לא הוזנו פוליסות");
                return;
              }
              setReportOpen(true);
            }}
            className="flex-1 rounded-lg bg-amber-500 px-4 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-amber-600"
          >
            הפק דוח
          </button>
        </div>
      </div>

      <PolicyFormModal
        open={editingPolicy !== null}
        initial={editingPolicy ?? undefined}
        onSubmit={handleUpdate}
        onClose={() => setEditingPolicy(null)}
      />
      <InsuranceReportModal open={reportOpen} text={reportText} onClose={() => setReportOpen(false)} />
      <ConfirmClearModal
        open={confirmOpen}
        onConfirm={() => {
          clearPolicies();
          setConfirmOpen(false);
          showToast("כל הפוליסות נמחקו");
        }}
        onCancel={() => setConfirmOpen(false)}
      />
      <Toast message={message} />
    </div>
  );
}
