import React, { useState } from "react";
import { 
  View, Text, ScrollView, StyleSheet, TouchableOpacity, 
  Alert, Dimensions, TextInput, Modal 
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from '@expo/vector-icons';

export default function SecurityPrivacy() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [password, setPassword] = useState("");

  const handleDeleteAccount = () => {
    setModalVisible(true);
  };

  const confirmDelete = async () => {
    if (password.trim() === "") {
      Alert.alert("Error", "Please enter your password!");
      return;
    }

    setModalVisible(false);
    Alert.alert("Success", "Account successfully deleted.");
    // Call API to delete the account here
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      

      <Text style={styles.header}>Security & Privacy</Text>

      <Text style={styles.subHeader}>🔐 Data Protection</Text>
      <Text style={styles.paragraph}>
        We use advanced encryption and security measures to protect your personal data and transactions.
      </Text>

      <Text style={styles.subHeader}>📜 Privacy Policy</Text>
      <Text style={styles.paragraph}>
        Your personal information is never shared with third parties without your consent.
      </Text>

      <Text style={styles.subHeader}>🔑 Account Security</Text>
      <Text style={styles.paragraph}>
        We recommend using a strong password and enabling two-factor authentication.
      </Text>

      <Text style={styles.subHeader}>🛡️ Secure Transactions</Text>
      <Text style={styles.paragraph}>
        All payments are securely processed with industry-standard security protocols.
      </Text>

      {/* Delete Account Button */}
      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
        <Text style={styles.deleteButtonText}>Delete My Account</Text>
      </TouchableOpacity>

      {/* Back Button */}
      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>

     
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Enter your password to confirm deletion:</Text>
            
           
            <TextInput
              style={styles.input}
              placeholder="Enter Password"
              placeholderTextColor="#888"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />

           
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonTextt}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.confirmButton} onPress={confirmDelete}>
                <Text style={styles.buttText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#333",
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 15,
    color: "#007bff",
  },
  paragraph: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#f5e1d2",
    padding: 12,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 20,
  },
  buttonTextt: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttText :{
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonText:{
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#ff4d4d",
    padding: 12,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 20,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    width: "100%",
    gap: 10,
  },
  cancelButton: {
    backgroundColor: "#FAE5D3",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
  },
  confirmButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
  },
});

