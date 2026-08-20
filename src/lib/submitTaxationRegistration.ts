/**
 * Resolves the Invictus backend base URL from NEXT_PUBLIC_API_SERVER
 * ("production" | "stage" | "localhost"), matching the *_API_URL env vars
 * already defined in this project's .env. Each of those already includes
 * the /api/v1 prefix.
 */
function resolveApiBase(): string {
  const target = (process.env.NEXT_PUBLIC_API_SERVER || "localhost").toLowerCase();

  if (target === "production") {
    return process.env.NEXT_PUBLIC_PRODUCTION_API_URL || "";
  }
  if (target === "stage") {
    return process.env.NEXT_PUBLIC_STAGE_API_URL || "";
  }
  return process.env.NEXT_PUBLIC_LOCALHOST_API_URL || "http://localhost:8000/api/v1";
}

const registerEndpoint = `${resolveApiBase()}/vls-taxation-law/register`;
const clientKey = process.env.NEXT_PUBLIC_CLIENT_KEY || "vls_law";

export interface TaxationRegistrationPayload {
  name: string;
  email: string;
  mobile: string;
  amount: number;
  programm_date: string;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  payment_status: string;
  captured?: boolean;
  page_name: string;
  ip_address: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
}

export async function submitTaxationRegistration(
  payload: TaxationRegistrationPayload
): Promise<unknown> {
  const response = await fetch(registerEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Client-Key": clientKey,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let errorMessage = "Unable to submit registration";

    try {
      const data = await response.json();
      errorMessage = data?.message || data?.error || errorMessage;
    } catch {
      // Keep the fallback message when the response body is not JSON.
    }

    throw new Error(errorMessage);
  }

  return response.json();
}
