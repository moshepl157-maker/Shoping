"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart, useCartLines } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";

type Step = "shipping" | "payment" | "review" | "done";

const STEPS: { key: Step; label: string }[] = [
  { key: "shipping", label: "משלוח" },
  { key: "payment", label: "תשלום" },
  { key: "review", label: "סיכום" },
  { key: "done", label: "אישור" },
];

const SHIPPING_THRESHOLD = 200;
const SHIPPING_COST = 25;

interface ShippingInfo {
  fullName: string;
  phone: string;
  city: string;
  address: string;
}

interface PaymentInfo {
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

const emptyShipping: ShippingInfo = { fullName: "", phone: "", city: "", address: "" };
const emptyPayment: PaymentInfo = { cardName: "", cardNumber: "", expiry: "", cvv: "" };

function StepIndicator({ current }: { current: Step }) {
  const currentIndex = STEPS.findIndex((s) => s.key === current);
  return (
    <ol className="mb-8 flex items-center justify-center gap-2 sm:gap-4">
      {STEPS.map((step, index) => (
        <li key={step.key} className="flex items-center gap-2 sm:gap-4">
          <div className="flex flex-col items-center gap-1">
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                index <= currentIndex
                  ? "bg-emerald-600 text-white"
                  : "bg-neutral-200 text-neutral-500 dark:bg-neutral-800"
              }`}
            >
              {index + 1}
            </span>
            <span className="text-xs text-neutral-500 dark:text-neutral-400">{step.label}</span>
          </div>
          {index < STEPS.length - 1 && (
            <span
              className={`h-0.5 w-6 sm:w-12 ${
                index < currentIndex ? "bg-emerald-600" : "bg-neutral-200 dark:bg-neutral-800"
              }`}
            />
          )}
        </li>
      ))}
    </ol>
  );
}

export default function CheckoutPage() {
  const { subtotal, clearCart } = useCart();
  const lines = useCartLines();
  const [step, setStep] = useState<Step>("shipping");
  const [shipping, setShipping] = useState<ShippingInfo>(emptyShipping);
  const [payment, setPayment] = useState<PaymentInfo>(emptyPayment);
  const [orderNumber, setOrderNumber] = useState("");

  const shippingCost = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shippingCost;

  if (lines.length === 0 && step !== "done") {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 px-4 py-24 text-center">
        <span className="text-5xl">🧾</span>
        <h1 className="text-xl font-bold">אין פריטים לתשלום</h1>
        <p className="text-neutral-500 dark:text-neutral-400">הוסיפו מוצרים לעגלה לפני המעבר לקופה.</p>
        <Link href="/" className="mt-2 rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700">
          למעבר לקטלוג
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <h1 className="mb-6 text-center text-2xl font-bold">קופה</h1>
      <StepIndicator current={step} />

      {step === "shipping" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setStep("payment");
          }}
          className="flex flex-col gap-4 rounded-2xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-neutral-900"
        >
          <h2 className="text-lg font-bold">פרטי משלוח</h2>
          <Field label="שם מלא" value={shipping.fullName} onChange={(v) => setShipping((s) => ({ ...s, fullName: v }))} required />
          <Field label="טלפון" value={shipping.phone} onChange={(v) => setShipping((s) => ({ ...s, phone: v }))} required type="tel" />
          <Field label="עיר" value={shipping.city} onChange={(v) => setShipping((s) => ({ ...s, city: v }))} required />
          <Field label="כתובת מלאה" value={shipping.address} onChange={(v) => setShipping((s) => ({ ...s, address: v }))} required />

          <button type="submit" className="mt-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700">
            המשך לתשלום
          </button>
        </form>
      )}

      {step === "payment" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setStep("review");
          }}
          className="flex flex-col gap-4 rounded-2xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-neutral-900"
        >
          <h2 className="text-lg font-bold">פרטי תשלום</h2>
          <p className="rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800 dark:bg-amber-950 dark:text-amber-200">
            זוהי סימולציית קופה בלבד — אין לבצע חיוב אמיתי ואין להזין פרטי כרטיס אשראי אמיתיים.
          </p>
          <Field label="שם בעל הכרטיס" value={payment.cardName} onChange={(v) => setPayment((p) => ({ ...p, cardName: v }))} required />
          <Field
            label="מספר כרטיס (דמה)"
            value={payment.cardNumber}
            onChange={(v) => setPayment((p) => ({ ...p, cardNumber: v.replace(/\D/g, "").slice(0, 16) }))}
            required
            placeholder="0000 0000 0000 0000"
            inputMode="numeric"
          />
          <div className="grid grid-cols-2 gap-4">
            <Field
              label="תוקף (MM/YY)"
              value={payment.expiry}
              onChange={(v) => setPayment((p) => ({ ...p, expiry: v }))}
              required
              placeholder="12/28"
            />
            <Field
              label="CVV"
              value={payment.cvv}
              onChange={(v) => setPayment((p) => ({ ...p, cvv: v.replace(/\D/g, "").slice(0, 4) }))}
              required
              inputMode="numeric"
            />
          </div>

          <div className="mt-2 flex gap-3">
            <button
              type="button"
              onClick={() => setStep("shipping")}
              className="flex-1 rounded-full border border-black/10 px-6 py-3 text-sm font-semibold text-neutral-600 transition hover:bg-neutral-50 dark:border-white/10 dark:text-neutral-300 dark:hover:bg-white/10"
            >
              חזרה
            </button>
            <button type="submit" className="flex-1 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700">
              המשך לסיכום
            </button>
          </div>
        </form>
      )}

      {step === "review" && (
        <div className="flex flex-col gap-4 rounded-2xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-neutral-900">
          <h2 className="text-lg font-bold">סיכום הזמנה</h2>

          <div>
            <h3 className="mb-1 text-sm font-semibold text-neutral-500 dark:text-neutral-400">משלוח אל</h3>
            <p className="text-sm">
              {shipping.fullName} · {shipping.phone}
              <br />
              {shipping.address}, {shipping.city}
            </p>
          </div>

          <div>
            <h3 className="mb-1 text-sm font-semibold text-neutral-500 dark:text-neutral-400">אמצעי תשלום</h3>
            <p className="text-sm">כרטיס המסתיים ב-{payment.cardNumber.slice(-4) || "0000"}</p>
          </div>

          <ul className="flex flex-col gap-2 border-t border-black/5 pt-3 dark:border-white/10">
            {lines.map(({ item, product }) => (
              <li key={product.id} className="flex justify-between text-sm">
                <span>
                  {product.name} × {item.quantity}
                </span>
                <span className="font-medium">{formatPrice(product.price * item.quantity)}</span>
              </li>
            ))}
          </ul>

          <dl className="flex flex-col gap-1 border-t border-black/5 pt-3 text-sm dark:border-white/10">
            <div className="flex justify-between">
              <dt className="text-neutral-500 dark:text-neutral-400">סכום ביניים</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-neutral-500 dark:text-neutral-400">משלוח</dt>
              <dd>{shippingCost === 0 ? "חינם" : formatPrice(shippingCost)}</dd>
            </div>
            <div className="flex justify-between text-base font-bold">
              <dt>סה״כ לתשלום</dt>
              <dd>{formatPrice(total)}</dd>
            </div>
          </dl>

          <div className="mt-2 flex gap-3">
            <button
              type="button"
              onClick={() => setStep("payment")}
              className="flex-1 rounded-full border border-black/10 px-6 py-3 text-sm font-semibold text-neutral-600 transition hover:bg-neutral-50 dark:border-white/10 dark:text-neutral-300 dark:hover:bg-white/10"
            >
              חזרה
            </button>
            <button
              type="button"
              onClick={() => {
                const generated = `SH-${Date.now().toString().slice(-8)}`;
                setOrderNumber(generated);
                clearCart();
                setStep("done");
              }}
              className="flex-1 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
            >
              בצע הזמנה
            </button>
          </div>
        </div>
      )}

      {step === "done" && (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-black/5 bg-white p-8 text-center shadow-sm dark:border-white/10 dark:bg-neutral-900">
          <span className="text-5xl">✅</span>
          <h2 className="text-xl font-bold">ההזמנה בוצעה בהצלחה!</h2>
          <p className="text-neutral-500 dark:text-neutral-400">
            מספר הזמנה: <span className="font-mono font-semibold text-emerald-700 dark:text-emerald-400">{orderNumber}</span>
          </p>
          <p className="max-w-sm text-sm text-neutral-500 dark:text-neutral-400">
            זוהי הזמנת דמה לצורכי הדגמה בלבד. אישור נשלח לדוגמה לכתובת שהוזנה.
          </p>
          <Link href="/" className="mt-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700">
            חזרה לקטלוג
          </Link>
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  required,
  type = "text",
  placeholder,
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
  placeholder?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="font-medium text-neutral-700 dark:text-neutral-300">{label}</span>
      <input
        type={type}
        required={required}
        value={value}
        placeholder={placeholder}
        inputMode={inputMode}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-xl border border-black/10 bg-white px-3 py-2.5 outline-none ring-emerald-500 focus:ring-2 dark:border-white/10 dark:bg-neutral-950"
      />
    </label>
  );
}
