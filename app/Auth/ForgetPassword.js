import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { router, Stack } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
const ForgetPass = () => {
  const back = () => {
    router.back();
  }
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.container}>
        <TouchableOpacity style={styles.backbut} onPress={back}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <Text style={styles.title}>Forgot Password</Text>
        <TextInput placeholder="Email Address" style={styles.input} />
        <TouchableOpacity style={styles.button} >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

export default ForgetPass
const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: width * 0.05,
    // backgroundColor: '#fff',
  },
  button: {
    width: '95%',
    height: 53,
    borderRadius: 100,
    backgroundColor: '#FAE5D3',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Dimensions.get('window').height * 0.01,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#E2E2E2',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: height * 0.02,
  },
  title: {
    fontSize: 30,
    fontWeight: 800,
    marginBottom: Dimensions.get('window').height * 0.02,
    width: '95%',
    alignSelf: 'center',
  },
  backbut: {
    position: 'absolute',
    top: height * 0.03,
    left: width * 0.05,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E7E3E3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fl: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
})


