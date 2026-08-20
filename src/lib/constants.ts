/**
 * Central constants for the Taxation Laws & Practice programme.
 * Update these values when programme details change.
 */

export const PROGRAMME = {
  /** "announced" = registration open (if classStartAt is future), "tba" = waitlist mode */
  sessionStatus: "announced" as "announced" | "tba",
  /** ISO 8601 timestamp with timezone — key field that controls waitlist switch */
  classStartAt: "2026-07-28T18:00:00+05:30",
  fee: 499,
  razorpay: {
    title: "Taxation Laws & Practice",
    amount: 499, // in INR (rupees)
  },
  /** ISO date of the session */
  date: "2026-08-28",
  /** Human-readable label used in the WhatsApp message */
  schedule: "Friday, August 28, 2026 6:00 PM – 9:00 PM IST",
  /** Name shown in the WhatsApp template */
  programmName: "3-hour Taxation Laws & Practice masterclass",
  /** Platform used for the session */
  platform: "Google Meet",
  /** Day the joining link will be sent, referenced in WhatsApp message */
  linkDate: "Thursday, 27 August",
  /** Slug sent to Google Sheet for filtering */
  pageName: "taxation-laws-practice",
  /** Support contact */
  supportPhone: "tel:+919500207811",
};

/** Google Apps Script deployment URL for the registration sheet */
export const GOOGLE_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbyMNzK8FMgAIO66tO2d-AYFqfdEtZNEE6DRycGSsaRH-E-uHjPLHyJw-6ThDgudKtBa/exec";
