import React, {useRef} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import VideoPlayer from './VideoPlayer';

const FullVideoComponent = ({fullVideo}) => {
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
          <MaterialIcons name="replay" size={20} color="white" />
        </TouchableOpacity>
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
  descriptionText: {
    fontSize: 18,
    color: '#666',
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
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
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
    borderRadius: 5,
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
