"use client";

import { useEffect, useRef, useState } from "react";
import { Modal } from "./Modal";

export function ExportListModal({
  open,
  text,
  onClose,
}: {
  open: boolean;
  text: string;
  onClose: () => void;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [status, setStatus] = useState("");
  const [prevOpen, setPrevOpen] = useState(open);

  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) setStatus("");
  }

  useEffect(() => {
    if (open) {
      const timeout = setTimeout(() => {
        textareaRef.current?.focus();
        textareaRef.current?.select();
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [open]);

  async function copy() {
    const el = textareaRef.current;
    el?.focus();
    el?.select();
    try {
      await navigator.clipboard.writeText(text);
      setStatus("הועתק! עכשיו אפשר להדביק בפתקים או בכל אפליקציה אחרת.");
    } catch {
      const ok = document.execCommand && document.execCommand("copy");
      setStatus(
        ok
          ? "הועתק! עכשיו אפשר להדביק בפתקים או בכל אפליקציה אחרת."
          : "ההעתקה האוטומטית לא זמינה — הטקסט מסומן, לחץ והחזק כדי להעתיק ידנית."
      );
    }
  }

  return (
    <Modal open={open} onClose={onClose} maxWidthClassName="max-w-lg">
      <h3 className="mb-1 text-lg font-bold text-teal-800 dark:text-teal-400">הרשימה שלי</h3>
      <p className="mb-3 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
        לחץ &quot;העתק&quot;, או סמן את הטקסט ידנית והעתק אותו.
      </p>
      <textarea
        ref={textareaRef}
        readOnly
        value={text}
        dir="rtl"
        className="min-h-[220px] flex-1 resize-y whitespace-pre-wrap rounded-lg border border-black/10 bg-neutral-50 p-3 text-sm outline-none dark:border-white/10 dark:bg-neutral-950"
      />
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={copy}
          className="flex-1 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-neutral-900 transition hover:bg-amber-600"
        >
          העתק
        </button>
        <button
          type="button"
          onClick={onClose}
          className="flex-1 rounded-lg bg-neutral-100 px-4 py-2.5 text-sm font-semibold text-red-700 ring-1 ring-red-200 transition hover:bg-red-50 dark:bg-neutral-800 dark:text-red-400 dark:ring-red-900"
        >
          סגור
        </button>
      </div>
      {status && <p className="mt-2 min-h-[1rem] text-xs text-teal-700 dark:text-teal-400">{status}</p>}
    </Modal>
  );
}
