"use client";

export function Toast({ message }: { message: string | null }) {
  return (
    <div
      className={`pointer-events-none fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-full bg-neutral-900 px-4 py-2 text-sm text-white shadow-lg transition-opacity duration-200 dark:bg-neutral-100 dark:text-neutral-900 ${
        message ? "opacity-100" : "opacity-0"
      }`}
    >
      {message}
    </div>
  );
}
