"use client";

import { Modal } from "@/components/Modal";
import { PolicyInput } from "@/lib/insurance/store";
import { PolicyForm } from "./PolicyForm";

export function PolicyFormModal({
  open,
  initial,
  onSubmit,
  onClose,
}: {
  open: boolean;
  initial?: PolicyInput;
  onSubmit: (input: PolicyInput) => void;
  onClose: () => void;
}) {
  return (
    <Modal open={open} onClose={onClose} maxWidthClassName="max-w-lg">
      <h3 className="mb-3 text-lg font-bold text-teal-800 dark:text-teal-400">עריכת פוליסה</h3>
      {open && (
        <PolicyForm
          key={initial ? `${initial.name}-${initial.insurer}` : "new"}
          initial={initial}
          submitLabel="שמור שינויים"
          onSubmit={(input) => {
            onSubmit(input);
            onClose();
          }}
          onCancel={onClose}
        />
      )}
    </Modal>
  );
}
