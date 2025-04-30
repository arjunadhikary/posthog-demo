"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm space-y-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign in</h2>

        <button
          onClick={() => signIn("github", { callbackUrl })}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
        >
          Sign in with GitHub
        </button>

        <button
          onClick={() => signIn("google", { callbackUrl })}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
