export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:bg-neutral-950/90 dark:border-white/10">
      <div className="mx-auto flex max-w-xl items-center gap-2 px-4 py-3 sm:px-6">
        <span aria-hidden className="text-2xl">
          🛒
        </span>
        <span className="text-xl font-bold text-teal-800 dark:text-teal-400">רשימת קניות</span>
      </div>
    </header>
  );
}
