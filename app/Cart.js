import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, FlatList, Alert, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { router } from "expo-router";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, doc, getDocs, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { app } from "../firebase"; 
import { Ionicons } from '@expo/vector-icons';
const auth = getAuth(app);
const db = getFirestore(app);

const CartScreen = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser; 

  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [user]);

  const fetchCart = async () => {
    if (!user) return;
    
    setLoading(true);
    const cartRef = collection(db, "users", user.uid, "cart");
    const snapshot = await getDocs(cartRef);

    const cartItems = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setCart(cartItems);
    setLoading(false);
  };

  const updateCartItem = async (id, quantity) => {
    if (!user) return;

    const itemRef = doc(db, "users", user.uid, "cart", id);
    await updateDoc(itemRef, { quantity });
    fetchCart();
  };

  const removeItem = async (id) => {
    if (!user) return;

    const itemRef = doc(db, "users", user.uid, "cart", id);
    await deleteDoc(itemRef);
    fetchCart();
  };

  const removeAll = async () => {
    if (!user) return;

    Alert.alert("Confirm", "Are you sure you want to remove all items?", [
      { text: "Cancel", style: "cancel" },
      { text: "Yes", onPress: async () => {
        const cartRef = collection(db, "users", user.uid, "cart");
        const snapshot = await getDocs(cartRef);
        snapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref);
        });
        setCart([]);
      }},
    ]);
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingCost = cart.length > 0 ? 50 : 0;
  const total = subtotal + shippingCost;

  const handleBack = () => {
    router.back();
  };

  if (loading) {
    return  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <ActivityIndicator size="large" color="black" /></View>
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Icon name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.header}>Cart</Text>

      {cart.length > 0 && (
        <TouchableOpacity onPress={removeAll}>
          <Text style={styles.removeAll}>Remove All</Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.details}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.price}>EGP {item.price * item.quantity}</Text>
              <View style={styles.quantityControl}>
                <TouchableOpacity onPress={() => item.quantity > 1 && updateCartItem(item.id, item.quantity - 1)} style={styles.button}>
                  <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantity}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => updateCartItem(item.id, item.quantity + 1)} style={styles.button}>
                  <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity onPress={() => removeItem(item.id)} style={styles.deleteButton}>
            <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />

      {cart.length > 0 && (
        <>
          <View style={styles.summary}>
            <Text style={styles.summaryText}>Subtotal</Text>
            <Text style={styles.summaryText}>EGP {subtotal}</Text>
          </View>
          <View style={styles.summary}>
            <Text style={styles.summaryText}>Shipping Cost</Text>
            <Text style={styles.summaryText}>EGP {shippingCost}</Text>
          </View>
          <View style={styles.summary}>
            <Text style={styles.summaryTextBold}>Total</Text>
            <Text style={styles.summaryTextBold}>EGP {total}</Text>
          </View>

          <TouchableOpacity style={styles.checkoutButton}>
            <Text style={styles.checkoutText}>Checkout</Text>
          </TouchableOpacity>
        </>
      )}

      {cart.length === 0 && <Text style={styles.emptyCart}>Your cart is empty.</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F8F8", padding: 20 },
  header: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  removeAll: { fontSize: 14, color: "black", textAlign: "right", marginBottom: 10 },
  cartItem: { flexDirection: "row", alignItems: "center", backgroundColor: "#FFF", padding: 10, borderRadius: 10, marginBottom: 10 },
  image: { width: 90, height: 90, borderRadius: 5 , resizeMode: 'contain',},
  details: { flex: 1, marginLeft: 10 },
  itemName: { fontSize: 14, fontWeight: "bold" },
  price: { fontSize: 14, fontWeight: "bold", color: "#333" },
  quantityControl: { flexDirection: "row", alignItems: "center", marginTop: 5 },
  button: { width: 30, height: 30, backgroundColor: "#FAE5D3", borderRadius: 15, alignItems: "center", justifyContent: "center", marginHorizontal: 5 },
  buttonText: { fontSize: 18, fontWeight: "bold" },
  quantity: { fontSize: 16, fontWeight: "bold" },
  //deleteButton: { backgroundColor: "red", padding: 6, width: 30, height: 30, borderRadius: 15, alignItems: "center", justifyContent: "center" },
  deleteText: { color: "white", fontSize: 14, fontWeight: "bold" },
  summary: { flexDirection: "row", justifyContent: "space-between", marginVertical: 5 },
  summaryText: { fontSize: 14, color: "gray" },
  summaryTextBold: { fontSize: 16, fontWeight: "bold" },
  checkoutButton: { backgroundColor: "#FAE5D3", padding: 15, borderRadius: 20, alignItems: "center" },
  checkoutText: { fontSize: 16, fontWeight: "bold", color: "black" },
  emptyCart: { justifyContent: "center", textAlign: "center", fontSize: 16, color: "gray", marginTop: 20 },
});

export default CartScreen;
