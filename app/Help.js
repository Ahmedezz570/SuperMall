import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Help() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Help & Support</Text>

      <Text style={styles.subHeader}>Frequently Asked Questions</Text>

      <View style={styles.faqContainer}>
        <Text style={styles.question}>❓ How do I place an order?</Text>
        <Text style={styles.answer}>You can browse products, add them to your cart, and proceed to checkout.</Text>

        <Text style={styles.question}>📦 How can I track my order?</Text>
        <Text style={styles.answer}>Go to 'My Orders' in your profile to track the status of your delivery.</Text>

        <Text style={styles.question}>💳 What payment methods are accepted?</Text>
        <Text style={styles.answer}>We accept credit/debit cards, PayPal, and cash on delivery.</Text>

        <Text style={styles.question}>🔄 Can I return or exchange a product?</Text>
        <Text style={styles.answer}>Yes, returns and exchanges are allowed within 14 days of purchase.</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

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
    marginBottom: 10,
    color: "#555",
  },
  faqContainer: {
    marginBottom: 20,
  },
  question: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    color: "#007bff",
  },
  answer: {
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
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
});
