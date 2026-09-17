import { CartItem } from "./types";
import { products } from "./products";

const STORAGE_KEY = "shoping-cart-v1";

type Listener = () => void;

let items: CartItem[] = [];
let initialized = false;
const listeners = new Set<Listener>();

function loadFromStorage(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    const validIds = new Set(products.map((p) => p.id));
    return parsed.filter((i) => validIds.has(i.productId) && i.quantity > 0);
  } catch {
    return [];
  }
}

function ensureInitialized() {
  if (!initialized && typeof window !== "undefined") {
    items = loadFromStorage();
    initialized = true;
  }
}

function persist() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // storage unavailable (private mode etc.) — safe to ignore
  }
}

function emit() {
  listeners.forEach((listener) => listener());
}

export function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSnapshot(): CartItem[] {
  ensureInitialized();
  return items;
}

export function getServerSnapshot(): CartItem[] {
  return items;
}

export function addItem(productId: string, quantity = 1): void {
  ensureInitialized();
  const existing = items.find((i) => i.productId === productId);
  items = existing
    ? items.map((i) =>
        i.productId === productId ? { ...i, quantity: i.quantity + quantity } : i
      )
    : [...items, { productId, quantity }];
  persist();
  emit();
}

export function removeItem(productId: string): void {
  ensureInitialized();
  items = items.filter((i) => i.productId !== productId);
  persist();
  emit();
}

export function updateQuantity(productId: string, quantity: number): void {
  ensureInitialized();
  items =
    quantity <= 0
      ? items.filter((i) => i.productId !== productId)
      : items.map((i) => (i.productId === productId ? { ...i, quantity } : i));
  persist();
  emit();
}

export function clearCart(): void {
  ensureInitialized();
  items = [];
  persist();
  emit();
}
