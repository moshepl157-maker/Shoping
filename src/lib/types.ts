export interface Category {
  id: string;
  name: string;
  presetItems: string[];
}

export const UNITS = ["יח'", "ק\"ג", "גרם", "ליטר", "חבילה"] as const;
export type Unit = (typeof UNITS)[number];

export interface ListItem {
  id: string;
  name: string;
  categoryId: string;
  quantity: number;
  unit: Unit;
  checked: boolean;
}
