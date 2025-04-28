import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet,  FlatList, Dimensions, Pressable , Alert , TouchableOpacity} from 'react-native';
import {db} from '../../firebase';
import { collection, onSnapshot , deleteDoc, doc , getDocs} from "firebase/firestore";
const { width } = Dimensions.get('window');
const cardWidth = (width / 2) - 24;
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { ToastAndroid } from 'react-native';
import { useLocalSearchParams , useRouter} from 'expo-router';
import { showMessage } from 'react-native-flash-message';
const ProductList = () => {
const router = useRouter();
   const [products, setProducts] = useState([]);
   useEffect(() => {
    const checkStorage = async () => {
      try {
        const data = await AsyncStorage.getItem('userData');
  
        if (data !== null) {
          const parsedData = JSON.parse(data);
          console.log('Parsed userData:', parsedData);
        } else {
          console.log('No userData found in storage.');
        }
      } catch (error) {
        console.log('Error reading userData from storage:', error);
      }
    };
  
    checkStorage();
  }, []); 
  
    useEffect(() => {
      const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
        const usersData = snapshot.docs.map((doc) => ({
          id: doc.id,  ...doc.data(),
        }));
        setProducts(usersData);
      });
  
      return () => unsubscribe();
    }, []);


    const deleteSubcollections = async (productId) => {
      const subcollections = ["reviews"]; 
      for (const subcollection of subcollections) {
        const subcollectionRef = collection(db, "products", productId, subcollection);
        const snapshot = await getDocs(subcollectionRef);
        
        const deletePromises = snapshot.docs.map((doc) => deleteDoc(doc.ref));
        await Promise.all(deletePromises); 
      }
    };
    const handleDelete = async (id) => {
      Alert.alert("Delete", "Are you sure you want to delete this product?", [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK", onPress: async () => {
            try {
              await deleteSubcollections(id);
              await deleteDoc(doc(db, "products", id));
              showMessage({
                message: "Product deleted successfully",
                type: "success",
                duration: 3000,
                floating: true,
              });
            } catch (error) {
              showMessage({
                message: "Failed to delete product",
                type: "danger",
                duration: 3000,
                floating: true,
              });
            }
          }
        }
      ]);
    };
  return (
    <View style={styles.container}>
    <Text style={styles.header}>All Products</Text>
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.card}>
     <TouchableOpacity onPress={() => handleDelete(item.id)} style={{position: 'absolute', top: 5, right: 3 ,  padding: 8,  
      zIndex: 10,  }}>
     <Ionicons name="close" size={24} color="black" />
</TouchableOpacity>

          <Image source={{ uri: item.image }} style={styles.image} />
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.price}>{item.price}</Text>
          <View style={styles.buttonContainer}>
            <Pressable style={styles.updateButton} onPress={() => router.push(`/Update/${item.id}`)}>
              <Text style={styles.buttonText}>Update</Text>
            </Pressable>
            {/* <Pressable style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
              <Text style={styles.buttonText}>Delete</Text>
            </Pressable> */}
          </View>
        </View>
      )}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ 
        // paddingBottom: 80,
        paddingVertical: 20,
        paddingHorizontal: 10,}}
      numColumns={2}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
   backgroundColor: '#f5f7fa',
  },
  card: {
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
  },
  image: {
    width: '100%',
    height: 120, 
    resizeMode: 'contain',
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
    color: '#333',
  },
  price: {
    fontSize: 14,
    color: '#757575',
    marginTop: 5,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%', 
    marginTop: 'auto',
  },
  updateButton: {
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    marginRight: 5,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    marginLeft: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    marginTop: 18,
  },
});

export default ProductList;
