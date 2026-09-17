"use client";

import Link from "next/link";
import { useCart, useCartLines } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";
import { ProductThumb } from "@/components/ProductThumb";

const SHIPPING_THRESHOLD = 200;
const SHIPPING_COST = 25;

export default function CartPage() {
  const { updateQuantity, removeItem, subtotal, clearCart } = useCart();
  const lines = useCartLines();

  const shipping = subtotal === 0 || subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;

  if (lines.length === 0) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 px-4 py-24 text-center">
        <span className="text-5xl">🛒</span>
        <h1 className="text-xl font-bold">העגלה שלך ריקה</h1>
        <p className="text-neutral-500 dark:text-neutral-400">
          נראה שעדיין לא הוספת מוצרים. גלו את הקטלוג שלנו!
        </p>
        <Link
          href="/"
          className="mt-2 rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
        >
          למעבר לקטלוג
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">עגלת קניות</h1>
        <button
          type="button"
          onClick={clearCart}
          className="text-sm text-neutral-500 hover:text-red-600 dark:text-neutral-400"
        >
          רוקן עגלה
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <ul className="flex flex-col gap-4">
          {lines.map(({ item, product }) => (
            <li
              key={product.id}
              className="flex gap-4 rounded-2xl border border-black/5 bg-white p-3 shadow-sm dark:border-white/10 dark:bg-neutral-900"
            >
              <Link href={`/product/${product.id}`} className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800">
                <ProductThumb product={product} className="h-full w-full" emojiClassName="text-3xl" />
              </Link>

              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <Link href={`/product/${product.id}`} className="font-semibold hover:underline">
                    {product.name}
                  </Link>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    {formatPrice(product.price)} ליחידה
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center rounded-full border border-black/10 dark:border-white/10">
                    <button
                      type="button"
                      onClick={() => updateQuantity(product.id, item.quantity - 1)}
                      className="px-3 py-1 text-neutral-600 hover:text-emerald-700 dark:text-neutral-300"
                      aria-label="הפחת כמות"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(product.id, item.quantity + 1)}
                      className="px-3 py-1 text-neutral-600 hover:text-emerald-700 dark:text-neutral-300"
                      aria-label="הוסף כמות"
                    >
                      +
                    </button>
                  </div>

                  <span className="font-bold">{formatPrice(product.price * item.quantity)}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => removeItem(product.id)}
                className="self-start text-neutral-400 hover:text-red-600"
                aria-label={`הסר את ${product.name} מהעגלה`}
                title="הסר מהעגלה"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-2xl border border-black/5 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-neutral-900">
          <h2 className="mb-4 text-lg font-bold">סיכום הזמנה</h2>
          <dl className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-neutral-500 dark:text-neutral-400">סכום ביניים</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-neutral-500 dark:text-neutral-400">משלוח</dt>
              <dd>{shipping === 0 ? "חינם" : formatPrice(shipping)}</dd>
            </div>
            {shipping > 0 && (
              <p className="text-xs text-emerald-700 dark:text-emerald-400">
                הוסיפו {formatPrice(SHIPPING_THRESHOLD - subtotal)} למשלוח חינם
              </p>
            )}
          </dl>
          <div className="mt-4 flex justify-between border-t border-black/5 pt-4 text-base font-bold dark:border-white/10">
            <span>סה״כ לתשלום</span>
            <span>{formatPrice(total)}</span>
          </div>

          <Link
            href="/checkout"
            className="mt-5 block rounded-full bg-emerald-600 px-6 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
          >
            המשך לתשלום
          </Link>
        </aside>
      </div>
    </div>
  );
}
