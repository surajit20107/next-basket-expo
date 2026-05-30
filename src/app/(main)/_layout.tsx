import { Stack } from "expo-router";
import { Header } from "@/components/Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View } from "react-native";

export default function RootLayout() {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <Stack screenOptions={{ header: () => <Header /> }} />
    </View>
  )
}
