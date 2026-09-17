"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/lib/types";
import { useCart } from "@/context/CartContext";

export function AddToCartControls({ product }: { product: Product }) {
  const { addItem } = useCart();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-neutral-600 dark:text-neutral-300">כמות:</span>
        <div className="flex items-center rounded-full border border-black/10 dark:border-white/10">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-3 py-1.5 text-lg text-neutral-600 hover:text-emerald-700 dark:text-neutral-300"
            aria-label="הפחת כמות"
          >
            −
          </button>
          <span className="w-8 text-center text-sm font-semibold">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.min(99, q + 1))}
            className="px-3 py-1.5 text-lg text-neutral-600 hover:text-emerald-700 dark:text-neutral-300"
            aria-label="הוסף כמות"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          disabled={!product.inStock}
          onClick={() => {
            addItem(product.id, quantity);
            setAdded(true);
            setTimeout(() => setAdded(false), 1800);
          }}
          className="flex-1 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:text-neutral-500 dark:disabled:bg-neutral-700"
        >
          {product.inStock ? (added ? "✔ נוסף לעגלה" : "הוסף לעגלה") : "אזל מהמלאי"}
        </button>
        <button
          type="button"
          disabled={!product.inStock}
          onClick={() => {
            addItem(product.id, quantity);
            router.push("/checkout");
          }}
          className="flex-1 rounded-full border border-emerald-600 px-6 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:border-neutral-300 disabled:text-neutral-400 dark:hover:bg-emerald-950"
        >
          קנה עכשיו
        </button>
      </div>
    </div>
  );
}
