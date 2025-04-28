import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList , Dimensions} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Data from "../components/RealData";
import images from "../components/images";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon_2 from "react-native-vector-icons/Feather";
// import Icon_3 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon_3 from 'react-native-vector-icons/FontAwesome';
import { router, Stack } from 'expo-router';
const { width } = Dimensions.get('window');
const cardWidth = (width / 2) - 30;
import {db} from '../firebase';
import { collection, onSnapshot } from "firebase/firestore";

const DispalyCategories = () => {
  const { title } = useLocalSearchParams();
  console.log("Title:", title);
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      const usersData = snapshot.docs.map((doc) => ({
        docId: doc.id,
        ...doc.data(),
      }));
      setAllProducts(usersData);
      setProducts(usersData); 
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (title && allProducts.length > 0) {
      const filtered = allProducts.filter((item) =>
        item.category?.toLowerCase().includes(title.toLowerCase())
      );
      setProducts(filtered);
    }
  }, [title, allProducts]); 

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => router.push(`/${item.docId}`)}>
      <View style={styles.productCard}>
        <View style={{ position: 'relative', width: '100%', height: 120, left: 13 }}>
          <Image source={{uri:item.image}} style={styles.image} />
          <View style={styles.discountContainer}>
            <Icon_2 name="tag" size={14} color="#fff" />
            <Text style={styles.discountText}>{item.discount}% OFF</Text>
          </View>
        </View>
        <Text style={styles.productTitle}>{item.name}</Text>
        <Text style={styles.productPrice}>EGP {item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Icon name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      {products.length === 0 ? (
        <View style={styles.noDataContainer}>
          <Icon_3 name="hourglass" size={100} color="#E91E63" />
          <Text style={styles.noDataText}>SOON!!!</Text>
        </View>
      ) : (
        <FlatList
          data={products}
          // keyExtractor={(item) => item.docId} 
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          numColumns={2}
        />
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  listContainer: {
        paddingHorizontal: 5,
        paddingBottom: 20,
        alignItems: "center",
        justifyContent: "center",
  },
  productCard: {
    width: cardWidth,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    margin: 8,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    alignItems: 'center',
    height: 230,
  },
 image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 12,
    height: 120,
    resizeMode: 'contain',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
    color: '#333',
  },
  productPrice: {
    fontSize: 14,
    color: '#757575',
    marginTop: 'auto', 
    marginBottom: 5,
  },
  discountContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#E91E63",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  discountText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  noDataText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
    textAlign: "center",
    marginTop: 20,
    
  },
  noDataContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    
  },
});

export default DispalyCategories;
