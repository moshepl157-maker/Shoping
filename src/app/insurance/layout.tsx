import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "השוואת ביטוחי בריאות",
  description: "מנוע להשוואת פוליסות ביטוח בריאות, איתור כפילויות כיסוי, מיפוי סיכונים והמלצות פעולה.",
};

export default function InsuranceLayout({ children }: LayoutProps<"/insurance">) {
  return children;
}
