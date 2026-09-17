import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById, products } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import { AddToCartControls } from "@/components/AddToCartControls";
import { ProductThumb } from "@/components/ProductThumb";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
      <Link href="/" className="mb-4 inline-block text-sm text-emerald-700 hover:underline dark:text-emerald-400">
        ← חזרה לקטלוג
      </Link>

      <div className="grid gap-8 sm:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-3xl bg-neutral-100 dark:bg-neutral-800">
          <ProductThumb product={product} className="h-full w-full" emojiClassName="text-8xl" />
          {!product.inStock && (
            <span className="absolute top-3 start-3 rounded-full bg-neutral-900/80 px-3 py-1 text-sm font-medium text-white">
              אזל מהמלאי
            </span>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
            {product.category}
          </span>
          <h1 className="text-2xl font-bold sm:text-3xl">{product.name}</h1>

          <div className="flex items-center gap-1 text-sm text-amber-500">
            <span aria-hidden>⭐</span>
            <span className="text-neutral-600 dark:text-neutral-400">
              {product.rating.toFixed(1)} מתוך 5
            </span>
          </div>

          <p className="text-2xl font-extrabold text-neutral-900 dark:text-white">
            {formatPrice(product.price)}
          </p>

          <p className="leading-relaxed text-neutral-600 dark:text-neutral-300">
            {product.description}
          </p>

          <div className="border-t border-black/5 pt-4 dark:border-white/10">
            <AddToCartControls product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
