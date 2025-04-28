import { View, Text, FlatList, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const notifications = [
  {
    id: '1',
    message: 'Ahmed, you placed an order, check your order history for full details.',
    isNew: true,
  },
  {
    id: '2',
    message: 'Ahmed, Thank you for shopping with us. We have canceled order #24568.',
    isNew: false,
  },
  {
    id: '3',
    message: 'Ahmed, your Order #24568 has been confirmed. Check your order history.',
    isNew: false,
  },
  {
    id: '4',
    message: 'Ahmed, your Order #24568 has been confirmed. Check your order history.',
    isNew: false,
  },
  {
    id: '5',
    message: 'Ahmed, your Order #24568 has been confirmed. Check your order history.',
    isNew: false,
  },
  {
    id: '6',
    message: 'Ahmed, your Order #24568 has been confirmed. Check your order history.',
    isNew: false,
  },
  {
    id: '7',
    message: 'Ahmed, your Order #24568 has been confirmed. Check your order history.',
    isNew: false,
  },
  {
    id: '8',
    message: 'Ahmed, your Order #24568 has been confirmed. Check your order history.',
    isNew: false,
  },
  {
    id: '9',
    message: 'Ahmed, your Order #24568 has been confirmed. Check your order history.',
    isNew: false,
  },
  {
    id: '10',
    message: 'Ahmed, your Order #24568 has been confirmed. Check your order history.',
    isNew: false,
  },
];

export default function Notifications() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.notificationBox}>
            <Ionicons name="notifications-outline" size={24} color="#555" style={styles.icon} />
            <Text style={styles.message}>{item.message}</Text>
            {/* {item.isNew && <View style={styles.newDot} />} */}
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  notificationBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
  },
  icon: {
    marginRight: 10,
  },
  message: {
    flex: 1,
    fontSize: 16,
  },
  newDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
    marginLeft: 5,
  },
});
