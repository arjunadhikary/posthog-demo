"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;

  return (
    <button onClick={() => (session ? signOut() : signIn())}>
      {session ? "Logout" : "Login"}
    </button>
  );
}
