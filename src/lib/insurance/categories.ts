import { CoverageCategory } from "./types";

export const coverageCategories: CoverageCategory[] = [
  {
    id: "surgery-il",
    name: "ניתוחים בישראל",
    description: "כיסוי לניתוחים פרטיים בישראל ובחירת מנתח וביה\"ח",
    essential: true,
  },
  {
    id: "surgery-abroad",
    name: 'ניתוחים וטיפולים בחו"ל',
    description: "מימון טיפול רפואי מורכב שאינו זמין בישראל",
    essential: true,
  },
  {
    id: "transplants",
    name: "השתלות איברים",
    description: "מימון השתלות איברים בארץ ובחו\"ל",
    essential: true,
  },
  {
    id: "critical-illness",
    name: "מחלות קשות",
    description: "פיצוי חד פעמי באבחון מחלה קשה (סרטן, לב, שבץ ועוד)",
    essential: true,
  },
  {
    id: "medications",
    name: 'תרופות מחוץ לסל הבריאות',
    description: "מימון תרופות שאינן כלולות בסל התרופות הציבורי",
    essential: true,
  },
  {
    id: "long-term-care",
    name: "סיעוד",
    description: "קצבה חודשית או מימון טיפול סיעודי לטווח ארוך",
    essential: true,
  },
  {
    id: "ambulatory",
    name: "שירותים אמבולטוריים",
    description: "רופאים מומחים, בדיקות אבחון והתייעצויות",
    essential: false,
  },
  {
    id: "hospitalization-daily",
    name: "פיצוי יומי באשפוז",
    description: "תשלום יומי בגין ימי אשפוז בבית חולים",
    essential: false,
  },
  {
    id: "dental",
    name: "טיפולי שיניים",
    description: "כיסוי לטיפולי שיניים מורכבים",
    essential: false,
  },
  {
    id: "pregnancy",
    name: "הריון ולידה",
    description: "כיסוי סיבוכי הריון ולידה",
    essential: false,
  },
  {
    id: "alternative-medicine",
    name: "רפואה משלימה",
    description: "טיפולי רפואה אלטרנטיבית/משלימה",
    essential: false,
  },
  {
    id: "medical-equipment",
    name: "מכשור וציוד רפואי",
    description: "מימון עזרים ומכשור רפואי",
    essential: false,
  },
];

export function coverageCategoryName(id: string): string {
  return coverageCategories.find((c) => c.id === id)?.name ?? id;
}
