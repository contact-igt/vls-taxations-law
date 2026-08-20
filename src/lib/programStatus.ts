import { PROGRAMME } from "./constants";

export const PRICE_ANNOUNCEMENT_TEXT = "Price will be announced shortly.";
export const DATE_TIME_ANNOUNCEMENT_TEXT = "Date and time will be announced shortly.";

export interface ProgramConfig {
  sessionStatus?: "announced" | "tba" | string;
  classStartAt?: string;
  date?: string;
  schedule?: string;
  fee?: number;
  [key: string]: unknown;
}

/**
 * Returns true only when:
 *  - sessionStatus === "announced"
 *  - classStartAt is a valid future date
 */
export function isRegistrationOpen(config: ProgramConfig = PROGRAMME): boolean {
  if (config?.sessionStatus !== "announced") return false;
  if (!config?.classStartAt) return false;

  const classStartDate = new Date(config.classStartAt);
  if (Number.isNaN(classStartDate.getTime())) return false;

  return new Date() < classStartDate; // true = open, false = waitlist
}

/** Inverse of isRegistrationOpen */
export function isWaitlistMode(config: ProgramConfig = PROGRAMME): boolean {
  return !isRegistrationOpen(config);
}

/** Returns "Register Here" or "Join Waitlist" */
export function getPrimaryCtaText(config: ProgramConfig = PROGRAMME): string {
  return isRegistrationOpen(config) ? "Register Here" : "Join Waitlist";
}

/**
 * Returns the provided fallback text (e.g. "Reserve Your Seat — ₹499") when open,
 * or "Join Waitlist" when in waitlist mode.
 */
export function getSectionCtaText(
  config: ProgramConfig = PROGRAMME,
  fallback = "Reserve Your Seat — ₹499"
): string {
  return isRegistrationOpen(config) ? fallback : "Join Waitlist";
}

/** Returns the session date+time string, or announcement text in waitlist mode */
export function getSessionDisplay(config: ProgramConfig = PROGRAMME): string {
  if (!isRegistrationOpen(config)) return DATE_TIME_ANNOUNCEMENT_TEXT;

  return config?.sessionStatus === "announced" && config?.schedule
    ? config.schedule
    : DATE_TIME_ANNOUNCEMENT_TEXT;
}
