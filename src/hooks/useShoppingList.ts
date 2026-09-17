"use client";

import { useSyncExternalStore } from "react";
import { ListItem } from "@/lib/types";
import * as listStore from "@/lib/listStore";

interface ShoppingListApi {
  items: ListItem[];
  addItem: typeof listStore.addItem;
  updateQuantity: typeof listStore.updateQuantity;
  toggleChecked: typeof listStore.toggleChecked;
  removeItem: typeof listStore.removeItem;
  clearList: typeof listStore.clearList;
}

export function useShoppingList(): ShoppingListApi {
  const items = useSyncExternalStore(
    listStore.subscribe,
    listStore.getSnapshot,
    listStore.getServerSnapshot
  );

  return {
    items,
    addItem: listStore.addItem,
    updateQuantity: listStore.updateQuantity,
    toggleChecked: listStore.toggleChecked,
    removeItem: listStore.removeItem,
    clearList: listStore.clearList,
  };
}
