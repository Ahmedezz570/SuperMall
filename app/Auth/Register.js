import React , { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Dimensions, Alert } from 'react-native';
import { router, Stack } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { auth, db } from '../../firebase'; 
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [secureConfirmText, setSecureConfirmText] = useState(true);

  const handleBack = () => {
    router.back();
  };

  const handleRegister = async () => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      
      await setDoc(doc(db, "users", user.uid), {
        username,
        email,
        uid: user.uid,
        image : "https://randomuser.me/api/portraits/men/1.jpg"
      });

      Alert.alert("Success", "Registered Successfully!");
      router.replace('/Auth/Login');
    } catch (error) {
      Alert.alert("Registration Error", error.message);
    }
  };
  const handleReset = () => {
    router.push('/Auth/ForgetPassword');
  };
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <Text style={styles.title}>Create Account</Text>

        <TextInput placeholder="Username" style={styles.input} value={username} onChangeText={setUsername} />
        <TextInput placeholder="Email Address" style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />

        <View style={styles.passwordContainer}>
          <TextInput placeholder="Password" style={styles.passwordInput} secureTextEntry={secureText} value={password} onChangeText={setPassword} />
          <TouchableOpacity onPress={() => setSecureText(!secureText)}>
            <MaterialIcons name={secureText ? 'visibility-off' : 'visibility'} size={24} color="gray" />
          </TouchableOpacity>
        </View>

        <View style={styles.passwordContainer}>
          <TextInput placeholder="Confirm Password" style={styles.passwordInput} secureTextEntry={secureConfirmText} value={confirmPassword} onChangeText={setConfirmPassword} />
          <TouchableOpacity onPress={() => setSecureConfirmText(!secureConfirmText)}>
            <MaterialIcons name={secureConfirmText ? 'visibility-off' : 'visibility'} size={24} color="gray" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <View style={styles.footer}>
        <Text style={styles.text}>Forgot Password?</Text>
        <TouchableOpacity onPress={handleReset}>
          <Text style={styles.resetText}>Reset</Text>
        </TouchableOpacity>
      </View>
      </View>
    </>
  );
};

export default Register;
const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E7E3E3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 44,
    backgroundColor: '#E2E2E2',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E2E2E2',
    borderRadius: 5,
    width: '100%',
    height: 44,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  passwordInput: {
    flex: 1,
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FAE5D3',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 14,
    color: '#444',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * 0.02,
  },
  resetText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 5,
  },
});




