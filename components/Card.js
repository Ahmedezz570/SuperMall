import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'; // أيقونة القلب

const ProductCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/6311621/pexels-photo-6311621.jpeg' }}
          style={styles.image}
        />
        <TouchableOpacity style={styles.favoriteIcon}>
          <Icon name="hearto" size={22} color="#d32f2f" />
        </TouchableOpacity>
        <Text style={styles.title}>Men's Harrington Jacket</Text>
        <Text style={styles.price}>EGP 750</Text>
      </View>
      <View style={styles.card}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/6311621/pexels-photo-6311621.jpeg' }}
          style={styles.image}
        />
        <TouchableOpacity style={styles.favoriteIcon}>
          <Icon name="hearto" size={22} color="#d32f2f" />
        </TouchableOpacity>
        <Text style={styles.title}>Men's Harrington Jacket</Text>
        <Text style={styles.price}>EGP 750</Text>
      </View>
      <View style={styles.card}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/6311621/pexels-photo-6311621.jpeg' }}
          style={styles.image}
        />
        <TouchableOpacity style={styles.favoriteIcon}>
          <Icon name="hearto" size={22} color="#d32f2f" />
        </TouchableOpacity>
        <Text style={styles.title}>Men's Harrington Jacket</Text>
        <Text style={styles.price}>EGP 750</Text>
      </View>
      <View style={styles.card}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/6311621/pexels-photo-6311621.jpeg' }}
          style={styles.image}
        />
        <TouchableOpacity style={styles.favoriteIcon}>
          <Icon name="hearto" size={22} color="#d32f2f" />
        </TouchableOpacity>
        <Text style={styles.title}>Men's Harrington Jacket</Text>
        <Text style={styles.price}>EGP 750</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  card: {
    width: 170,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    margin: 12,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 12,
  },
  favoriteIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 15,
    padding: 6,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
    color: '#333',
  },
  price: {
    fontSize: 15,
    color: '#757575',
    marginTop: 5,
  },
});

export default ProductCard;