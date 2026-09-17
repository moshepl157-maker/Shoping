"use client";

import Link from "next/link";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/context/CartContext";
import { ProductThumb } from "@/components/ProductThumb";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition hover:shadow-md dark:border-white/10 dark:bg-neutral-900">
      <Link href={`/product/${product.id}`} className="relative block aspect-square overflow-hidden bg-neutral-100 dark:bg-neutral-800">
        <ProductThumb
          product={product}
          className="h-full w-full transition duration-300 group-hover:scale-105"
        />
        {!product.inStock && (
          <span className="absolute top-2 start-2 rounded-full bg-neutral-900/80 px-2 py-1 text-xs font-medium text-white">
            אזל מהמלאי
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-3">
        <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
          {product.category}
        </span>
        <Link href={`/product/${product.id}`} className="line-clamp-2 text-sm font-semibold text-neutral-900 hover:underline dark:text-neutral-50">
          {product.name}
        </Link>

        <div className="flex items-center gap-1 text-xs text-amber-500">
          <span aria-hidden>⭐</span>
          <span className="text-neutral-600 dark:text-neutral-400">{product.rating.toFixed(1)}</span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-base font-bold text-neutral-900 dark:text-white">
            {formatPrice(product.price)}
          </span>
          <button
            type="button"
            disabled={!product.inStock}
            onClick={() => addItem(product.id)}
            className="rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:text-neutral-500 dark:disabled:bg-neutral-700"
          >
            הוסף לעגלה
          </button>
        </div>
      </div>
    </div>
  );
}
