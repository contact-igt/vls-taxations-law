"use client";

import { Suspense } from "react";
import { useUTMSource } from "@/lib/useUTMSource";

/**
 * Tiny client component that runs the UTM hook globally.
 * Wrapped in Suspense because useSearchParams() requires it in App Router.
 */
function UTMTrackerInner() {
  useUTMSource();
  return null;
}

export function UTMTracker() {
  return (
    <Suspense fallback={null}>
      <UTMTrackerInner />
    </Suspense>
  );
}
