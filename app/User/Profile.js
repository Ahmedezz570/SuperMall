import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useState , useEffect , useContext} from 'react'
import { router } from 'expo-router'
import { AuthContext } from "../../context/AuthContext";
import { db, auth, storage } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Bar from '../../components/Bar';
import { MaterialIcons } from '@expo/vector-icons';
const Profile = () => {
  const { logout } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
    useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
        if (userDoc.exists()) {
          setUser(userDoc.data());
        } else {
          console.log("⚠️ No user data found!");
        }
      }
    };

    fetchUserData();
  }, []);
  return (
    <>
    <View style={styles.container}>
      <Image source={{ uri: user?.image || 'https://randomuser.me/api/portraits/men/1.jpg' }} style={styles.logo} />

      <View style={styles.infobox}>
        <View style={styles.info}>
          <View style={{ display:"flex",flexDirection:"row"}}>
          <Text style={styles.name}>{user?.username}</Text>
          </View>
          <Text style={styles.mail}>{user?.email}</Text>
          <Text style={styles.mail}>{user?.mobile}</Text>
        </View>
        <View style={styles.edit}>
          <TouchableOpacity  activeOpacity={0.4}>
            <Text style={styles.edittext}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>


    
        <View style={styles.profiletabs}>
          <Text style={styles.textb}>Address</Text>
          <MaterialIcons name="arrow-back" size={24} color="black"style={[styles.backtab, { transform: [{ rotateY: '180deg' }] }]}  />
        </View>
       
     
        <View style={styles.profiletabs}>
          <Text style={styles.textb}>Wishlist</Text>
          <MaterialIcons name="arrow-back" size={24} color="black"style={[styles.backtab, { transform: [{ rotateY: '180deg' }] }]}  />
        </View>

        <View style={styles.profiletabs}>
          <Text style={styles.textb}>Payment</Text>
          <MaterialIcons name="arrow-back" size={24} color="black"style={[styles.backtab, { transform: [{ rotateY: '180deg' }] }]}  />
        </View>

        <View style={styles.profiletabs}>
          <Text style={styles.textb}>Help</Text>
          <MaterialIcons name="arrow-back" size={24} color="black"style={[styles.backtab, { transform: [{ rotateY: '180deg' }] }]}  />
        </View>

        <View style={styles.profiletabs}>
          <Text style={styles.textb}>Support</Text>
          <MaterialIcons name="arrow-back" size={24} color="black"style={[styles.backtab, { transform: [{ rotateY: '180deg' }] }]}  />
        </View>



{/* 
      <View style={{ flexGrow: 1, justifyContent: "center", width: "100%", alignItems: "center" }}>
        <TouchableOpacity style={styles.out}  activeOpacity={0.4} onPress={logout}>
          
          <Text style={{ fontSize: 20, color: "red", fontWeight: "bold" }}>Logout</Text>
         
        </TouchableOpacity>
      </View> */}
    </View>
   
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'flex-start', 
    alignItems: 'center',
    backgroundColor: '#f9f9f9', 
    paddingTop: 40, 
  },
  backtab: {
    width: 20, 
    height: 20, 
    position: "absolute",
    right: 15,
    
    opacity: 0.7, 
  },
  profiletabs: {
    backgroundColor: '#fff',
    width: '90%',
    height: 60, 
    borderRadius: 12, 
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center',
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15, 
    shadowRadius: 3.84,
    elevation: 6, 
  },
  textb: {
    fontSize: 18, 
    fontWeight: 'bold',
    color: '#333', 
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50, 
    marginTop: 30,
    borderWidth: 2, 
    borderColor: '#ddd', 
  },
  infobox: {
    width: "90%",
    backgroundColor: 'white',
    height: 100, 
    borderRadius: 12, 
    marginTop: 20,
    marginBottom: 20,
    flexDirection: 'row',
    elevation: 2, 
    padding: 15, 
    alignItems: 'center', 
  },
  info: {
    flex: 1,
    paddingLeft: 10, 
  },
  edit: {
    position: "absolute",
    right: 15,
    bottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  edittext: {
    color: 'purple',
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    padding: 6,
    width: 60, 
  },
  name: {
    fontSize: 22, 
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  mail: {
    fontSize: 15,
    color: '#777',
    marginBottom: 5,
  },
  out: {
    position: "absolute",
    bottom: 30,
    borderRadius: 25, 
    backgroundColor: 'white', 
    width: 160,
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5, 
  },
  outText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  }
})

export default Profile