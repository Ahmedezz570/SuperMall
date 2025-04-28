import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert, ToastAndroid } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { useRouter } from 'expo-router';

const AddProduct = () => {
  const router = useRouter();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: '',
    image: '',
    category: '',
    description: '',
    price: '',
  });

  const pickAndUploadImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      base64: false,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      const formData = new FormData();

      formData.append('file', {
        uri,
        type: 'image/jpeg',
        name: 'upload.jpg',
      });

      formData.append('upload_preset', 'upload'); // استخدم الـ preset بتاع Cloudinary
      setLoading(true);

      try {
        const res = await fetch('https://api.cloudinary.com/v1_1/dlgzjfjlb/image/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        setImage(data.secure_url); // الصورة للعرض
        setProductDetails({ ...productDetails, image: data.secure_url }); // الصورة للتخزين في Firestore
        setLoading(false);
      } catch (error) {
        console.log('Upload error:', error);
        setLoading(false);
      }
    }
  };

  const changeHandler = (name, value) => {
    setProductDetails({ ...productDetails, [name]: value });
  };

  const addButton = async () => {
    if (!productDetails.image) {
      Alert.alert("Image Required", "Please upload an image before submitting.");
      return;
    }

    try {
      const productsRef = collection(db, 'products');
      const newProduct = { ...productDetails };
      await addDoc(productsRef, newProduct);

      ToastAndroid.showWithGravityAndOffset(
        'Product added successfully',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        100
      );

      setProductDetails({
        name: '',
        image: '',
        category: '',
        description: '',
        price: '',
      });
      setImage(null);
    } catch (error) {
      Alert.alert('Error', 'Failed to add product');
      console.error('Error adding product: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Product</Text>

      <Text style={styles.label}>Product Title</Text>
      <TextInput
        style={styles.input}
        value={productDetails.name}
        onChangeText={(text) => changeHandler('name', text)}
        placeholder="Enter here"
      />

      <Text style={styles.label}>Product Category</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={productDetails.category}
          onValueChange={(itemValue) => changeHandler('category', itemValue)}
          style={{ color: '#000' }}
        >
          <Picker.Item label="Select a category" value="" />
          <Picker.Item label="Mobiles" value="Mobiles" />
          <Picker.Item label="Pants" value="Pants" />
          <Picker.Item label="Jackets" value="Jackets" />
          <Picker.Item label="T-shirt" value="T-shirt" />
          <Picker.Item label="Sweatshirt" value="Sweatshirt" />
          <Picker.Item label="Wedding" value="Wedding" />
          <Picker.Item label="Dresses" value="Dresses" />
        </Picker>
      </View>

      <Text style={styles.label}>Product Description</Text>
      <TextInput
        style={styles.input}
        value={productDetails.description}
        onChangeText={(text) => changeHandler('description', text)}
        placeholder="Enter here"
      />

      <Text style={styles.label}>Product Price</Text>
      <TextInput
        style={styles.input}
        value={productDetails.price}
        onChangeText={(text) => changeHandler('price', text)}
        keyboardType="numeric"
        placeholder="Enter here"
      />

      <TouchableOpacity onPress={pickAndUploadImage} style={styles.imagePicker}>
        <Image
          source={image ? { uri: image } : require('../../assets/images/UplaodImage.jpg')}
          style={styles.image}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={addButton} style={styles.button}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    paddingBottom: 50,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 30,
    padding: 10,
    marginTop: 5,
  },
  imagePicker: {
    alignItems: 'center',
    marginTop: 15,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#f5e1d2',
    padding: 15,
    borderRadius: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 30,
    marginTop: 5,
    justifyContent: 'center',
  },
});

export default AddProduct;
