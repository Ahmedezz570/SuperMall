import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const Price = ({ modalVisible_2, setModalVisible_2 }) => {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);


  return (
    <Modal
      transparent={true}
      visible={modalVisible_2}
      animationType="slide"
      onRequestClose={() => setModalVisible_2(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => { setMin(0); setMax(0); }}>
              <Text style={styles.clearText}>Clear</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Price</Text>
            <TouchableOpacity onPress={() => setModalVisible_2(false)}>
              <Icon name="close" size={20} color="black" />
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.option}
            placeholder="Min"
            keyboardType="numeric"
            onChangeText={(text) => setMin(Number(text))}
          />
          <TextInput
            style={styles.option}
            placeholder="Max"
            keyboardType="numeric"
            onChangeText={(text) => setMax(Number(text))}
          />

          <TouchableOpacity
            style={styles.applyButton}
            onPress={() => setModalVisible_2(false)}
          >
            <Text style={styles.applyButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  clearText: {
    fontSize: 14,
    color: "gray",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  option: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
    marginBottom: 10,
  },
  applyButton: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  applyButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Price;
