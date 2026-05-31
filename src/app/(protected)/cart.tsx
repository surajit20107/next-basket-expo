import { authClient } from "@/lib/auth-client";
import type { CartItem } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { toast } from "sonner-native";

export default function CartPage() {
  const { data } = authClient.useSession();

  if (!data?.user) {
    router.replace("/login");
    return;
  }

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  const subtotal =
    cartItems?.reduce((sum, item) => sum + (item.totalPrice || 0), 0) || 0;
  const tax = subtotal * 0.08; // 8% tax example
  const shipping = subtotal > 500 ? 0 : 9.99; // Free shipping over rs 500
  const total = subtotal + tax + shipping;

  const fetchUserCart = async () => {
    if (!data.user) return;
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.EXPO_PUBLIC_BASE_URL}/api/cart?userId=${data?.user.id}`,
      );
      if (res.status === 200) {
        const data = await res.json();
        setCartItems(data.userCart);
      } else {
        toast.error("Failed to fetch cart items.");
      }
    } catch (error) {
      toast.error("Failed to fetch cart items.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserCart();
  }, [data?.user?.id]);

  const updateQuantity = async (productId: string, delta: number) => {
    if (!data.user) return;
    const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;
    try {
      const endpoint =
        delta > 0
          ? `${baseUrl}/api/cart/increment`
          : `${baseUrl}/api/cart/decrement`;
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: data.user.id,
          productId,
        }),
      });
      if (!res.ok) {
        console.error("Server error:", res.status);
        return;
      }
      const resData = await res.json();
      const updatedQty = resData.quantity;

      setCartItems((prev) =>
        prev.map((item) =>
          item.productId._id === productId
            ? {
                ...item,
                quantity: updatedQty,
                totalPrice: item.productId.price * updatedQty,
              }
            : item,
        ),
      );
    } catch (error) {
      console.log("Error updateing quantity:", (error as Error)?.message);
      toast.error("Failed to update quantity, Try again later.");
    }
  };

  const removeFromCart = async (productId: string) => {
    if (!data.user) return;
    try {
      const res = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}/api/cart`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: data?.user?.id,
          productId,
        }),
      });
      if (res.status === 200) {
        setCartItems(
          cartItems?.filter(
            (item) => item.productId._id !== productId,
          ) as CartItem[],
        );
      } else {
        toast.error("Failed to remove. Try again later");
      }
    } catch (error) {
      console.log("Error deleting item:", (error as Error)?.message);
      toast.error("Failed to remove. Try again later");
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>My Cart</Text>
        <Text style={styles.subtitle}>{cartItems?.length} Items</Text>
      </View>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 180,
        }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{ uri: item?.productId?.image }}
              style={styles.image}
            />

            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.productName}>
                {item?.productId?.name}
              </Text>

              <Text style={styles.price}>₹{item?.totalPrice.toFixed(2)}</Text>

              <View style={styles.bottomRow}>
                <View style={styles.quantityContainer}>
                  <Pressable style={styles.quantityButton} onPress={()=> updateQuantity(item.productId._id, -1)}>
                    <Ionicons name="remove" size={16} color="#111827" />
                  </Pressable>

                  <Text style={styles.quantityText}>{item?.quantity}</Text>

                  <Pressable style={styles.quantityButton} onPress={()=> updateQuantity(item.productId._id, 1)}>
                    <Ionicons name="add" size={16} color="#111827" />
                  </Pressable>
                </View>

                <Pressable
                  style={styles.deleteButton}
                  onPress={() => removeFromCart(item.productId._id)}
                >
                  <Ionicons name="trash-outline" size={18} color="#ef4444" />
                </Pressable>
              </View>
            </View>
          </View>
        )}
      />

      {cartItems?.length && (
        <View style={styles.checkoutContainer}>
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>₹{subtotal?.toFixed(2)}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tax (8%)</Text>
              <Text style={styles.summaryValue}>₹{tax?.toFixed(2)}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Shipping</Text>
              <Text style={styles.summaryValue}>
                {shipping === 0 ? "Free" : `₹${shipping?.toFixed(2)}`}
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>Total</Text>
              <Text style={styles.totalAmount}>₹{total?.toFixed(2)}</Text>
            </View>

            <Pressable style={styles.checkoutButton}>
              <View>
                <Text style={styles.checkoutSmallText}>Pay Now</Text>
                <Text style={styles.checkoutAmount}>₹{total?.toFixed(2)}</Text>
              </View>

              <Ionicons name="arrow-forward-circle" size={28} color="#fff" />
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    paddingHorizontal: 16,
    paddingTop: 18,
  },

  headerContainer: {
    marginBottom: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#111827",
    letterSpacing: -1,
  },

  subtitle: {
    fontSize: 15,
    color: "#6b7280",
    marginTop: 4,
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 14,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },

  image: {
    width: 105,
    height: 105,
    borderRadius: 18,
    backgroundColor: "#f3f4f6",
  },

  content: {
    flex: 1,
    marginLeft: 14,
    justifyContent: "space-between",
  },

  productName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
  },

  price: {
    fontSize: 18,
    fontWeight: "800",
    color: "#6d28d9",
    marginTop: 4,
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    borderRadius: 14,
    paddingHorizontal: 6,
    paddingVertical: 4,
    gap: 10,
  },

  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  quantityText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },

  deleteButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#fef2f2",
    justifyContent: "center",
    alignItems: "center",
  },

  checkoutContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 22,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 10,
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  totalLabel: {
    fontSize: 14,
    color: "#6b7280",
  },

  totalPrice: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111827",
    marginTop: 2,
  },

  checkoutButton: {
    backgroundColor: "#111827",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },

  checkoutText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },

  summaryContainer: {
    gap: 12,
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  summaryLabel: {
    fontSize: 15,
    color: "#6b7280",
    fontWeight: "500",
  },

  summaryValue: {
    fontSize: 15,
    color: "#111827",
    fontWeight: "600",
  },

  divider: {
    height: 1,
    backgroundColor: "#e5e7eb",
    marginVertical: 4,
  },

  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
    marginBottom: 8,
  },

  checkoutSmallText: {
    color: "#9ca3af",
    fontSize: 12,
  },

  checkoutAmount: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
  },

  totalText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  totalAmount: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111827",
  },
});
