// --- app/ab-test/page.tsx (Feature flags with progressive rollout, targeting, kill switch) ---
"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import posthog from "@/posthog.config";

export default function ABTestPage() {
  const [variant, setVariant] = useState<"control" | "variantA" | "off">(
    "control"
  );
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.email) {
      posthog.identify(session.user.email, {
        email: session.user.email,
        subscription: "beta",
        location: "EU",
        team: "internal",
      });
    }

    posthog.onFeatureFlags(() => {
      const flag = posthog.getFeatureFlag("new-headline");
      if (flag === "off") setVariant("off");
      else if (flag === "A") setVariant("variantA");
      else setVariant("control");
    });
  }, [session]);

  return (
    <main className="p-10">
      {variant === "off" ? (
        <div className="text-gray-500">🚫 Feature disabled (Kill Switch)</div>
      ) : (
        <>
          <h1 className="text-2xl font-bold">
            {variant === "variantA"
              ? "🚀 Welcome to the New UI!"
              : "👋 Welcome to the Classic Experience"}
          </h1>
          <p className="text-gray-600 mt-2">
            Feature Flags with PostHog: progressive rollout, user targeting, and
            kill switch.
          </p>
        </>
      )}
    </main>
  );
}
