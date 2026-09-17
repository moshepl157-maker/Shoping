"use client";

import { Modal } from "./Modal";

export function ConfirmClearModal({
  open,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <Modal open={open} onClose={onCancel} maxWidthClassName="max-w-xs">
      <h3 className="mb-1 text-lg font-bold text-teal-800 dark:text-teal-400">למחוק את כל הרשימה?</h3>
      <p className="mb-4 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
        הפעולה תמחק את כל הפריטים ולא ניתן לבטל אותה.
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onConfirm}
          className="flex-1 rounded-lg bg-neutral-100 px-4 py-2.5 text-sm font-semibold text-red-700 ring-1 ring-red-200 transition hover:bg-red-50 dark:bg-neutral-800 dark:text-red-400 dark:ring-red-900"
        >
          כן, מחק הכל
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-neutral-900 transition hover:bg-amber-600"
        >
          ביטול
        </button>
      </div>
    </Modal>
  );
}
