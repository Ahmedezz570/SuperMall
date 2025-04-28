import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Modal, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import { useLocalSearchParams , useRouter} from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from "react-native-vector-icons/MaterialIcons";
import { db , auth , getDocs} from '../../firebase';
import { collection, addDoc,  query, where, doc } from 'firebase/firestore'; 
import { getDoc } from "firebase/firestore"; 
import { ToastAndroid } from 'react-native';

const Review = () => {

  const router = useRouter();
  const { id } = useLocalSearchParams();  
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState(null);


  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        try {
          const userRef = doc(db, "users", auth.currentUser.uid);
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            setUser(userDoc.data());
          } else {
            console.log("⚠️ No user data found!");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        console.log("⚠️ No authenticated user!");
      }
    };
  
    fetchUserData();
  }, []);

  
useEffect(() => {
  if (!id) {
    console.error("Product ID is missing");
    return;
  }

  const fetchReviews = async () => {
    try {
      const productRef = doc(db, "products", id); 
      const reviewsRef = collection(productRef, "reviews"); 

      const querySnapshot = await getDocs(reviewsRef); 
      const reviewsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setReviews(reviewsData);
      console.log("Fetched Reviews:", reviewsData); 
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  fetchReviews();
}, [id]);
  
  

  const submitReview = async () => {
    if (reviewText.trim() === '' || rating === 0) {
      ToastAndroid.showWithGravityAndOffset(
       "Please enter a review and rating",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        100
      );
      return;
    }
    console.log(user)

    

    const newReview = {
      userName :user.username || 'My Name', 
      userEmail :user.email || 'My Email',
      rating,
      comment: reviewText,
      time: new Date().toLocaleString(),
      avatar: user.image ||'https://randomuser.me/api/portraits/men/3.jpg', 
    };

    try {
     
      const productRef = doc(db, 'products', id);
      
      await addDoc(collection(productRef, 'reviews'), newReview);
      setReviews([ newReview , ...reviews]);  
      setReviewText('');
      setRating(0);
      setModalVisible(false);
      ToastAndroid.showWithGravityAndOffset(
        "Review added successfully!",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        100
      );
    } catch (e) {
      console.error('Error adding review: ', e);
      alert('Failed to add review');
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
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Icon name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.heading}>All Reviews</Text>
      <FlatList
        data={reviews}
        renderItem={renderReviewItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.reviewList}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Ionicons name="create-outline" size={24} color="black" />
        <Text style={styles.addButtonText}>Add Review</Text>
      </TouchableOpacity>

      <Modal animationType="slide" transparent visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Rate this product</Text>
            <View style={styles.starContainer}>
              {[1, 2, 3, 4, 5].map((num) => (
                <TouchableOpacity key={num} onPress={() => setRating(num)}>
                  <Ionicons name={num <= rating ? "star" : "star-outline"} size={30} color={num <= rating ? "gold" : "gray"} />
                </TouchableOpacity>
              ))}
            </View>
            <TextInput
              style={styles.input}
              placeholder="Write your review..."
              value={reviewText}
              onChangeText={setReviewText}
              multiline
            />
            <TouchableOpacity style={styles.submitButton} onPress={submitReview}>
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  reviewList: { paddingBottom: 20 },
  reviewItem: { flexDirection: 'row', backgroundColor: 'white', padding: 15, borderRadius: 10, marginBottom: 10, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, elevation: 2 },
  reviewAvatar: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  reviewTextContainer: { flex: 1 },
  reviewName: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  reviewRating: { fontSize: 14, color: '#FFD700' },
  reviewComment: { fontSize: 14, color: '#555', marginVertical: 3 },
  reviewTime: { fontSize: 12, color: '#888' },

  addButton: { flexDirection: 'row', backgroundColor: '#FAE5D3', padding: 12, borderRadius: 25, alignItems: 'center', justifyContent: 'center', marginTop: 10 },
  addButtonText: { color: 'black', fontSize: 16, fontWeight: 'bold', marginLeft: 5 },

  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContainer: { width: '80%', backgroundColor: 'white', padding: 20, borderRadius: 10, alignItems: 'center' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  starContainer: { flexDirection: 'row', marginBottom: 15 },
  input: { width: '100%', borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 10, marginBottom: 10 },
  submitButton: { backgroundColor: '#FAE5D3', padding: 10, borderRadius: 10, alignItems: 'center', width: '100%' },
  submitText: { fontSize: 16, fontWeight: 'bold', color: 'black' },
  cancelButton: { backgroundColor: '#ddd', padding: 10, borderRadius: 10, alignItems: 'center', marginTop: 10, width: '100%' },
  cancelText: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 15, textAlign: 'center', color: '#333' },
});

export default Review;
