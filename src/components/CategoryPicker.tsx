"use client";

import { useMemo, useState } from "react";
import { categories } from "@/lib/categories";
import { UNITS, Unit } from "@/lib/types";
import { useCustomPresets } from "@/hooks/useCustomPresets";

export function CategoryPicker({
  onAdd,
}: {
  onAdd: (name: string, categoryId: string, unit: Unit) => void;
}) {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [customName, setCustomName] = useState("");
  const [customUnit, setCustomUnit] = useState<Unit>(UNITS[0]);
  const { presets: customPresets, addCustomPreset } = useCustomPresets();

  const active = categories.find((c) => c.id === activeCategory) ?? categories[0];
  const activePresetItems = useMemo(
    () => [...active.presetItems, ...(customPresets[active.id] ?? [])],
    [active, customPresets]
  );

  function addCustomItem(name: string, categoryId: string, unit: Unit) {
    onAdd(name, categoryId, unit);
    addCustomPreset(categoryId, name);
  }

  return (
    <div>
      <h2 className="mb-2 text-base font-bold text-neutral-800 dark:text-neutral-100">בחר קטגוריה</h2>

      <div className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategory(cat.id)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
              cat.id === activeCategory
                ? "bg-teal-700 text-white shadow-sm"
                : "bg-white text-neutral-600 ring-1 ring-black/10 hover:bg-neutral-50 dark:bg-neutral-900 dark:text-neutral-300 dark:ring-white/10"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {activePresetItems.length === 0 ? (
          <p className="py-1.5 text-sm text-neutral-500 dark:text-neutral-400">
            אין פריטים מוגדרים מראש בקטגוריה זו — הוסף פריט מותאם למטה.
          </p>
        ) : (
          activePresetItems.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => onAdd(item, active.id, UNITS[0])}
              className="flex items-center gap-1.5 rounded-xl bg-white px-3 py-2 text-sm ring-1 ring-black/10 transition active:bg-teal-50 dark:bg-neutral-900 dark:ring-white/10 dark:active:bg-teal-950"
            >
              <span className="text-base font-bold text-teal-700 dark:text-teal-400">+</span>
              <span>{item}</span>
            </button>
          ))
        )}
      </div>

      <div className="mt-4 rounded-2xl bg-white p-3 ring-1 ring-black/10 dark:bg-neutral-900 dark:ring-white/10">
        <div className="flex gap-2">
          <input
            type="text"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && customName.trim()) {
                addCustomItem(customName, activeCategory, customUnit);
                setCustomName("");
              }
            }}
            placeholder="הוסף מוצר חדש..."
            className="min-w-0 flex-1 rounded-lg border border-black/10 bg-neutral-50 px-3 py-2 text-sm outline-none ring-teal-600 focus:ring-2 dark:border-white/10 dark:bg-neutral-950"
          />
          <select
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
            className="rounded-lg border border-black/10 bg-neutral-50 px-2 py-2 text-sm outline-none dark:border-white/10 dark:bg-neutral-950"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-2 flex gap-2">
          <select
            value={customUnit}
            onChange={(e) => setCustomUnit(e.target.value as Unit)}
            className="rounded-lg border border-black/10 bg-neutral-50 px-2 py-2 text-sm outline-none dark:border-white/10 dark:bg-neutral-950"
          >
            {UNITS.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => {
              if (!customName.trim()) return;
              addCustomItem(customName, activeCategory, customUnit);
              setCustomName("");
            }}
            className="flex-1 rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-800"
          >
            הוסף לרשימה
          </button>
        </div>
      </div>
    </div>
  );
}
