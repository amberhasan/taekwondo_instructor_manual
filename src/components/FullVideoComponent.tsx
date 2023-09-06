import React, {useRef} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import VideoPlayer from './VideoPlayer';

const FullVideoComponent = ({fullVideo, form}) => {
  const playerRef = useRef(null);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <VideoPlayer ref={playerRef} source={fullVideo} />
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>{form.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  imageContainer: {
    width: '90%',
    aspectRatio: 16 / 9,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginTop: 20,
    overflow: 'hidden', // Clip the content within the container
  },
  descriptionContainer: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    width: '90%',
  },
  descriptionText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});

export default FullVideoComponent;
