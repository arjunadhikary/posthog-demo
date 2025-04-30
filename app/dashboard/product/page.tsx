"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFeatureFlagEnabled } from "posthog-js/react";

export default function ProductPage() {
  const router = useRouter();
  const flagEnabled = useFeatureFlagEnabled("new-product-page");

  useEffect(() => {
    if (!flagEnabled) {
      router.push("/");
    }
  }, [flagEnabled, router]);

  if (!flagEnabled) {
    return null;
  }

  return (
    <div className="h-full w-3xl flex mx-auto">
      <p className="w-full"> This is a new product we have</p>
    </div>
  );
}
