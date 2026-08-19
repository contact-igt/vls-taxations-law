import { ResponsePageWrapper } from "@/components/ResponsePage";

/**
 * Dynamic route for /thank-you and /error.
 * params is a Promise in Next.js 16 App Router — unwrapped inside the
 * client component via React 19 use().
 */
export default function ResponseRoute({
  params,
}: {
  params: Promise<{ response: string }>;
}) {
  return <ResponsePageWrapper params={params} />;
}
