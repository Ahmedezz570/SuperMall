import React, { useContext, useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  KeyboardAvoidingView, Platform, ActivityIndicator 
} from 'react-native';
import { router, Stack } from 'expo-router';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { AuthContext } from "../../context/AuthContext";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { doc, getDoc } from "firebase/firestore";
import { showMessage } from 'react-native-flash-message';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userData = {
        email: user.email,
        uid: user.uid,
        isAdmin: userDoc.exists() ? userDoc.data().isAdmin : false
      };

      login(userData);

      if (userData.isAdmin) {
        router.replace('/Admin/Productss');
      } else {
        router.replace('/User/HomePage');
      }

    } catch (error) {
      console.error("❌ Login Error:", error.message);
      showMessage({
        message: "Invalid email or password.",
        type: "danger",
        duration: 3000,
        floating: true,
        icon: { icon: "danger", position: "left" },
        style: {
          backgroundColor: 'red',
          padding: 10,
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.container}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Sign in</Text>

          <TextInput
            placeholder="Email Address"
            placeholderTextColor="#777"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />

          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Password"
              placeholderTextColor="#777"
              style={styles.passwordInput}
              secureTextEntry={secureText}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setSecureText(!secureText)}>
              <MaterialIcons 
                name={secureText ? 'visibility-off' : 'visibility'} 
                size={24} 
                color="gray" 
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            {loading ? (
              <ActivityIndicator size="large" color="black" />
            ) : (
              <Text style={styles.buttonText}>Sign In</Text>
            )}
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <Text>Don't have an account?</Text>
            <TouchableOpacity onPress={() => router.push('/Auth/Register')}>
              <Text style={styles.createButtonText}> Create One</Text>
            </TouchableOpacity>
          </View>

          
          {/* <TouchableOpacity style={styles.socialButton}>
            <FontAwesome name='apple' size={30} style={styles.icon} />
            <Text style={styles.buttonText}>Continue With Apple</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <FontAwesome name='google' size={30} style={styles.icon} />
            <Text style={styles.buttonText}>Continue With Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <FontAwesome name='facebook' color='white' size={25} style={styles.facebookIcon} />
            <Text style={styles.buttonText}>Continue With Facebook</Text>
          </TouchableOpacity> */}
        </View>
      </KeyboardAvoidingView>
    </>
  );
};



export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    width: '90%',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
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
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E2E2E2',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  passwordInput: {
    flex: 1,
    height: 44,
  },
  eyeIcon: {
    padding: 10,
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
  registerContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  createButtonText: {
    fontWeight: 'bold',
    color: 'black',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    backgroundColor: '#ECEBEB',
    marginVertical: 5,
  },
  icon: {
    position: 'absolute',
    left: 15,
  },
  facebookIcon: {
    position: 'absolute',
    left: 15,
    backgroundColor: 'rgb(24, 119, 242)',
    borderRadius: 50,
    width: 35,
    height: 35,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
