// app/upload-products.js
import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import productsData from '../../data.json';

import { db } from '../../firebase'; 

export default function UploadProducts() {
 

  useEffect(() => {
    const uploadProducts = async () => {
      try {
        const productsRef = collection(db, 'products');
        for (const product of productsData) {
          await addDoc(productsRef, product);
        }
        console.log('All products uploaded successfully!');
      } catch (error) {
        console.error('Error uploading products:', error);
      }
    };

    uploadProducts();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Uploading Products...</Text>
    </View>
  );
}
