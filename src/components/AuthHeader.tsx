import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export function AuthHeader() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.logo}>
          Next<Text style={styles.logoAccent}>Basket</Text>
        </Text>

        <View style={styles.actions}>
          <Link href="/" asChild>
            <Pressable style={styles.iconWrapper}>
              <Ionicons name="home" size={21} color="#111" />
            </Pressable>
          </Link>
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
