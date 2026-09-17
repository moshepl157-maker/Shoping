"use client";

import { useMemo, useState } from "react";
import { categories, products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

type SortOption = "default" | "price-asc" | "price-desc" | "rating";

const sortLabels: Record<SortOption, string> = {
  default: "מיון: מומלץ",
  "price-asc": "מחיר: מהנמוך לגבוה",
  "price-desc": "מחיר: מהגבוה לנמוך",
  rating: "דירוג גבוה",
};

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("הכל");
  const [sort, setSort] = useState<SortOption>("default");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = products.filter((p) => {
      const matchesCategory = category === "הכל" || p.category === category;
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });

    list = [...list];
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);

    return list;
  }, [query, category, sort]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
      <section className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-l from-emerald-600 to-teal-600 px-6 py-10 text-white shadow-sm sm:px-10">
        <h1 className="text-2xl font-extrabold sm:text-3xl">ברוכים הבאים לשופינג 🛍️</h1>
        <p className="mt-2 max-w-xl text-emerald-50">
          מגוון רחב של מוצרים באיכות גבוהה, במחירים משתלמים, עם משלוח מהיר עד הבית.
        </p>
      </section>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="חיפוש מוצרים..."
            className="w-full rounded-full border border-black/10 bg-white px-4 py-2.5 pe-10 text-sm shadow-sm outline-none ring-emerald-500 focus:ring-2 dark:border-white/10 dark:bg-neutral-900"
          />
          <span aria-hidden className="pointer-events-none absolute end-3.5 top-1/2 -translate-y-1/2 text-neutral-400">
            🔎
          </span>
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="rounded-full border border-black/10 bg-white px-4 py-2.5 text-sm shadow-sm outline-none focus:ring-2 focus:ring-emerald-500 dark:border-white/10 dark:bg-neutral-900"
        >
          {Object.entries(sortLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              category === c
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-white text-neutral-600 ring-1 ring-black/10 hover:bg-neutral-100 dark:bg-neutral-900 dark:text-neutral-300 dark:ring-white/10 dark:hover:bg-white/10"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <p className="mb-4 text-sm text-neutral-500 dark:text-neutral-400">
        {filtered.length} מוצרים נמצאו
      </p>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-black/10 py-16 text-center text-neutral-500 dark:border-white/10">
          <span className="text-3xl">🔍</span>
          <p>לא נמצאו מוצרים התואמים את החיפוש.</p>
        </div>
      )}
    </div>
  );
}
