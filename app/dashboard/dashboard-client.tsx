"use client";

import posthog from "@/posthog.config";
import { useEffect } from "react";

export default function DashboardClient({ email }: { email: string }) {
  useEffect(() => {
    posthog.capture("dashboard_loaded", { email });
  }, [email]);

  return (
    <main className="p-10 max-w-4xl mx-auto">
      <h1 className="text-xl">Welcome, {email}</h1>

      <h1 className="text-3xl font-bold mb-6">📊 Insightly Dashboard</h1>

      <div className="flex flex-col w-full gap-5 max-w-3xl">
        <button
          onClick={() => {
            posthog.capture("clicked_big_button");
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer"
        >
          Fire Event
        </button>

        <button
          onClick={() => {
            throw new Error("Oops! Unexpected error");
          }}
          className="bg-red-600 text-white px-4 py-2 rounded-md cursor-pointer"
        >
          Trigger Error
        </button>
      </div>
    </main>
  );
}
