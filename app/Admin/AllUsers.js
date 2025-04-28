import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from "react";
import {db} from '../../firebase';
import { collection, onSnapshot , deleteDoc , doc , getDocs } from "firebase/firestore";


const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const usersData = snapshot.docs.map((doc) => ({
        id: doc.id,  ...doc.data(),
      }));
      setUsers(usersData);
    });

    return () => unsubscribe();
  }, []);

  const deleteSubcollection = async (userId, subcollectionName) => {
    const subColRef = collection(db, "users", userId, subcollectionName);
    const snapshot = await getDocs(subColRef);
  
    const deletePromises = snapshot.docs.map((docSnap) =>
      deleteDoc(doc(db, "users", userId, subcollectionName, docSnap.id))
    );
  
    await Promise.all(deletePromises);
  };
  const handleDelete = (userId, userName) => {
    Alert.alert(
      "Confirm Deletion",
      `Are you sure you want to delete ${userName} and all their data?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: async () => {
            try {
              // احذف الـ subcollections الأول
              await deleteSubcollection(userId, "orders");
              await deleteSubcollection(userId, "cart");
              await deleteSubcollection(userId, "notifications");
  
              // بعد كده احذف المستخدم نفسه
              await deleteDoc(doc(db, "users", userId));
  
              Alert.alert(`${userName} and all data have been deleted!`);
            } catch (error) {
              console.error("Error deleting user and data:", error);
              Alert.alert("Failed to delete user and subcollections.");
            }
          },
        },
      ]
    );
  };
  
  

  const handleBlock = (userName) => {
    Alert.alert(
      "Confirm Block",
      `Are you sure you want to block ${userName}?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Block", onPress: () => Alert.alert(`${userName} has been blocked!`) }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>All Users</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.userCard}>
            <Image source={{ uri: item.image }} style={styles.userImage} />
            <View style={styles.userInfo}>
              <Text style={styles.name}>{item.username}</Text>
              <Text style={styles.email}>{item.email}</Text>
            </View>
            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id, item.username)}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.blockButton} onPress={() => handleBlock(item.name)}>
              <Text style={styles.buttonText}>Block</Text>
            </TouchableOpacity>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: 'gray',
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginLeft: 5,
  },
  blockButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginLeft: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default AllUsers;
