import { InsurancePolicy, PolicyType } from "./types";

const STORAGE_KEY = "shoping-insurance-policies-v1";

type Listener = () => void;

let policies: InsurancePolicy[] = [];
let initialized = false;
const listeners = new Set<Listener>();

export interface PolicyInput {
  name: string;
  insurer: string;
  policyType: PolicyType;
  monthlyPremium: number;
  coverageIds: string[];
  notes?: string;
}

function isValidPolicy(value: unknown): value is InsurancePolicy {
  if (!value || typeof value !== "object") return false;
  const p = value as Record<string, unknown>;
  return (
    typeof p.id === "string" &&
    typeof p.name === "string" &&
    typeof p.insurer === "string" &&
    typeof p.policyType === "string" &&
    typeof p.monthlyPremium === "number" &&
    Array.isArray(p.coverageIds)
  );
}

function loadFromStorage(): InsurancePolicy[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isValidPolicy);
  } catch {
    return [];
  }
}

function ensureInitialized() {
  if (!initialized && typeof window !== "undefined") {
    policies = loadFromStorage();
    initialized = true;
  }
}

function persist() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(policies));
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

export function getSnapshot(): InsurancePolicy[] {
  ensureInitialized();
  return policies;
}

export function getServerSnapshot(): InsurancePolicy[] {
  return policies;
}

function makeId(): string {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function addPolicy(input: PolicyInput): void {
  ensureInitialized();
  const name = input.name.trim();
  if (!name) return;
  policies = [...policies, { ...input, id: makeId(), name }];
  persist();
  emit();
}

export function updatePolicy(id: string, input: PolicyInput): void {
  ensureInitialized();
  const name = input.name.trim();
  if (!name) return;
  policies = policies.map((p) => (p.id === id ? { ...p, ...input, name } : p));
  persist();
  emit();
}

export function removePolicy(id: string): void {
  ensureInitialized();
  policies = policies.filter((p) => p.id !== id);
  persist();
  emit();
}

export function clearPolicies(): void {
  ensureInitialized();
  policies = [];
  persist();
  emit();
}
