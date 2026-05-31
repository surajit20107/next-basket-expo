import { authClient } from "@/lib/auth-client";
import type { OrderProduct } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { toast } from "sonner-native";

export default function ProfilePage() {
  const { data: session } = authClient.useSession();
  if (!session?.user) return;

  const [loading, setLoading] = useState(true);
  const [recentOrders, setRecentOrders] = useState<OrderProduct[]>([]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const url = `${process.env.EXPO_PUBLIC_BASE_URL}/api/order?userId=${session?.user.id}`;
      const res = await fetch(url);
      const text = await res.text();

      if (!res.ok) {
        toast.error(`API Error: ${res.status}`);
        return;
      }

      const data = JSON.parse(text);
      const products = data.flatMap((order: any) => order.products);

      setRecentOrders(products);
    } catch (error) {
      console.log("Fetch Error:", error);
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleLogout = async () => {
    await authClient.signOut();
    toast.success("Logged out");
    router.replace("/login");
  };

  if (loading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {session?.user.image || session?.user?.name[0].toUpperCase()}
          </Text>
        </View>

        <Text style={styles.name}>{session?.user.name}</Text>
        <Text style={styles.email}>{session?.user.email}</Text>

        <View style={styles.addressBox}>
          <Ionicons name="location-outline" size={18} color="#6d28d9" />
          <Text style={styles.address}>221B Baker Street, London, UK</Text>
        </View>
      </View>

      <View style={styles.actionContainer}>
        <Pressable
          style={styles.primaryButton}
          onPress={() => router.push("/orders")}
        >
          <Ionicons name="receipt-outline" size={18} color="#fff" />
          <Text style={styles.primaryButtonText}>View All Orders</Text>
        </Pressable>

        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={18} color="#ef4444" />
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent Orders</Text>
        <Text style={styles.sectionSubtitle}>Last 2 purchases</Text>
      </View>

      <FlatList
        // first reverse make last order on top
        // splice takes 2 from top
        // since its reversed so the top one on 2nd
        // 2nd reverse make the 1st at top again
        data={recentOrders.reverse().splice(2).reverse()}
        scrollEnabled={false}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.orderCard}>
            <Image
              source={{ uri: item.product.image }}
              style={styles.orderImage}
            />

            <View style={{ flex: 1 }}>
              <Text style={styles.orderName} numberOfLines={1}>
                {item.product.name}
              </Text>

              <Text style={styles.orderPrice}>₹{item.product.price}</Text>
            </View>

            <View style={styles.completedBadge}>
              <Text style={styles.completedText}>Delivered</Text>
            </View>
          </View>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },

  profileCard: {
    alignItems: "center",
    padding: 24,
    margin: 16,
    backgroundColor: "#fff",
    borderRadius: 24,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#6d28d9",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "700",
  },

  name: {
    marginTop: 16,
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
  },

  email: {
    marginTop: 4,
    color: "#6b7280",
  },

  addressBox: {
    flexDirection: "row",
    marginTop: 16,
    backgroundColor: "#f3f4f6",
    padding: 12,
    borderRadius: 14,
    gap: 8,
  },

  address: {
    color: "#374151",
    flex: 1,
  },

  actionContainer: {
    paddingHorizontal: 16,
    gap: 12,
  },

  primaryButton: {
    backgroundColor: "#111827",
    padding: 16,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  primaryButtonText: {
    color: "#fff",
    fontWeight: "700",
  },

  logoutButton: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  logoutText: {
    color: "#ef4444",
    fontWeight: "700",
  },

  sectionHeader: {
    paddingHorizontal: 16,
    marginTop: 28,
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },

  sectionSubtitle: {
    color: "#6b7280",
    marginTop: 4,
  },

  orderCard: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 18,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  orderImage: {
    width: 70,
    height: 70,
    borderRadius: 14,
  },

  orderName: {
    fontWeight: "600",
    fontSize: 16,
    color: "#111827",
  },

  orderPrice: {
    marginTop: 4,
    color: "#6d28d9",
    fontWeight: "700",
  },

  completedBadge: {
    backgroundColor: "#dcfce7",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },

  completedText: {
    color: "#15803d",
    fontSize: 12,
    fontWeight: "600",
  },
});
