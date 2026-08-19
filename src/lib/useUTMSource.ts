"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

/**
 * Reads UTM parameters from the URL search string and persists them in
 * localStorage so that the ContactForm can attach them to payment payloads.
 * Falls back to document.referrer for organic traffic.
 * Called once on mount — call this in layout or a client wrapper.
 */
export function useUTMSource() {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const source = searchParams.get("utm_source");

    if (source) {
      // Store all UTM values from the URL
      UTM_KEYS.forEach((key) => {
        const value = searchParams.get(key) || "none";
        try {
          localStorage.setItem(key, value);
        } catch {
          /* storage may be unavailable */
        }
      });
      return;
    }

    // Check referrer if no UTM params in URL
    const referrer = document.referrer;
    const hostname = window.location.hostname;
    if (
      !referrer ||
      referrer.includes(hostname) ||
      referrer.includes("localhost") ||
      referrer.includes("127.0.0.1")
    ) {
      // Direct traffic
      try {
        if (!localStorage.getItem("utm_source")) {
          localStorage.setItem("utm_source", "direct");
          localStorage.setItem("utm_medium", "none");
          localStorage.setItem("utm_campaign", "none");
          localStorage.setItem("utm_term", "none");
          localStorage.setItem("utm_content", "none");
        }
      } catch {
        /* storage may be unavailable */
      }
    } else {
      try {
        if (!localStorage.getItem("utm_source")) {
          localStorage.setItem("utm_source", referrer);
          localStorage.setItem("utm_medium", "referral");
          localStorage.setItem("utm_campaign", "none");
          localStorage.setItem("utm_term", "none");
          localStorage.setItem("utm_content", "none");
        }
      } catch {
        /* storage may be unavailable */
      }
    }
  }, [searchParams]);
}

/** Read a single UTM key from localStorage safely (client-side only) */
export function getUTM(key: (typeof UTM_KEYS)[number]): string {
  if (typeof window === "undefined") return "";
  try {
    return localStorage.getItem(key) || "";
  } catch {
    return "";
  }
}
