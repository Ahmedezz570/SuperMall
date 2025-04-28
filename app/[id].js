import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, FlatList, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { db, auth } from '../firebase';
import { collection, doc, getDoc, getDocs, setDoc, onSnapshot } from 'firebase/firestore';
import { ToastAndroid } from 'react-native';
import FlashMessage, { showMessage } from "react-native-flash-message";
const ProductDetails = () => {
  const router = useRouter();
  const [reviews, setReviews] = useState([]);
  const [product, setProduct] = useState(null);
  const { id } = useLocalSearchParams();

  useEffect(() => {
    if (!id) return console.error("No product ID provided");

    const fetchProduct = async () => {
      try {
        const productRef = doc(db, "products", id);
        const productSnap = await getDoc(productRef);
        if (productSnap.exists()) {
          setProduct({ id: productSnap.id, ...productSnap.data() });
        } else {
          console.error("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (!id) return console.error("Product ID is missing");

    const reviewsRef = collection(db, "products", id, "reviews");
    const unsubscribe = onSnapshot(reviewsRef, (snapshot) => {
      const reviewsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReviews(reviewsData);
    }, (error) => console.error("Error fetching reviews:", error));

    return () => unsubscribe();
  }, [id]);

  const handleFavorite = async() => {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert("Error", "Please log in first!");
      return;
    }

    try {
      const cartRef = doc(db, "users", user.uid, "fav", id);
      await setDoc(cartRef, {
        name: product?.name,
        image: product?.image,
        price: product?.price,
      
      });

   
      showMessage({
        message: `${product?.name} added to favourite!`,
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
      console.error("Error adding to cart:", error);
      Alert.alert("Error", "Failed to add to cart.");
    }
  };

  const handleAddToCart = async () => {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert("Error", "Please log in first!");
      return;
    }

    try {
      const cartRef = doc(db, "users", user.uid, "cart", id);
      await setDoc(cartRef, {
        name: product?.name,
        image: product?.image,
        price: product?.price,
        quantity: 1,
      });

      // ToastAndroid.showWithGravityAndOffset(
      //   `${product?.name} added to cart!`,
      //   ToastAndroid.SHORT,
      //   ToastAndroid.BOTTOM,
      //   0,
      //   100
      // );
      showMessage({
        message: `${product?.name} added to cart!`,
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
      console.error("Error adding to cart:", error);
      Alert.alert("Error", "Failed to add to cart.");
    }
  };

  const renderReviewItem = ({ item }) => (
    <View style={styles.reviewItem}>
      <Image source={{ uri: item.avatar }} style={styles.reviewAvatar} />
      <View style={styles.reviewTextContainer}>
        <Text style={styles.reviewName}>{item.userName}</Text>
        <Text style={styles.reviewRating}>⭐ {item.rating}/5</Text>
        <Text style={styles.reviewComment}>{item.comment}</Text>
        <Text style={styles.reviewTime}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <>
      <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <View style={styles.wrapper}>
          <View style={styles.listHeader}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="#333" />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleFavorite} style={styles.heartButton}>
                <Ionicons name="heart-outline" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            {product?.image && <Image source={{ uri: product.image }} style={styles.image} />}
            <Text style={styles.name}>{product?.name}</Text>
            <Text style={styles.description}>{product?.description}</Text>
          </View>

          <View style={styles.reviewHeader}>
            <Text style={styles.reviewTitle}>Customer Reviews</Text>
            <TouchableOpacity onPress={() => router.push(`/Review/${id}`)}>
              <Text style={styles.allReviews}>All Reviews ({reviews.length})</Text>
            </TouchableOpacity>
          </View>


          {reviews.length === 0 &&

            <View style={{ alignItems: 'center', padding: 20, backgroundColor: 'white', height: '100%' }}>
              <Text style={{ fontSize: 16, color: '#888' }}>No reviews yet</Text>
            </View>
          }

          {reviews.length > 0 && (
            <>
              <View style={{ backgroundColor: 'white' }}>
                <FlatList
                  data={reviews.slice(-4)}
                  renderItem={renderReviewItem}
                  keyExtractor={(item) => item.id}
                  contentContainerStyle={styles.container}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                /></View>

                <View style ={{height : "100%" , backgroundColor : "white"}}></View>
                </>)}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
          <Text style={styles.price}>EGP {product?.price}</Text>
          <Text style={styles.text}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listHeader: {
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
  },
  backButton: {
    padding: 8,
  },
  heartButton: {
    backgroundColor: '#FAE5D3',
    padding: 10,
    borderRadius: 50,
  },
  image: {
    width: '90%',
    aspectRatio: 1,
    resizeMode: 'contain',
    alignSelf: 'center',
    borderRadius: 10,
    marginVertical: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    color: '#333',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#4A3222',
    marginBottom: 10,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  reviewTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#333",
  },
  allReviews: {
    fontSize: 14,
    color: "#007AFF",
    textDecorationLine: 'underline',
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  reviewItem: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 20,
    marginRight: 10,
    alignItems: 'center',
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 5,
    // elevation: 3,
  },
  reviewAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  reviewTextContainer: {
    flex: 1,
  },
  reviewName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  reviewRating: {
    fontSize: 14,
    color: '#FFA500',
  },
  reviewComment: {
    fontSize: 14,
    color: '#555',
    marginVertical: 4,
  },
  reviewTime: {
    fontSize: 12,
    color: '#888',
  },
  footer: {
    paddingVertical: 15,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f5e1d7',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    width: '90%',
  },
  price: {
    fontSize: 16,
    color: '#555',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});


export default ProductDetails;
