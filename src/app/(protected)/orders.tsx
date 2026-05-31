import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner-native";
import type { OrderProduct } from "@/types";

export default function OrdersPage() {
  const { data: session } = authClient.useSession();

  const [orders, setOrders] = useState<OrderProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
  if (!session?.user?.id) return

  try {
    setLoading(true);
    const url = `${process.env.EXPO_PUBLIC_BASE_URL}/api/order?userId=${session.user.id}`;
    const res = await fetch(url);
    const text = await res.text();

    if (!res.ok) {
      toast.error(`API Error: ${res.status}`);
      return;
    }

    const data = JSON.parse(text);
    const products = data.flatMap((order: any) => order.products);

    setOrders(products);
  } catch (error) {
    console.log("Fetch Error:", error);
    toast.error("Failed to fetch orders");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchOrders();
  }, [session?.user?.id]);

  if (!session?.user) {
    return null;
  }

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={orders}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image
            source={{ uri: item.product.image }}
            style={styles.image}
          />

          <View style={{ flex: 1 }}>
            <Text style={styles.name}>
              {item.product.name}
            </Text>

            <Text style={styles.price}>
              ₹{item.product.price}
            </Text>

            <Text style={styles.quantity}>
              Quantity: {item.quantity}
            </Text>

            <Text style={styles.status}>
              Ordered
            </Text>
          </View>
        </View>
      )}
      ListEmptyComponent={
        <Text style={{ textAlign: "center", marginTop: 50 }}>
          No orders found
        </Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f8fafc",
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 12,
    marginBottom: 12,
    flexDirection: "row",
    gap: 12,
  },

  image: {
    width: 90,
    height: 90,
    borderRadius: 14,
  },

  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },

  price: {
    marginTop: 6,
    fontWeight: "700",
    color: "#6d28d9",
  },

  quantity: {
    marginTop: 4,
    color: "#6b7280",
  },

  status: {
    marginTop: 8,
    color: "#16a34a",
    fontWeight: "600",
  },
});
