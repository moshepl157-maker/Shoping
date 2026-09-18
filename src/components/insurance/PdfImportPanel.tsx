"use client";

import { useRef, useState } from "react";
import { PolicyInput } from "@/lib/insurance/store";

export function PdfImportPanel({ onExtracted }: { onExtracted: (input: PolicyInput) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/insurance/extract", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "שגיאה בחילוץ הנתונים מהקובץ");
        return;
      }
      onExtracted(data.policy as PolicyInput);
    } catch {
      setError("שגיאת תקשורת בעת חילוץ הנתונים");
    } finally {
      setLoading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="rounded-2xl bg-white p-4 ring-1 ring-black/10 dark:bg-neutral-900 dark:ring-white/10">
      <h2 className="mb-1 text-base font-bold text-neutral-800 dark:text-neutral-100">ייבוא אוטומטי מ-PDF</h2>
      <p className="mb-3 text-xs text-neutral-500 dark:text-neutral-400">
        העלה קובץ PDF של דוח הפוליסה — ה-AI ימלא עבורך את הפרטים לבדיקה ואישור לפני שמירה.
      </p>
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        disabled={loading}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
        className="block w-full text-sm text-neutral-600 file:me-3 file:rounded-lg file:border-0 file:bg-teal-700 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white file:transition hover:file:bg-teal-800 disabled:opacity-60 dark:text-neutral-300"
      />
      {loading && <p className="mt-2 text-xs text-teal-700 dark:text-teal-400">מנתח את הקובץ...</p>}
      {error && <p className="mt-2 text-xs text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
}
