import posthog from "posthog-js";

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST =
  process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

let initialized = false;

// Starts the PostHog browser SDK once, with exception capture on.
// The SDK is optional: without a key the app still boots. In development a
// missing key throws so the gap is visible; in production it stays a no-op.
export function initPostHog(): typeof posthog | null {
  if (typeof window === "undefined") {
    return null;
  }

  if (!POSTHOG_KEY) {
    if (process.env.NODE_ENV !== "production") {
      throw new Error(
        "NEXT_PUBLIC_POSTHOG_KEY variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once NEXT_PUBLIC_POSTHOG_KEY is configured",
      );
    }
    return null;
  }

  if (!initialized) {
    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      capture_exceptions: true,
    });
    initialized = true;
  }

  return posthog;
}
