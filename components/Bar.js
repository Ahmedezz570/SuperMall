import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useRouter, usePathname } from "expo-router";
import AnimatedIcon from './AnimatedIcon';
const BottomNav = () => {
  const router = useRouter();
  const pathname = usePathname(); 
  
  const navigateTo = (route) => {
    if (pathname !== route) {
      router.replace(route);
    }
  };

  return (
    <View style={styles.container}>
     <TouchableOpacity onPress={() => navigateTo("/User/HomePage")}>
     <AnimatedIcon isActive={pathname === "/User/HomePage"}>
    <Icon
      name="home"
      size={28}
      color={pathname === "/User/HomePage" ? "#f5e1d2" : "black"}
    />
  </AnimatedIcon>
</TouchableOpacity>

      {/* <TouchableOpacity onPress={() => navigateTo("/User/Notification")}>
        <AnimatedIcon isActive={pathname === "/User/Notification"}>
        <Icon name="bell" size={28} color={pathname === "/User/Notification" ? "#f5e1d2" : "black"} />
        </AnimatedIcon>
      </TouchableOpacity> */}

      {/* <TouchableOpacity onPress={() => navigateTo("/User/Orders")}>
        <AnimatedIcon isActive={pathname === "/User/Orders"}>
        <Icon name="bookmark" size={28} color={pathname === "/User/Orders" ? "#f5e1d2" : "black"} />
        </AnimatedIcon>
      </TouchableOpacity> */}

 <TouchableOpacity onPress={() => navigateTo("/User/Products")}>
        <AnimatedIcon isActive={pathname === "/User/Products"}>
        <Icon name="shopping-bag" size={28} color={pathname === "/User/Products" ? "#f5e1d2" : "black"} />
        </AnimatedIcon>
      </TouchableOpacity>
 <TouchableOpacity onPress={() => navigateTo("/User/Favourites")}>
        <AnimatedIcon isActive={pathname === "/User/Favourites"}>
        <Icon name="heart" size={28} color={pathname === "/User/Favourites" ? "#f5e1d2" : "black"} />
        </AnimatedIcon>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigateTo("/User/Profile")}>
        <AnimatedIcon isActive={pathname === "/User/Profile"}>
        <Icon name="user" size={28} color={pathname === "/User/Profile" ? "#f5e1d2" : "blacl"} />
        </AnimatedIcon>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={() => navigateTo("/User/Upload")}>
        <AnimatedIcon isActive={pathname === "/User/Uplaod"}>
        <Icon name="user" size={28} color={pathname === "/User/Uplaod" ? "#f5e1d2" : "blacl"} />
        </AnimatedIcon>
      </TouchableOpacity> */}

     

      {/* <TouchableOpacity onPress={() => navigateTo("/User/About")}>
        <Icon name="info" size={28} color={pathname === "/User/About" ? "#f5e1d2" : "gray"} />
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: "#ddd",
    // position: "absolute",
    // bottom: 6,
    // left: 10,
    // right: 10,
    // borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
});

export default BottomNav;
