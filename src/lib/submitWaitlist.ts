export type WaitlistLead = {
  fullName: string;
  email: string;
  mobile: string;
  yearsOfPractice: string;
};

/**
 * Placeholder submission adapter. No lead-capture backend/CRM is wired up yet —
 * swap this implementation for a real API call once one exists. It must not
 * pretend to deliver the lead anywhere; it only resolves so the UI can show a
 * client-side confirmation after validation passes.
 */
export async function submitWaitlistLead(lead: WaitlistLead): Promise<{ ok: true }> {
  void lead;
  return { ok: true };
}
