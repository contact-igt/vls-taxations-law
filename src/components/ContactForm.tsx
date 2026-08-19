"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PROGRAMME, GOOGLE_SHEET_URL } from "@/lib/constants";
import { getUTM } from "@/lib/useUTMSource";

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

interface FormValues {
  name: string;
  email: string;
  mobile: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  mobile?: string;
}

interface RazorpayOrder {
  id: string;
  amount: number;
  currency: string;
}

interface RazorpayResponse {
  razorpay_payment_id?: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
  captured?: boolean;
}

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => {
      open: () => void;
      on: (event: string, handler: (response?: unknown) => void) => void;
    };
  }
}

/* -------------------------------------------------------------------------- */
/*  Validation                                                                 */
/* -------------------------------------------------------------------------- */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MOBILE_RE = /^[0-9]{10}$/;
const NAME_RE = /^[a-zA-Z ]*$/;

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (values.name && !NAME_RE.test(values.name)) {
    errors.name = "Name can only contain letters and spaces.";
  }

  if (!values.email) {
    errors.email = "Email is required.";
  } else if (!EMAIL_RE.test(values.email)) {
    errors.email = "Enter a valid email address.";
  } else if (values.email !== values.email.toLowerCase()) {
    errors.email = "Email must be lowercase.";
  }

  if (!values.mobile) {
    errors.mobile = "Mobile number is required.";
  } else if (!MOBILE_RE.test(values.mobile)) {
    errors.mobile = "Enter a valid 10-digit mobile number.";
  }

  return errors;
}

/* -------------------------------------------------------------------------- */
/*  Google Sheet helper                                                        */
/* -------------------------------------------------------------------------- */

async function submitToGoogleSheet(
  formData: URLSearchParams,
  retries = 3,
  delay = 1500
): Promise<boolean> {
  try {
    const res = await fetch(GOOGLE_SHEET_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString(),
    });
    if (res.ok) return true;
    throw new Error("Sheet responded with non-OK");
  } catch (err) {
    if (retries <= 1) {
      console.error("Google Sheet failed permanently:", err);
      return false;
    }
    await new Promise((r) => setTimeout(r, delay));
    return submitToGoogleSheet(formData, retries - 1, delay);
  }
}

/* -------------------------------------------------------------------------- */
/*  WhatsApp helper                                                            */
/* -------------------------------------------------------------------------- */

async function sendWhatsApp(
  phone: string,
  name: string,
  amount: number
): Promise<void> {
  try {
    await fetch("/api/send-whatsapp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone,
        name,
        amount,
        programm_name: PROGRAMME.programmName,
        schedule: PROGRAMME.schedule,
        platform: PROGRAMME.platform,
        link_date: PROGRAMME.linkDate,
      }),
    });
  } catch (err) {
    console.error("WhatsApp send error:", err);
  }
}

/* -------------------------------------------------------------------------- */
/*  Main component                                                             */
/* -------------------------------------------------------------------------- */

interface ContactFormProps {
  /** Visitor IP address — passed from the page/banner (optional) */
  ipAddress?: string;
}

