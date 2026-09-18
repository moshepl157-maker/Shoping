"use client";

import { Modal } from "@/components/Modal";
import { PolicyInput } from "@/lib/insurance/store";
import { PolicyForm } from "./PolicyForm";

export function PolicyFormModal({
  open,
  initial,
  title = "עריכת פוליסה",
  submitLabel = "שמור שינויים",
  onSubmit,
  onClose,
}: {
  open: boolean;
  initial?: PolicyInput;
  title?: string;
  submitLabel?: string;
  onSubmit: (input: PolicyInput) => void;
  onClose: () => void;
}) {
  return (
    <Modal open={open} onClose={onClose} maxWidthClassName="max-w-lg">
      <h3 className="mb-3 text-lg font-bold text-teal-800 dark:text-teal-400">{title}</h3>
      {open && (
        <PolicyForm
          key={initial ? `${initial.name}-${initial.insurer}` : "new"}
          initial={initial}
          submitLabel={submitLabel}
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
