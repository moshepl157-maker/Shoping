# שופינג — חנות E-commerce לדוגמה

אפליקציית חנות אונליין מודרנית, בעברית ובכיוון RTL, שנבנתה עם Next.js, TypeScript ו-Tailwind CSS.

## תכונות

- **קטלוג מוצרים** — חיפוש חופשי, סינון לפי קטגוריה ומיון (מחיר / דירוג).
- **עמוד מוצר** — פרטים מלאים, בחירת כמות, "הוסף לעגלה" ו"קנה עכשיו".
- **עגלת קניות** — עדכון כמויות, הסרת פריטים, חישוב סכום ביניים ומשלוח (חינם מעל ₪200), ושמירה אוטומטית ב-localStorage.
- **קופה (Checkout) — סימולציה** — תהליך בן 4 שלבים: פרטי משלוח ← תשלום ← סיכום הזמנה ← אישור עם מספר הזמנה. אין חיוב אמיתי, זהו דמו בלבד.

## סטאק טכנולוגי

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- Tailwind CSS 4
- React Context / `useSyncExternalStore` לניהול מצב העגלה, עם התמדה ב-`localStorage`

## הרצה מקומית

```bash
npm install
npm run dev
```

האתר יעלה בכתובת [http://localhost:3000](http://localhost:3000).

## בדיקות

```bash
npm run lint   # ESLint
npm run build  # בנייה לפרודקשן + בדיקת טייפים
```

## מבנה הפרויקט

```
src/
  app/               # דפי Next.js (App Router)
    page.tsx         # קטלוג + חיפוש/סינון
    product/[id]/    # עמוד מוצר
    cart/            # עגלת קניות
    checkout/        # תהליך קופה בן 4 שלבים
  components/        # רכיבי UI לשימוש חוזר
  context/           # hook לניהול עגלת הקניות
  lib/                # נתוני מוצרים, טיפוסים, עזרי פורמט
```
