"use client";

import { useMemo, useSyncExternalStore } from "react";
import { CartItem, Product } from "@/lib/types";
import { getProductById } from "@/lib/products";
import * as cartStore from "@/lib/cartStore";

interface CartApi {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (productId: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

export function useCart(): CartApi {
  const items = useSyncExternalStore(
    cartStore.subscribe,
    cartStore.getSnapshot,
    cartStore.getServerSnapshot
  );

  const itemCount = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () =>
      items.reduce((sum, i) => {
        const product = getProductById(i.productId);
        return product ? sum + product.price * i.quantity : sum;
      }, 0),
    [items]
  );

  return {
    items,
    itemCount,
    subtotal,
    addItem: cartStore.addItem,
    removeItem: cartStore.removeItem,
    updateQuantity: cartStore.updateQuantity,
    clearCart: cartStore.clearCart,
  };
}

export function useCartLines() {
  const { items } = useCart();
  return useMemo(
    () =>
      items
        .map((i) => ({ item: i, product: getProductById(i.productId) }))
        .filter((line): line is { item: CartItem; product: Product } =>
          Boolean(line.product)
        ),
    [items]
  );
}
