import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";

const orders = [
  {
    _id: "1",
    name: "Room Decor Painting",
    price: 590,
    image:
      "https://res.cloudinary.com/dwlfhknvs/image/upload/v1779971633/photo-1776193550369-3f9c6077b205_qhe5cs.jpg",
  },
  {
    _id: "2",
    name: "Sports Shoes",
    price: 499,
    image:
      "https://res.cloudinary.com/dwlfhknvs/image/upload/v1779973347/photo-1779122873880-b2aa20d95e6c_etadyy.jpg",
  },
  {
    _id: "3",
    name: "Facial Cleanup",
    price: 799,
    image:
      "https://res.cloudinary.com/dwlfhknvs/image/upload/v1779973481/photo-1779142077668-fe26a95f459c_ejxevz.jpg",
  },
  {
    _id: "4",
    name: "Mouse & Keyboard",
    price: 1299,
    image:
      "https://res.cloudinary.com/dwlfhknvs/image/upload/v1779980393/photo-1776824224280-13c38adbb6ee_vdtle5.jpg",
  },
];

export default function OrdersPage() {
  return (
    <FlatList
      style={styles.container}
      data={orders}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image
            source={{ uri: item.image }}
            style={styles.image}
          />

          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>₹{item.price}</Text>
            <Text style={styles.status}>
              Delivered
            </Text>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    padding: 16,
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

  status: {
    marginTop: 8,
    color: "#16a34a",
    fontWeight: "600",
  },
});
