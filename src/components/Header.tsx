"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export function Header() {
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:bg-neutral-950/90 dark:border-white/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-emerald-700 dark:text-emerald-400">
          <span aria-hidden className="text-2xl">🛍️</span>
          <span>שופינג</span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/"
            className="rounded-full px-3 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-white/10"
          >
            קטלוג
          </Link>
          <Link
            href="/cart"
            className="relative flex items-center gap-1 rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700"
          >
            <span aria-hidden>🛒</span>
            <span className="hidden sm:inline">עגלה</span>
            {itemCount > 0 && (
              <span className="absolute -top-2 -start-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-500 px-1 text-xs font-bold text-white">
                {itemCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
