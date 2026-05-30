import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const cartItems = [
  {
    _id: "1",
    name: "Sports Shoes",
    price: 499,
    quantity: 1,
    image: "https://res.cloudinary.com/dwlfhknvs/image/upload/v1779973347/photo-1779122873880-b2aa20d95e6c_etadyy.jpg",
  },
  {
    _id: "2",
    name: "Room Decor Painting",
    price: 590,
    quantity: 2,
    image: "https://res.cloudinary.com/dwlfhknvs/image/upload/v1779971633/photo-1776193550369-3f9c6077b205_qhe5cs.jpg",
  },
];

export default function CartPage() {
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>My Cart</Text>
        <Text style={styles.subtitle}>
          {cartItems.length} Items
        </Text>
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
              source={{ uri: item.image }}
              style={styles.image}
            />

            <View style={styles.content}>
              <Text numberOfLines={1} style={styles.productName}>
                {item.name}
              </Text>

              <Text style={styles.price}>
                ₹{item.price}
              </Text>

              <View style={styles.bottomRow}>
                <View style={styles.quantityContainer}>
                  <Pressable style={styles.quantityButton}>
                    <Ionicons
                      name="remove"
                      size={16}
                      color="#111827"
                    />
                  </Pressable>

                  <Text style={styles.quantityText}>
                    {item.quantity}
                  </Text>

                  <Pressable style={styles.quantityButton}>
                    <Ionicons
                      name="add"
                      size={16}
                      color="#111827"
                    />
                  </Pressable>
                </View>

                <Pressable style={styles.deleteButton}>
                  <Ionicons
                    name="trash-outline"
                    size={18}
                    color="#ef4444"
                  />
                </Pressable>
              </View>
            </View>
          </View>
        )}
      />

      <View style={styles.checkoutContainer}>
        <View style={styles.totalRow}>
          <View>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalPrice}>
              ₹{total}
            </Text>
          </View>

          <Pressable style={styles.checkoutButton}>
            <Text style={styles.checkoutText}>
              Checkout
            </Text>
          </Pressable>
        </View>
      </View>
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
    paddingHorizontal: 28,
    paddingVertical: 16,
    borderRadius: 18,
  },

  checkoutText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
});