export function ContactForm({ ipAddress: ipAddressProp = "" }: ContactFormProps) {
  const router = useRouter();

  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    mobile: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormValues, boolean>>>({});

  // Popup / flow state
  const [instructionOpen, setInstructionOpen] = useState(false);
  const [agree, setAgree] = useState(false);
  const [processing, setProcessing] = useState(false);

  // IP address — use prop if available, otherwise fetch from ipify
  const [ipAddress, setIpAddress] = useState(ipAddressProp);

  // Stored form values used after popup confirmation
  const confirmedValues = useRef<FormValues | null>(null);

  // On mount: clear stale payment details & fetch IP if not provided
  useEffect(() => {
    try {
      localStorage.removeItem("PaymentDetails");
    } catch { /* storage may be unavailable */ }

    if (!ipAddressProp) {
      fetch("https://api.ipify.org?format=json")
        .then((r) => r.json())
        .then((d) => setIpAddress(d.ip || ""))
        .catch(() => { /* ignore */ });
    }
  }, [ipAddressProp]);

  /* ---- Field change ---- */
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (touched[name as keyof FormValues]) {
      setErrors(validate({ ...values, [name]: value }));
    }
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate(values));
  }

  /* ---- Submit → open instruction popup ---- */
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched({ name: true, email: true, mobile: true });
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    confirmedValues.current = values;
    setAgree(false);
    setInstructionOpen(true);
  }

  /* ---- Open Razorpay after popup confirmation ---- */
  async function openRazorpay() {
    setInstructionOpen(false);
    const fv = confirmedValues.current!;

    // 1. Create Razorpay order
    let order: RazorpayOrder;
    try {
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: PROGRAMME.razorpay.amount }),
        // body: JSON.stringify({ amount: 1 }),
      });
      if (!res.ok) throw new Error("Order creation failed");
      order = await res.json();
    } catch {
      router.replace("/error");
      return;
    }

    // 2. Open Razorpay checkout
    const options: Record<string, unknown> = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      // key: "rzp_test_Ss2NFtpJFLRAiw",
      amount: order.amount,
      currency: order.currency,
      name: fv.name || "Participant",
      order_id: order.id,
      description: `${PROGRAMME.razorpay.title} — ₹${PROGRAMME.razorpay.amount}`,
      prefill: {
        name: fv.name,
        email: fv.email,
        contact: fv.mobile,
      },
      theme: { color: "#a51f24" },

      handler: async (response: RazorpayResponse) => {
        if (!response?.razorpay_payment_id) {
          router.replace("/error");
          return;
        }

        setProcessing(true);

        // 3. Build payload
        const apiPayload = {
          name: fv.name || "",
          email: fv.email,
          mobile: `+91${fv.mobile}`,
          amount: order.amount / 100,
          programm_date: PROGRAMME.date,
          razorpay_order_id: response.razorpay_order_id || "",
          razorpay_payment_id: response.razorpay_payment_id || "",
          razorpay_signature: response.razorpay_signature || "",
          payment_status: "paid",
          captured: response.captured || "",
          page_name: PROGRAMME.pageName,
          ip_address: ipAddress,
          utm_source: getUTM("utm_source"),
          utm_medium: getUTM("utm_medium"),
          utm_campaign: getUTM("utm_campaign"),
          utm_term: getUTM("utm_term"),
          utm_content: getUTM("utm_content"),
        };

        // 4. Send WhatsApp
        await sendWhatsApp(`91${fv.mobile}`, fv.name, PROGRAMME.razorpay.amount);

        // 5. Send to Google Sheet
        const params = new URLSearchParams();
        Object.entries(apiPayload).forEach(([k, v]) =>
          params.append(k, String(v ?? ""))
        );
        await submitToGoogleSheet(params);

        // 6. Store payment details for response page
        try {
          localStorage.setItem("PaymentDetails", JSON.stringify(apiPayload));
        } catch {
          /* storage unavailable */
        }

        // 7. Redirect to thank-you
        window.location.href = "/thank-you";
      },
    };

    const razor = new window.Razorpay(options);

    // NOTE: For UPI QR payments, 'payment.failed' can fire before actual
    // payment confirmation arrives. Add a short delay so the handler() has
    // a chance to run first if payment actually succeeded.
    razor.on("payment.failed", (failedResponse: unknown) => {
      console.warn("Razorpay payment.failed:", failedResponse);
      setTimeout(() => {
        router.replace("/error");
      }, 2000);
    });

    razor.open();
  }

  /* ---- Render ---- */
  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/* Registration Form                                                   */}
      {/* ------------------------------------------------------------------ */}
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <Field
          id="contact-name"
          name="name"
          label="Full Name"
          placeholder="Your full name"
          value={values.name}
          error={touched.name ? errors.name : undefined}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Field
          id="contact-email"
          name="email"
          type="email"
          label="Email Address"
          placeholder="you@example.com"
          value={values.email}
          error={touched.email ? errors.email : undefined}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {/* Mobile with +91 prefix */}
        <div>
          <label
            htmlFor="contact-mobile"
            className="eyebrow mb-2 block !text-vls-muted"
          >
            Mobile Number
          </label>
          <div className="flex">
            <span className="flex h-12 items-center border border-r-0 border-vls-border bg-[var(--vls-input-bg)] px-3 text-[14px] text-vls-muted select-none">
              +91
            </span>
            <input
              id="contact-mobile"
              name="mobile"
              type="tel"
              placeholder="98765 43210"
              value={values.mobile}
              onChange={handleChange}
              onBlur={handleBlur}
              maxLength={10}
              aria-invalid={Boolean(touched.mobile && errors.mobile)}
              aria-describedby={
                touched.mobile && errors.mobile
                  ? "contact-mobile-error"
                  : undefined
              }
              className="h-12 min-w-0 flex-1 border border-vls-border bg-[var(--vls-input-bg)] px-3 text-[16px] text-vls-black placeholder:text-vls-muted focus:border-vls-red focus:outline-none"
            />
          </div>
          {touched.mobile && errors.mobile && (
            <p id="contact-mobile-error" className="mt-1 text-[13px] text-vls-red">
              {errors.mobile}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="mt-2 h-12 bg-vls-red text-[14px] font-bold text-vls-white transition-colors duration-150 ease-out hover:bg-vls-red-dark"
        >
          Reserve Your Seat — ₹499
        </button>
      </form>

      {/* ------------------------------------------------------------------ */}
      {/* Payment Instruction Popup                                           */}
      {/* ------------------------------------------------------------------ */}
      {instructionOpen && (
        <Popup onClose={() => setInstructionOpen(false)}>
          <h3 className="font-serif text-[20px] font-medium text-vls-black">
            Before You Pay
          </h3>
          <ul className="mt-4 space-y-3 text-[14px] text-vls-muted">
            <li className="flex gap-2">
              <span className="mt-0.5 shrink-0 text-vls-gold">⚠</span>
              Wait until you are redirected to the confirmation page after
              payment.
            </li>
            <li className="flex gap-2">
              <span className="mt-0.5 shrink-0 text-vls-gold">⚠</span>
              Do not close or refresh the tab while the payment is processing.
            </li>
            <li className="flex gap-2">
              <span className="mt-0.5 shrink-0 text-vls-gold">⚠</span>
              Closing the window during payment may prevent your registration
              from being recorded.
            </li>
          </ul>

          <label className="mt-6 flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              id="agree-checkbox"
              className="mt-0.5 h-4 w-4 accent-vls-red"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
            <span className="text-[14px] text-vls-black">
              I understand and agree.
            </span>
          </label>

          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={() => setInstructionOpen(false)}
              className="flex-1 h-11 border border-vls-border text-[13px] font-semibold text-vls-muted hover:bg-vls-card transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!agree}
              onClick={openRazorpay}
              className="flex-1 h-11 bg-vls-red text-[13px] font-bold text-vls-white transition-colors hover:bg-vls-red-dark disabled:opacity-40 disabled:cursor-not-allowed"
            >
              I Agree &amp; Pay
            </button>
          </div>
        </Popup>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Processing Popup                                                    */}
      {/* ------------------------------------------------------------------ */}
      {processing && (
        <Popup>
          <div className="flex flex-col items-center gap-4 py-4 text-center">
            <Spinner />
            <p className="font-serif text-[18px] font-medium text-vls-black">
              Processing your registration…
            </p>
            <p className="text-[13px] text-vls-muted">
              Please do not close or refresh this page.
            </p>
          </div>
        </Popup>
      )}
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Field sub-component                                                        */
/* -------------------------------------------------------------------------- */

function Field({
  id,
  name,
  label,
  placeholder,
  type = "text",
  value,
  error,
  onChange,
  onBlur,
}: {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow mb-2 block !text-vls-muted">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className="h-12 w-full border border-vls-border bg-[var(--vls-input-bg)] px-3 text-[16px] text-vls-black placeholder:text-vls-muted focus:border-vls-red focus:outline-none"
      />
      {error && (
        <p id={`${id}-error`} className="mt-1 text-[13px] text-vls-red">
          {error}
        </p>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Popup overlay                                                              */
/* -------------------------------------------------------------------------- */

function Popup({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose?: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-white p-7 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 text-vls-muted hover:text-vls-black text-xl leading-none"
          >
            ×
          </button>
        )}
        {children}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Spinner                                                                    */
/* -------------------------------------------------------------------------- */

function Spinner() {
  return (
    <svg
      className="animate-spin"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
    >
      {/* Background track */}
      <circle
        cx="20"
        cy="20"
        r="16"
        stroke="var(--vls-border)"
        strokeWidth="4"
      />
      {/* Spinning arc */}
      <path
        d="M20 4 a16 16 0 0 1 16 16"
        stroke="var(--vls-red)"
        strokeWidth="4"
        strokeLinecap="butt"
      />
    </svg>
  );
}

