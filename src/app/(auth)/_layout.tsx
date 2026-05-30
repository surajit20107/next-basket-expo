import { Stack } from "expo-router";
import { View } from "react-native";
import { AuthHeader } from "@/components/AuthHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AuthLayout() {
    const  insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
        <Stack screenOptions={{ header: ()=> <AuthHeader /> }} />
    </View>
  )
}
