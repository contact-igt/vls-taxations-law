"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PROGRAMME } from "@/lib/constants";

interface PaymentDetails {
  name?: string;
  email?: string;
  mobile?: string;
  amount?: number;
  razorpay_payment_id?: string;
}

interface ResponsePageProps {
  /** The dynamic route segment — "thank-you" or "error" */
  response: string;
}

export function ResponsePage({ response }: ResponsePageProps) {
  const isSuccess = response === "thank-you";
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(
    null
  );
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = localStorage.getItem("PaymentDetails");
      if (stored) {
        setPaymentDetails(JSON.parse(stored));
      }
    } catch {
      localStorage.removeItem("PaymentDetails");
    }
    setReady(true);
  }, []);

  if (!ready) return null;

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-vls-off-white px-4 py-16">
      <div className="w-full max-w-lg text-center">
        {/* Icon */}
        <div className="flex justify-center">
          <Image
            src={
              isSuccess
                ? "/assets/Response/success.png"
                : "/assets/Response/error.png"
            }
            alt={isSuccess ? "Payment successful" : "Payment failed"}
            width={120}
            height={120}
            priority
            className="h-[120px] w-[120px] object-contain sm:h-[100px] sm:w-[100px]"
          />
        </div>

        {/* Heading */}
        <h1
          className={`mt-6 font-serif text-[32px] font-bold leading-tight sm:text-[28px] ${
            isSuccess ? "text-[#28a745]" : "text-vls-red"
          }`}
        >
          {isSuccess ? "Payment Successful" : "Payment Failed"}
        </h1>

        {/* Sub-message */}
        <p className="mt-3 text-[15px] leading-relaxed text-vls-muted">
          {isSuccess
            ? "Thank you for registering! Your seat for the Taxation Laws & Practice session on 28 August 2026 has been confirmed. You will receive joining details on WhatsApp and email shortly."
            : "We could not complete your payment. Please try again or contact our support team."}
        </p>

        {/* Transaction summary (success only, when PaymentDetails exist) */}
        {isSuccess && paymentDetails && (
          <div className="mt-8 border border-vls-border bg-white p-6 text-left">
            <p className="eyebrow mb-4">Transaction Summary</p>
            <dl className="divide-y divide-vls-border text-[14px]">
              {paymentDetails.name && (
                <Row label="Name" value={paymentDetails.name} />
              )}
              {paymentDetails.email && (
                <Row label="Email" value={paymentDetails.email} />
              )}
              {paymentDetails.mobile && (
                <Row label="Mobile" value={paymentDetails.mobile} />
              )}
              {paymentDetails.amount !== undefined && (
                <Row label="Amount" value={`₹${paymentDetails.amount}`} />
              )}
              {paymentDetails.razorpay_payment_id && (
                <Row
                  label="Transaction ID"
                  value={paymentDetails.razorpay_payment_id}
                  mono
                />
              )}
            </dl>
          </div>
        )}

        {/* CTA buttons */}
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center bg-vls-near-black px-8 text-[14px] font-bold text-vls-white transition-colors hover:bg-vls-black"
          >
            ← Back to Home
          </Link>

          {!isSuccess && (
            <a
              href={PROGRAMME.supportPhone}
              className="inline-flex h-12 items-center justify-center border border-vls-border px-8 text-[14px] font-bold text-vls-black transition-colors hover:bg-vls-card"
            >
              📞 Call Support
            </a>
          )}
        </div>
      </div>
    </main>
  );
}

/* ---- Small table row helper ---- */
function Row({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex justify-between gap-4 py-2.5">
      <dt className="font-semibold text-vls-black">{label}</dt>
      <dd
        className={`text-right text-vls-muted ${mono ? "font-mono text-[13px] break-all" : ""}`}
      >
        {value}
      </dd>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Dynamic page wrapper (used by app/[response]/page.tsx)                    */
/* -------------------------------------------------------------------------- */

/** Unwraps the async params Promise using React 19's `use()` */
export function ResponsePageWrapper({
  params,
}: {
  params: Promise<{ response: string }>;
}) {
  const { response } = use(params);
  return <ResponsePage response={response} />;
}
