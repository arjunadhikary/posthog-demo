import { getServerSession } from "next-auth";
import Link from "next/link";
import { PostHog } from "posthog-node";
import { authOptions } from "./lib/auth/options";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  const posthog = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    host: "https://app.posthog.com",
  });

  const userId = session?.user?.id || "anonymous";
  const dashboardUrl = (await posthog.isFeatureEnabled(
    "new_dashboard_enabled",
    userId
  ))
    ? "/dashboard-v2"
    : "/dashboard";

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-gray-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-10">
        <h1 className="text-4xl font-bold mb-4 text-center">
          🎯 PostHog Demo Playground
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Explore real-life usage of PostHog: feature flags, error tracking, A/B
          testing, user analytics, and more — in a modern Next.js app.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={dashboardUrl}
            className="bg-black text-white px-6 py-3 rounded-xl text-lg hover:bg-gray-800 transition"
          >
            🚀 Open Demo Dashboard
          </Link>

          {session ? (
            <form action="/api/auth/signout" method="post">
              <button
                type="submit"
                className="border border-gray-400 px-6 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition"
              >
                🔓 Logout
              </button>
            </form>
          ) : (
            <form action="/api/auth/signin" method="post">
              <button
                type="submit"
                className="border border-gray-400 px-6 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition"
              >
                🔐 Login to Personalize
              </button>
            </form>
          )}
        </div>

        {session?.user?.email && (
          <div className="mt-6 text-center text-sm text-gray-500">
            Logged in as <strong>{session.user.email}</strong>
          </div>
        )}
      </div>
    </main>
  );
}
