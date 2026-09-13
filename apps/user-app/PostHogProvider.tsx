"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { initPostHog } from "./posthog-client";

// Boots PostHog on the client and ties events to the signed-in person.
export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const session = useSession();

  useEffect(() => {
    const posthog = initPostHog();
    if (!posthog) {
      return;
    }

    const user = session.data?.user as
      | { id?: string; email?: string; name?: string | null }
      | undefined;

    if (user?.id) {
      posthog.identify(user.id, {
        email: user.email,
        name: user.name,
      });
    } else if (session.status === "unauthenticated") {
      posthog.reset();
    }
  }, [session.data, session.status]);

  return <>{children}</>;
}
