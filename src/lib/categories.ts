import { Category } from "./types";

export const categories: Category[] = [
  {
    id: "produce",
    name: "ירקות ופירות",
    presetItems: ["עגבניות", "מלפפונים", "בצל", "תפוחי אדמה", "גזר", "פלפל", "תפוחים", "בננות", "לימון", "אבוקדו"],
  },
  {
    id: "dairy",
    name: "מוצרי חלב וביצים",
    presetItems: ["חלב", "ביצים", "גבינה צהובה", "גבינה לבנה", "יוגורט", "חמאה", "שמנת"],
  },
  {
    id: "meat",
    name: "בשר, עוף ודגים",
    presetItems: ["חזה עוף", "בשר טחון", "סטייק", "נקניקיות", "טונה טרייה", "סלמון"],
  },
  {
    id: "bakery",
    name: "מאפים ולחם",
    presetItems: ["לחם", "פיתות", "לחמניות", "בגט", "קרואסון"],
  },
  {
    id: "pantry",
    name: "שימורים ויבשים",
    presetItems: ["אורז", "פסטה", "קמח", "סוכר", "שמן", "עדשים", "חומוס", "טונה משומרת", "רסק עגבניות"],
  },
  {
    id: "snacks",
    name: "חטיפים ומתוקים",
    presetItems: ["שוקולד", "במבה", "ביסלי", "עוגיות", "חטיפי דגנים"],
  },
  {
    id: "drinks",
    name: "משקאות",
    presetItems: ["מים", "קולה", "מיץ", "בירה", "יין", "קפה", "תה"],
  },
  {
    id: "frozen",
    name: "קפואים",
    presetItems: ["ירקות קפואים", "פיצה קפואה", "גלידה", "בצק עלים"],
  },
  {
    id: "cleaning",
    name: "ניקיון ובית",
    presetItems: ["נייר טואלט", "מגבות נייר", "סבון כלים", "אקונומיקה", "שקיות אשפה", "מטליות"],
  },
  {
    id: "personal",
    name: "טיפוח והיגיינה",
    presetItems: ["שמפו", "סבון", "משחת שיניים", "דאודורנט", "מגבונים"],
  },
  {
    id: "other",
    name: "אחר",
    presetItems: [],
  },
];

export function categoryName(id: string): string {
  return categories.find((c) => c.id === id)?.name ?? "אחר";
}
