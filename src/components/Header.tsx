import { StyleSheet, Text, View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { authClient } from "@/lib/auth-client";

export function Header() {
  const handleLogout = async () => {
    await authClient.signOut()
    router.replace('/login')
  }
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.logo}>
          Next<Text style={styles.logoAccent}>Basket</Text>
        </Text>

        <View style={styles.actions}>
          <Link href="/cart" asChild>
            <Pressable style={styles.iconWrapper}>
              <Ionicons name="bag-handle-outline" size={22} color="#111" />
            </Pressable>
          </Link>

          <Pressable style={styles.iconWrapper} onPress={handleLogout}>
            <Ionicons name="grid-outline" size={21} color="#111" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#f8fafc",
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 10,
  },

  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  logo: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111827",
    letterSpacing: -1,
  },

  logoAccent: {
    color: "#6d28d9",
  },

  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  iconWrapper: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
});