"use client";

export function Modal({
  open,
  onClose,
  children,
  maxWidthClassName = "max-w-md",
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  maxWidthClassName?: string;
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-5"
      onClick={onClose}
    >
      <div
        className={`flex max-h-[85vh] w-full flex-col rounded-2xl bg-white p-5 shadow-xl dark:bg-neutral-900 ${maxWidthClassName}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
