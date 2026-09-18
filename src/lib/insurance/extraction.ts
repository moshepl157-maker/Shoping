import { z } from "zod";
import { coverageCategories } from "./categories";
import { POLICY_TYPES } from "./types";

const coverageIdValues = coverageCategories.map((c) => c.id) as [string, ...string[]];

export const ExtractedPolicySchema = z.object({
  name: z.string().describe("שם קצר ומזהה לפוליסה, למשל 'בריאות משפחתי - הראל'"),
  insurer: z.string().describe("שם חברת הביטוח כפי שמופיע במסמך"),
  policyType: z.enum(POLICY_TYPES).describe("סוג הפוליסה"),
  monthlyPremium: z.number().describe("הפרמיה החודשית הכוללת בשקלים, 0 אם לא נמצאה בבירור"),
  coverageIds: z
    .array(z.enum(coverageIdValues))
    .describe("תחומי הכיסוי שזוהו במסמך, אך ורק מתוך רשימת ה-id הנתונה"),
  notes: z.string().optional().describe("הערה קצרה רלוונטית, אם יש (עד משפט אחד)"),
});

export type ExtractedPolicy = z.infer<typeof ExtractedPolicySchema>;

export function buildExtractionSystemPrompt(): string {
  const categoriesList = coverageCategories.map((c) => `- ${c.id}: ${c.name} — ${c.description}`).join("\n");

  return [
    "אתה אנליסט ביטוח מומחה. המשימה שלך היא לחלץ מתוך מסמך פוליסת ביטוח בריאות שמצורף את הפרטים המבוקשים, במדויק ורק לפי מה שמופיע במסמך.",
    "",
    `עבור תחומי הכיסוי (coverageIds), בחר אך ורק מתוך רשימת ה-id הבאה, לפי מה שמכוסה בפועל בפוליסה:\n${categoriesList}`,
    "",
    `עבור סוג הפוליסה (policyType), בחר בדיוק אחת מהאפשרויות: ${POLICY_TYPES.join(", ")}.`,
    "",
    "אם פרט מסוים אינו מופיע במסמך בבירור, ציין ערך סביר או ריק (0 לפרמיה, מחרוזת ריקה לשדה טקסט) — אל תמציא נתונים.",
  ].join("\n");
}
