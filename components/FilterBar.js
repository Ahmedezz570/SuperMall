import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // تأكد من تثبيت المكتبة
import Sort from "./Sort";
import Gengder from "./Gender";
import Price from "./Price";
const FilterBar = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible_1, setModalVisible_1] = useState(false);
    const [modalVisible_2, setModalVisible_2] = useState(false);
  return (
    
    <View style={styles.container}>
      
      <TouchableOpacity style={styles.filterButton}>
        <Icon name="lightbulb-o" size={16} color="#000" />
        <Text style={styles.filterText}>2</Text>
      </TouchableOpacity>

     
      <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>On Sale</Text>
      </TouchableOpacity>

     
      <TouchableOpacity style={styles.button} onPress={() => setModalVisible_2(true)}>
        <Text style={styles.text}>Price ▼</Text>
      </TouchableOpacity>
   <Price modalVisible_2={modalVisible_2} setModalVisible_2={setModalVisible_2}/>
     
      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.text}>Sort by ▼</Text>
      </TouchableOpacity>
      <Sort modalVisible={modalVisible} setModalVisible={setModalVisible}/>
      
      <TouchableOpacity style={styles.button} onPress={() => setModalVisible_1(true)}>
        <Text style={styles.text}>Men ▼</Text>
      </TouchableOpacity>
      <Gengder modalVisible_1={modalVisible_1} setModalVisible_1={setModalVisible_1}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5e1d2",
    padding: 8,
    borderRadius: 20,
    marginRight: 5
  },
  filterText: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  button: {
    backgroundColor: "#eeeee4",
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight : 5
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
});

export default FilterBar;