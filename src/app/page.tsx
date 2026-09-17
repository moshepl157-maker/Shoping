"use client";

import { useMemo, useState } from "react";
import { categories } from "@/lib/categories";
import { Unit } from "@/lib/types";
import { useShoppingList } from "@/hooks/useShoppingList";
import { useToast } from "@/hooks/useToast";
import { CategoryPicker } from "@/components/CategoryPicker";
import { ShoppingListView } from "@/components/ShoppingListView";
import { ExportListModal } from "@/components/ExportListModal";
import { ConfirmClearModal } from "@/components/ConfirmClearModal";
import { Toast } from "@/components/Toast";

function buildListText(items: ReturnType<typeof useShoppingList>["items"]): string {
  const today = new Date().toLocaleDateString("he-IL");
  let text = `רשימת קניות - ${today}\n\n`;

  categories.forEach((cat) => {
    const catItems = items.filter((i) => i.categoryId === cat.id);
    if (catItems.length === 0) return;
    text += `${cat.name}:\n`;
    catItems.forEach((item) => {
      text += `- ${item.name} (${item.quantity} ${item.unit})\n`;
    });
    text += "\n";
  });

  return text.trim();
}

export default function HomePage() {
  const { items, addItem, updateQuantity, toggleChecked, removeItem, clearList } = useShoppingList();
  const { message, showToast } = useToast();
  const [exportOpen, setExportOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const exportText = useMemo(() => buildListText(items), [items]);

  function handleAdd(name: string, categoryId: string, unit: Unit) {
    addItem(name, categoryId, unit);
    showToast(`נוסף: ${name.trim()}`);
  }

  return (
    <div className="mx-auto max-w-xl px-4 pb-28 pt-6 sm:px-6">
      <div className="mb-6 rounded-2xl bg-teal-800 px-5 py-4 text-white shadow-sm">
        <h1 className="text-lg font-bold">רשימת הקניות שלי</h1>
        <p className="mt-0.5 text-sm text-teal-100">
          {items.length > 0 ? `${items.length} פריטים ברשימה` : "הרשימה ריקה כרגע"}
        </p>
      </div>

      <CategoryPicker onAdd={handleAdd} />

      <div className="mt-6 mb-2 flex items-center gap-2">
        <h2 className="text-base font-bold text-neutral-800 dark:text-neutral-100">הרשימה שלי</h2>
        {items.length > 0 && (
          <span className="text-xs text-neutral-500 dark:text-neutral-400">({items.length} פריטים)</span>
        )}
      </div>

      <ShoppingListView
        items={items}
        onToggle={toggleChecked}
        onQuantityChange={updateQuantity}
        onRemove={removeItem}
      />

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-black/5 bg-white/95 px-4 py-3 backdrop-blur dark:border-white/10 dark:bg-neutral-950/95">
        <div className="mx-auto flex max-w-xl gap-3">
          <button
            type="button"
            onClick={() => items.length > 0 && setConfirmOpen(true)}
            disabled={items.length === 0}
            className="flex-1 rounded-lg bg-neutral-100 px-4 py-3 text-sm font-semibold text-red-700 ring-1 ring-red-200 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-neutral-900 dark:text-red-400 dark:ring-red-900"
          >
            נקה הכל
          </button>
          <button
            type="button"
            onClick={() => {
              if (items.length === 0) {
                showToast("הרשימה ריקה");
                return;
              }
              setExportOpen(true);
            }}
            className="flex-1 rounded-lg bg-amber-500 px-4 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-amber-600"
          >
            העתק רשימה
          </button>
        </div>
      </div>

      <ExportListModal open={exportOpen} text={exportText} onClose={() => setExportOpen(false)} />
      <ConfirmClearModal
        open={confirmOpen}
        onConfirm={() => {
          clearList();
          setConfirmOpen(false);
        }}
        onCancel={() => setConfirmOpen(false)}
      />
      <Toast message={message} />
    </div>
  );
}
