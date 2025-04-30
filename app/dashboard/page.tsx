// app/dashboard/page.tsx
import { getServerSession } from "next-auth";
import DashboardClient from "./dashboard-client";
import { authOptions } from "../lib/auth/options";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <p className="p-10 text-red-500">Access Denied</p>;
  }

  return <DashboardClient email={session.user?.email ?? "User"} />;
}
