import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
// import Data from '../../components/Data';
import  data  from '../../components/RealData';
import  images  from '../../components/images';
const { width } = Dimensions.get('window');
const cardWidth = (width / 2) - 24;
import {db} from '../../firebase';
import { collection, onSnapshot } from "firebase/firestore";


const ProductList = () => {
  const router = useRouter(); 
  
  const [products, setProducts] = useState([]);
  
    useEffect(() => {
      const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
        const usersData = snapshot.docs.map((doc) => ({
          docId: doc.id,  ...doc.data(),
        }));
        setProducts(usersData);
      });
  
      return () => unsubscribe();
    }, []);
    console.log("Data:", products);
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>All Products</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.docId}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/${item.docId}`)}>
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.price}>EGP {item.price}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  listContainer: {
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
  card: {
    width: cardWidth,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    margin: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    alignItems: 'center',
    height: 250,
  },
  image: {
    width: '100%',
    height: 120, 
    resizeMode: 'contain',
    borderRadius: 10,
  },
  
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingTop: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#222',
  },
  price: {
    fontSize: 14,
    color: 'Black',
    fontWeight: '600',
    marginTop: 5,
  },
});

export default ProductList;
