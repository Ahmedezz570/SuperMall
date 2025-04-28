import { View, Text, TouchableOpacity, StyleSheet , Dimensions} from 'react-native';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebase";
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { AuthContext } from "../context/AuthContext";
import { useContext  ,React } from "react";
const Settings = () => {
    const { logout } = useContext(AuthContext);
      const HandleBack = () => {
        router.back();
      };
  return (
    <View style={styles.container}>
       <TouchableOpacity style={styles.backbut} onPress={HandleBack}>
              <MaterialIcons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
      <Text style={styles.header}>Settings</Text>

      <View style={styles.settingList}>
        

        <TouchableOpacity style={styles.settingItem} onPress={() => router.push("/Privacy")}>
          <MaterialIcons name="lock" size={24} color="black" />
          <Text style={styles.settingText}>Privacy & Security</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}  onPress={() => router.push("/Help")}>
          <MaterialIcons name="help-outline" size={24} color="black" />
          <Text style={styles.settingText}>Help & Support</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}  onPress={logout}>
          <MaterialIcons name="logout" size={24} color="red" />
          <Text style={[styles.settingText, { color: 'red' }]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  settingList: {
    marginTop: 50,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E7E3E3',
  },
  settingText: {
    fontSize: 18,
    marginLeft: 15,
  },
  // backbut: {
  //   position: 'absolute',
  //   top: height * 0.03,
  //   left: width * 0.05,
  //   width: 40,
  //   height: 40,
  //   borderRadius: 20,
  //   backgroundColor: '#E7E3E3',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
});

export default Settings;
