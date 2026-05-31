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
import type { OrderResponse } from "@/types";

export default function OrdersPage() {
  const { data: session } = authClient.useSession();

  const [orders, setOrders] = useState<OrderResponse[]>([]);
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

    const data: OrderResponse[] = JSON.parse(text);
    setOrders(data);
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
  data={orders}
  keyExtractor={(item) => item._id}
  renderItem={({ item }) => {
    const firstProduct = item.products[0];

    return (
      <View style={styles.card}>
        <Image
          source={{ uri: firstProduct.product.image }}
          style={styles.image}
        />

        <View style={{ flex: 1 }}>
          <Text style={styles.name}>
            {firstProduct.product.name}
          </Text>

          <Text style={styles.price}>
            ₹{item.totalPrice}
          </Text>

          <Text style={styles.quantity}>
            Quantity: {firstProduct.quantity}
          </Text>

          <Text style={styles.status}>
            {item.status}
          </Text>
        </View>
      </View>
    );
  }}
/>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
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
