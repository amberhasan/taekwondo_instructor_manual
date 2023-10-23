import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import FastImage from 'react-native-fast-image';

const Card = ({item, index, handleRowPress}) => (
  <TouchableOpacity
    onPress={() => handleRowPress(index)}
    style={styles.container}>
    <FastImage source={{uri: item.image}} style={styles.backgroundImage}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.titleKorean}>({item.titleKorean})</Text>
      </View>
    </FastImage>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    width: '48%',
    aspectRatio: 16 / 11,
    margin: 4,
    overflow: 'hidden',
    elevation: 4,
    backgroundColor: 'white',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'black',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'space-between', // Adjusted alignment
    alignItems: 'center',
    borderRadius: 15,
  },
  titleContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    width: '100%', // Fills the width
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row', // Added flexDirection
    justifyContent: 'space-between', // Adjusted alignment
    alignItems: 'center', // Adjusted alignment
  },
  title: {
    fontSize: 16, // Increased font size
    fontWeight: 'bold',
    color: 'white',
  },
  titleKorean: {
    fontSize: 12, // Increased font size
    color: 'white',
  },
  iconContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 8,
    borderRadius: 50, // Circular shape
    marginTop: 8, // Spacing from the title
  },
});

export default Card;
