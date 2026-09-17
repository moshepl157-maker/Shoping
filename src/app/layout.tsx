import type { Metadata, Viewport } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["hebrew", "latin"],
});

export const metadata: Metadata = {
  title: "שופינג - חנות אונליין",
  description: "חנות מקוונת מודרנית - קטלוג מוצרים, עגלת קניות וקופה מהירה.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#059669",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="he" dir="rtl" className={`${rubik.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
        <Header />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-black/5 py-6 text-center text-sm text-neutral-500 dark:border-white/10 dark:text-neutral-400">
          © {new Date().getFullYear()} שופינג — חנות הדגמה. כל הזכויות שמורות.
        </footer>
      </body>
    </html>
  );
}
