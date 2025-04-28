import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, StyleSheet, ActivityIndicator, TouchableOpacity, Alert , ScrollView} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { db } from '../../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ToastAndroid } from 'react-native';
import FlashMessage, { showMessage } from "react-native-flash-message";
const Update = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (!id) {
      console.error("No product ID provided");
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        const productRef = doc(db, "products", id);
        const productSnap = await getDoc(productRef);
        if (productSnap.exists()) {
          const productData = { id: productSnap.id, ...productSnap.data() };
          setProduct(productData);
          setName(productData.name);
          setDescription(productData.description);
          setPrice(productData.price);
        } else {
          console.error("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleUpdate = async () => {
    if (!name.trim() || !description.trim() || !price.trim()) {
      Alert.alert("Error", "Name ,  description and Price cannot be empty!");
      return;
    }

    try {
      const productRef = doc(db, "products", id);
      await updateDoc(productRef, {
        name,
        description,
        price
      });

       showMessage({
            message: "Product updated successfully",
            type: "success",
            style: {
              backgroundColor: 'green', 
              padding: 10,
            },
            icon: { icon: "success", position: "left" },
            duration: 3000,
            hideOnPress: true,
            floating: true,
          });

    } catch (error) {
      console.error("Error updating product:", error);
      showMessage({
        message: "Failed to update product",
        type: "danger",
        style: {
          backgroundColor: 'red', 
          padding: 10,
        },
        icon: { icon: "danger", position: "left" },
        duration: 3000,
        hideOnPress: true,
        floating: true,
      });
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
  }

  if (!product) {
    return <Text style={styles.errorText}>Product not found</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />

      <Text style={styles.label}>Product Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter product name"
      />

      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter product description"
        multiline
      />

      <Text style={styles.label}>Price:</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        placeholder="Enter product price"
        keyboardType="numeric"
      />

      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" style={{ marginTop: 20 }} />
      ) : (
        <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Update Product</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 12,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  updateButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Update;