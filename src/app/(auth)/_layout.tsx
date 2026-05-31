import { AuthHeader } from "@/components/AuthHeader";
import { authClient } from "@/lib/auth-client";
import { router, Stack } from "expo-router";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AuthLayout() {
  const { data } = authClient.useSession()
  if (data?.user) {
    router.replace('/')
    return
  }
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <Stack screenOptions={{ header: () => <AuthHeader /> }} />
    </View>
  );
}
