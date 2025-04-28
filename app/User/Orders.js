import React from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";

const ordersData = [
  { id: "1", item: "Laptop", price: "$1200", status: "Shipped", image: "https://picsum.photos/100/100?random=1" },
  { id: "2", item: "Phone", price: "$800", status: "Processing", image: "https://picsum.photos/100/100?random=2" },
  { id: "3", item: "Headphones", price: "$150", status: "Delivered", image: "https://picsum.photos/100/100?random=3" },
  { id: "4", item: "Smartwatch", price: "$200", status: "Delivered", image: "https://picsum.photos/100/100?random=4" },
  { id: "5", item: "Keyboard", price: "$100", status: "Processing", image: "https://picsum.photos/100/100?random=5" },
  { id: "6", item: "Mouse", price: "$50", status: "Shipped", image: "https://picsum.photos/100/100?random=6" },
  { id: "7", item: "Tablet", price: "$600", status: "Delivered", image: "https://picsum.photos/100/100?random=7" },
  { id: "8", item: "Monitor", price: "$300", status: "Processing", image: "https://picsum.photos/100/100?random=8" },
];

const Orders = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Orders</Text>
      <FlatList
        data={ordersData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.orderItem}>
            <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
            <View style={styles.textContainer}>
              <Text style={styles.itemName}>{item.item}</Text>
              <Text style={styles.price}>{item.price}</Text>
              <Text style={styles.status}>Status: {item.status}</Text>
            </View>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5e1d2z",
    padding: 20,
    // paddingBottom: 80,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  orderItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  price: {
    fontSize: 16,
    color: "#333",
  },
  status: {
    fontSize: 14,
    color: "green",
    marginTop: 5,
  },
});

export default Orders;
