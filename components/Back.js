import { View, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const Back = () => {
  const HandleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backbut} onPress={HandleBack}>
        <MaterialIcons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: width * 0.05,
    backgroundColor: '#fff',
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
});

export default Back;
