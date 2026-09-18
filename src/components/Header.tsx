"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "רשימת קניות", icon: "🛒" },
  { href: "/insurance", label: "השוואת ביטוחים", icon: "🩺" },
] as const;

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:bg-neutral-950/90 dark:border-white/10">
      <div className="mx-auto flex max-w-xl items-center gap-1 px-2 py-2 sm:px-6">
        {NAV_LINKS.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-bold transition ${
                active
                  ? "bg-teal-50 text-teal-800 dark:bg-teal-950 dark:text-teal-400"
                  : "text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-900"
              }`}
            >
              <span aria-hidden className="text-lg">
                {link.icon}
              </span>
              <span>{link.label}</span>
            </Link>
          );
        })}
      </div>
    </header>
  );
}
