import { View, Text, Pressable, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { router } from "expo-router";

export function GoogleLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async () => {
    setLoading(true);
    try {
        await authClient.signIn.social({
        provider: "google",
        callbackURL: "expoapp://",
      });
      // router.replace("/");
    } catch (error) {
		setError((error as Error)?.message || 'Something went wrong, Try again later.')
		console.log((error as Error)?.message)
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <Pressable style={[style.container, loading && style.disabled]} onPress={handleLogin} disabled={loading}>
        <Ionicons name="logo-google" size={20} color={"grey"} />
        <Text style={style.text}>Login with Google</Text>
      </Pressable>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
    height: 58,
    borderWidth: 0.4,
    borderColor: "#111827",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 6,
  },
  text: {
    color: "grey",
    fontSize: 16,
    fontWeight: "700",
  },
  disabled: {
	opacity: 0.5,
  }
});
