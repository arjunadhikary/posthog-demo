"use client";

import "./globals.css";
import { SessionProvider, useSession } from "next-auth/react";
import posthog from "../posthog.config";
import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";

function ErrorFallback({ error }: { error: Error }) {
  useEffect(() => {
    posthog.capture("frontend_error", {
      message: error.message,
      stack: error.stack,
      component: "global",
    });
  }, [error]);

  return (
    <div className="p-6 text-red-500">
      <p>Something went wrong.</p>
      <pre>{error.message}</pre>
    </div>
  );
}

function PostHogIdentify() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.email) {
      posthog.identify(session.user.email, {
        name: session.user.name,
        email: session.user.email,
      });
    }
  }, [session]);

  return null;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <PostHogIdentify />
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            {children}
          </ErrorBoundary>
        </SessionProvider>
      </body>
    </html>
  );
}
