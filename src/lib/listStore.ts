import { ListItem, Unit } from "./types";

const STORAGE_KEY = "shoping-grocery-list-v1";

type Listener = () => void;

let items: ListItem[] = [];
let initialized = false;
const listeners = new Set<Listener>();

function isValidItem(value: unknown): value is ListItem {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.id === "string" &&
    typeof item.name === "string" &&
    typeof item.categoryId === "string" &&
    typeof item.quantity === "number" &&
    typeof item.unit === "string" &&
    typeof item.checked === "boolean"
  );
}

function loadFromStorage(): ListItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isValidItem);
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

export function getSnapshot(): ListItem[] {
  ensureInitialized();
  return items;
}

export function getServerSnapshot(): ListItem[] {
  return items;
}

function makeId(): string {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function addItem(name: string, categoryId: string, unit: Unit, quantity = 1): void {
  ensureInitialized();
  const trimmed = name.trim();
  if (!trimmed) return;

  const existing = items.find((i) => i.name === trimmed && i.categoryId === categoryId);
  items = existing
    ? items.map((i) => (i.id === existing.id ? { ...i, quantity: i.quantity + quantity } : i))
    : [...items, { id: makeId(), name: trimmed, categoryId, quantity, unit, checked: false }];

  persist();
  emit();
}

export function updateQuantity(id: string, delta: number): void {
  ensureInitialized();
  items = items.map((i) => (i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i));
  persist();
  emit();
}

export function toggleChecked(id: string): void {
  ensureInitialized();
  items = items.map((i) => (i.id === id ? { ...i, checked: !i.checked } : i));
  persist();
  emit();
}

export function removeItem(id: string): void {
  ensureInitialized();
  items = items.filter((i) => i.id !== id);
  persist();
  emit();
}

export function clearList(): void {
  ensureInitialized();
  items = [];
  persist();
  emit();
}
