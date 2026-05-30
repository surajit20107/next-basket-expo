import { Redirect, Stack } from "expo-router";
import { authClient } from "@/lib/auth-client";

export default function ProtectedLayout() {
  const { data:session, isPending } = authClient.useSession()

  if (isPending) return null;

  if (!session) {
    return <Redirect href="/login" />
  }

  return <Stack />
}
