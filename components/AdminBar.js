import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useRouter, usePathname } from "expo-router";

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



            <TouchableOpacity onPress={() => navigateTo("/Admin/Productss")}>
                <Icon name="shopping-bag" size={28} color={pathname === "/Admin/Productss" ? "#f5e1d2" : "gray"} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigateTo("/Admin/Additem")}>
                <Icon name="plus" size={28} color={pathname === "/Admin/Additem" ? "#f5e1d2" : "gray"} />
            </TouchableOpacity>


            <TouchableOpacity onPress={() => navigateTo("/Admin/AllUsers")}>
    <Icon name="users" size={28} color={pathname === "/Admin/AllUsers" ? "#f5e1d2" : "gray"} />
</TouchableOpacity>

            <TouchableOpacity onPress={() => navigateTo("/Admin/dashboard")}>
                <Icon name="user" size={28} color={pathname === "/Admin/dashboard" ? "#f5e1d2" : "gray"} />
            </TouchableOpacity>
     

     




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
        // bottom: 10,
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
