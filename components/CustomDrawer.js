import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";

const CustomDrawer = (props) => {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      
      <View style={styles.header}>
        <Image
          source={{ uri: "https://your-profile-image-url.com" }}
          style={styles.profileImage}
        />
        
      </View>

      {/* Drawer Items */}
      <View style={styles.drawerItems}>
        <DrawerItemList {...props} />
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={() => alert("Logging Out!")}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    padding: 3,
    alignItems: "center",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  username: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  drawerItems: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 10,
  },
  logoutButton: {
    padding: 15,
    backgroundColor: "#ff5555",
    margin: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  logoutText: {
    color: "white",
    fontSize: 16,
  },
});

export default CustomDrawer;
