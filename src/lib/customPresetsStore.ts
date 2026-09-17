const STORAGE_KEY = "shoping-custom-presets-v1";

type Listener = () => void;
type CustomPresets = Record<string, string[]>;

let presets: CustomPresets = {};
let initialized = false;
const listeners = new Set<Listener>();

function isValidPresets(value: unknown): value is CustomPresets {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  return Object.values(value).every(
    (list) => Array.isArray(list) && list.every((item) => typeof item === "string")
  );
}

function loadFromStorage(): CustomPresets {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return isValidPresets(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

function ensureInitialized() {
  if (!initialized && typeof window !== "undefined") {
    presets = loadFromStorage();
    initialized = true;
  }
}

function persist() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(presets));
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

export function getSnapshot(): CustomPresets {
  ensureInitialized();
  return presets;
}

export function getServerSnapshot(): CustomPresets {
  return presets;
}

export function addCustomPreset(categoryId: string, name: string): void {
  ensureInitialized();
  const trimmed = name.trim();
  if (!trimmed) return;

  const existing = presets[categoryId] ?? [];
  if (existing.some((item) => item.toLowerCase() === trimmed.toLowerCase())) return;

  presets = { ...presets, [categoryId]: [...existing, trimmed] };
  persist();
  emit();
}
