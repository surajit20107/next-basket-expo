import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Pressable,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner-native";

const recentOrders = [
  {
    _id: "6a183c944300588d8d3d4fda",
    name: "Room Decor Painting",
    price: 590,
    image: "https://res.cloudinary.com/dwlfhknvs/image/upload/v1779971633/photo-1776193550369-3f9c6077b205_qhe5cs.jpg",
  },
  {
    _id: "6a183d194300588d8d3d4fdc",
    name: "Sports Shoes",
    price: 499,
    image: "https://res.cloudinary.com/dwlfhknvs/image/upload/v1779973347/photo-1779122873880-b2aa20d95e6c_etadyy.jpg",
  },
];

export default function ProfilePage() {
  const { data } = authClient.useSession();

  const handleLogout = async () => {
    await authClient.signOut()
    toast.success('Logged out')
    router.replace('/login')
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {data?.user.image || data?.user?.name[0].toUpperCase()}
          </Text>
        </View>

        <Text style={styles.name}>{data?.user.name}</Text>
        <Text style={styles.email}>{data?.user.email}</Text>

        <View style={styles.addressBox}>
          <Ionicons
            name="location-outline"
            size={18}
            color="#6d28d9"
          />
          <Text style={styles.address}>
            221B Baker Street, London, UK
          </Text>
        </View>
      </View>

      <View style={styles.actionContainer}>
        <Pressable
          style={styles.primaryButton}
          onPress={() => router.push("/orders")}
        >
          <Ionicons
            name="receipt-outline"
            size={18}
            color="#fff"
          />
          <Text style={styles.primaryButtonText}>
            View All Orders
          </Text>
        </Pressable>

        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons
            name="log-out-outline"
            size={18}
            color="#ef4444"
          />
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent Orders</Text>
        <Text style={styles.sectionSubtitle}>
          Last 2 purchases
        </Text>
      </View>

      <FlatList
        data={recentOrders}
        scrollEnabled={false}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.orderCard}>
            <Image
              source={{ uri: item.image }}
              style={styles.orderImage}
            />

            <View style={{ flex: 1 }}>
              <Text
                style={styles.orderName}
                numberOfLines={1}
              >
                {item.name}
              </Text>

              <Text style={styles.orderPrice}>
                ₹{item.price}
              </Text>
            </View>

            <View style={styles.completedBadge}>
              <Text style={styles.completedText}>
                Delivered
              </Text>
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
