"use client";

import { categories } from "@/lib/categories";
import { ListItem } from "@/lib/types";

export function ShoppingListView({
  items,
  onToggle,
  onQuantityChange,
  onRemove,
}: {
  items: ListItem[];
  onToggle: (id: string) => void;
  onQuantityChange: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}) {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-black/10 py-10 text-center text-sm text-neutral-500 dark:border-white/10 dark:text-neutral-400">
        עדיין לא הוספת פריטים. בחר מהתפריט למעלה או הוסף פריט משלך.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {categories.map((cat) => {
        const catItems = items.filter((i) => i.categoryId === cat.id);
        if (catItems.length === 0) return null;

        return (
          <div
            key={cat.id}
            className="overflow-hidden rounded-2xl bg-white ring-1 ring-black/10 dark:bg-neutral-900 dark:ring-white/10"
          >
            <h3 className="border-b border-black/5 bg-neutral-50 px-4 py-2 text-sm font-semibold text-teal-800 dark:border-white/10 dark:bg-neutral-950 dark:text-teal-400">
              {cat.name}
            </h3>
            <ul>
              {catItems.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between gap-3 border-b border-black/5 px-4 py-2.5 last:border-b-0 dark:border-white/10"
                >
                  <button
                    type="button"
                    onClick={() => onToggle(item.id)}
                    className={`min-w-0 flex-1 truncate text-start text-sm ${
                      item.checked
                        ? "text-neutral-400 line-through dark:text-neutral-500"
                        : "text-neutral-800 dark:text-neutral-100"
                    }`}
                  >
                    {item.name}
                  </button>

                  <div className="flex shrink-0 items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => onQuantityChange(item.id, -1)}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-black/10 text-sm text-neutral-600 dark:border-white/10 dark:text-neutral-300"
                      aria-label="הפחת כמות"
                    >
                      −
                    </button>
                    <span className="min-w-[1.75rem] text-center text-sm">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => onQuantityChange(item.id, 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-black/10 text-sm text-neutral-600 dark:border-white/10 dark:text-neutral-300"
                      aria-label="הוסף כמות"
                    >
                      +
                    </button>
                    <span className="min-w-[1.75rem] text-xs text-neutral-500 dark:text-neutral-400">
                      {item.unit}
                    </span>
                    <button
                      type="button"
                      onClick={() => onRemove(item.id)}
                      className="px-1 text-neutral-400 hover:text-red-600"
                      aria-label={`הסר את ${item.name}`}
                      title="הסר"
                    >
                      ✕
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
