import { Stack } from "expo-router";
import { AuthContextProvider } from "../context/AuthContext";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { ActivityIndicator, View , StatusBar } from "react-native";
import {  useRouter } from 'expo-router';
import FlashMessage from "react-native-flash-message";
function Layout() {
  const auth = useContext(AuthContext); 
  const router = useRouter();

  const user = auth?.user;
  const loading = auth?.loading;

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/Auth/Login");
    } else if (user.role === "admin") {
      router.replace("/Admin/Productss");
    } else if (user.role === "user") {
      router.replace("/User/HomePage");
    }
  }, [user, loading, router]); 

  if (loading) {
    return (
      <>
      <StatusBar backgroundColor={"#f5e1d2"} barStyle="dark-content" />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
      </>
    );
  }

  return (
    <Stack 
    screenOptions={{ headerShown: false , animation: 'slide_from_right',}}
    
    >
     
      <Stack.Screen
        name="index" 
        options={{
          title: "Home", 
        }}
      />

      
      <Stack.Screen
        name="Auth/Login" 
        options={{
          title: "Login", 
        }}
      />

     
      <Stack.Screen
        name="Admin/Productss" 
        options={{
          title: "Admin Products", 
        }}
      />

    
      <Stack.Screen
        name="User/HomePage" 
        options={{
          title: "User Home", 
        }}
      />

    </Stack>
  );
}

export default function RootLayout() {
  return (
    <>
    <AuthContextProvider>
      <Layout />
    </AuthContextProvider>
    <FlashMessage position="bottom" /> 
    </>
  );
}