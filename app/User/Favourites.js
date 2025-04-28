import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, doc, getDocs, deleteDoc } from "firebase/firestore";
import { db , auth  } from "../../firebase";



const FavoriteScreen = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      fetchFavorites();
    }
  }, [user]);

  const fetchFavorites = async () => {
    if (!user) return;

    setLoading(true);
    const favRef = collection(db, "users", user.uid, "fav");
    const snapshot = await getDocs(favRef);

    const favItems = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    setFavorites(favItems);
    setLoading(false);
  };

  const removeFavorite = async (id) => {
    if (!user) return;

    const itemRef = doc(db, "users", user.uid, "fav", id);
    await deleteDoc(itemRef);
    fetchFavorites();
  };


  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
     
      <Text style={styles.header}>Favorites</Text>

      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.favoriteItem}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.details}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.price}>EGP {item.price}</Text>
            </View>
            <TouchableOpacity onPress={() => removeFavorite(item.id)} style={styles.deleteButton}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />

      {favorites.length === 0 && (
        <Text style={styles.emptyFavorites}>You have no favorite products.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f0f0f0",
      paddingHorizontal: 20,
      paddingTop: 50,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f0f0f0",
    },
    header: {
      fontSize: 26,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 20,
      color: "#333",
    },
    backButton: {
      position: "absolute",
      top: 40,
      left: 20,
      zIndex: 1,
      backgroundColor: "#fff",
      padding: 8,
      borderRadius: 50,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
    },
    favoriteItem: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#fff",
      padding: 12,
      borderRadius: 12,
      marginBottom: 15,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
    },
    image: {
      width: 80,
      height: 80,
      borderRadius: 10,
      resizeMode: "cover",
      backgroundColor: "#e0e0e0",
    },
    details: {
      flex: 1,
      marginLeft: 15,
      justifyContent: "center",
    },
    itemName: {
      fontSize: 16,
      fontWeight: "600",
      color: "#222",
      marginBottom: 6,
    },
    price: {
      fontSize: 14,
      fontWeight: "bold",
      color: "#FF5722",
    },
    deleteButton: {
      padding: 8,
      backgroundColor: "#ffe6e6",
      borderRadius: 30,
      alignItems: "center",
      justifyContent: "center",
    },
    emptyFavorites: {
      textAlign: "center",
      fontSize: 18,
      color: "gray",
      marginTop: 50,
      fontWeight: "500",
    },
  });
  
export default FavoriteScreen;
