import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { router } from "expo-router";
import { GoogleLogin } from "@/components/GoogleLogin";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await authClient.signIn.email({
        email,
        password,
        rememberMe: true,
      });
      console.log("success");
      router.replace("/");
    } catch (error) {
      console.log("Error logging in:", error);
      setError((error as Error)?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
      enableOnAndroid
      keyboardShouldPersistTaps="handled"
      extraScrollHeight={30}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          paddingHorizontal: 22,
          paddingBottom: 40,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <View style={styles.logoContainer}>
            <View style={styles.logoIcon}>
              <Ionicons name="bag-handle-outline" size={28} color="#fff" />
            </View>

            <Text style={styles.logoText}>
              Next<Text style={styles.logoAccent}>Basket</Text>
            </Text>
          </View>

          <View style={styles.headerContainer}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>
              Login to continue shopping smarter.
            </Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputWrapper}>
              <Ionicons name="mail-outline" size={18} color="#6b7280" />

              <TextInput
                placeholder="Email Address"
                placeholderTextColor="#9ca3af"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed-outline" size={18} color="#6b7280" />

              <TextInput
                placeholder="Password"
                placeholderTextColor="#9ca3af"
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <Pressable
              style={[
                styles.loginButton,
                loading && styles.loginButtonDisabled,
              ]}
              onPress={handleLogin}
              disabled={loading}
            >
              <Text style={styles.loginButtonText}>
                {loading ? "logging in..." : "Login"}
              </Text>
            </Pressable>
            <GoogleLogin />
          </View>

          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>Don't have an account?</Text>

            <Link href="/register" style={styles.signupText}>
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    // justifyContent: "center",
    // paddingHorizontal: 22,
  },

  card: {
    backgroundColor: "#ffffff",
    borderRadius: 28,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },

  logoContainer: {
    alignItems: "center",
    marginBottom: 28,
  },

  logoIcon: {
    width: 62,
    height: 62,
    borderRadius: 20,
    backgroundColor: "#6d28d9",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },

  logoText: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111827",
    letterSpacing: -1,
  },

  logoAccent: {
    color: "#6d28d9",
  },

  headerContainer: {
    marginBottom: 28,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: "#6b7280",
  },

  formContainer: {
    gap: 14,
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 58,
    gap: 10,
  },

  input: {
    flex: 1,
    color: "#111827",
    fontSize: 15,
    fontWeight: "500",
  },

  loginButton: {
    height: 58,
    borderRadius: 18,
    backgroundColor: "#111827",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 6,
  },

  loginButtonDisabled: {
    backgroundColor: "#1052e1",
    opacity: 0.5,
  },

  loginButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },

  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    marginTop: 24,
  },

  footerText: {
    color: "#6b7280",
    fontSize: 14,
  },

  signupText: {
    color: "#6d28d9",
    fontSize: 14,
    fontWeight: "700",
  },
});
