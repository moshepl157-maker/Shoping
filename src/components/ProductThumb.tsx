import { categoryGradients } from "@/lib/products";
import { Product } from "@/lib/types";

export function ProductThumb({
  product,
  className = "",
  emojiClassName = "text-5xl",
}: {
  product: Pick<Product, "emoji" | "category" | "name">;
  className?: string;
  emojiClassName?: string;
}) {
  const gradient = categoryGradients[product.category] ?? "from-neutral-400 to-neutral-600";

  return (
    <div
      className={`flex items-center justify-center bg-gradient-to-br ${gradient} ${className}`}
      role="img"
      aria-label={product.name}
    >
      <span className={emojiClassName} aria-hidden>
        {product.emoji}
      </span>
    </div>
  );
}
