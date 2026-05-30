import type { ProductResponse } from "@/types";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner-native";
import { router } from "expo-router";

export function ProductCard() {
  const [product, setProduct] = useState<ProductResponse | null>(null);

  async function fetchProduct() {
    try {
      const res = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}/api/product`);

      if (!res.ok) {
        console.log(res);
      }

      const data = await res.json();
      setProduct(data);
    } catch (error) {
      console.log(error);
      Alert.alert("Error fetching product");
    }
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  const addProductToCart = async (productId: string) => {
    const { data } = await authClient.getSession()

    if (!data?.user) {
      router.replace('/login')
      return
    }

    const userId = data?.user?.id

    try {
      const res = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}/api/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, productId })
      })

      if (res.status === 200) {
        toast.success('Added to cart.')
      } else {
        toast.error('Something went wrong, Try agin later.')
      }

    } catch (error) {
      toast.error('Something went wrong, Try agin later.')
    }
  }

  return (
    <View style={{ paddingBottom: 64 }}>
      <FlatList
        data={product?.products}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 12 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{ uri: item.image }}
              style={styles.image}
              resizeMode="cover"
            />

            <View style={styles.contentContainer}>
              <View style={styles.headerRow}>
                <Text numberOfLines={1} style={styles.title}>
                  {item.name}
                </Text>

                <Text style={styles.price}>₹{item.price}</Text>
              </View>

              <Text numberOfLines={2} style={styles.description}>
                {item.description}
              </Text>

              <View style={styles.footerRow}>
                <View style={styles.ratingContainer}>
                  <Text style={styles.star}>★</Text>
                  <Text style={styles.rating}>{item.rating}</Text>
                </View>

                <Pressable onPress={()=>addProductToCart(item._id)}>
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>Add to Cart</Text>
                  </View>
                </Pressable>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 16,
    marginHorizontal: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },

  image: {
    width: "100%",
    height: 220,
  },

  contentContainer: {
    padding: 14,
    gap: 10,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    flex: 1,
    color: "#111827",
  },

  price: {
    fontSize: 18,
    fontWeight: "700",
    color: "#16a34a",
  },

  description: {
    fontSize: 14,
    lineHeight: 20,
    color: "#6b7280",
  },

  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },

  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    gap: 4,
  },

  star: {
    color: "#f59e0b",
    fontSize: 14,
  },

  rating: {
    fontWeight: "600",
    color: "#111827",
  },

  button: {
    backgroundColor: "#111827",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});
