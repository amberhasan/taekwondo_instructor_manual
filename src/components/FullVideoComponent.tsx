import React, {useRef} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import VideoPlayer from './VideoPlayer';

const FullVideoComponent = ({fullVideo, form}) => {
  const playerRef = useRef(null);

  return (
    <View style={styles.container}>
      <View style={styles.moveContainer}></View>
      <View style={styles.imageContainer}>
        <VideoPlayer ref={playerRef} source={fullVideo} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.resetButton}
          onPress={async () => {
            if (playerRef.current) {
              await playerRef.current.resetVideo();
            }
          }}>
          <Text style={styles.resetButtonText}>Replay</Text>
        </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  moveContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  formText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  descriptionContainer: {
    backgroundColor: 'lightblue', // Background color for the container
    padding: 10, // Padding for the container
    borderRadius: 10, // Border radius for the container
    borderWidth: 2, // Border width
    borderColor: 'blue', // Border color
    marginTop: 20,
  },
  descriptionText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
  imageContainer: {
    width: 420,
    height: 240,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: '5%',
    width: '90%',
    alignSelf: 'center',
  },
  sideButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333',
    borderRadius: 20,
  },
  resetButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 15, // Adjust the font size
    fontWeight: 'bold',
  },
  resetFormButton: {
    marginTop: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#333',
    borderRadius: 5,
    alignSelf: 'center',
  },
  resetFormButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default FullVideoComponent;
