import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Video from 'react-native-video';

const TaegeukDetailsComponent = ({
  currentMove,
  handlePrevious,
  handleReset,
  handleNext,
  isPreviousDisabled,
  isNextDisabled,
}) => {
  return (
    <View style={styles.container}>
      <Video
        source={require('./test.mp4')}
        style={{
          width: 1000,
          height: 1000,
          flex: 1,
        }}
        resizeMode={'stretch'}
      />

      {/* <View style={styles.moveContainer}>
        <Text style={styles.formText}>
          {currentMove.id}. {currentMove.moveDescription}
        </Text>
        <Text style={styles.descriptionText}>({currentMove.stance})</Text>
      </View>
      <View style={styles.imageContainer}>
        <Video source={require('./test.mp4')} style={styles.video} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.sideButton}
          onPress={handlePrevious}
          disabled={isPreviousDisabled}>
          <MaterialIcons name="keyboard-arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sideButton}
          onPress={handleNext}
          disabled={isNextDisabled}>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="white" />
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#f7f7f7',
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
    flex: 1,
    width: 300,
    height: 200,
    backgroundColor: 'red',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginBottom: 20,
  },
  video: {
    // width: '100%',
    // height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 100,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '5%', // Add horizontal padding to distribute buttons evenly
    width: '90%', // Take up 90% of the screen width
    alignSelf: 'center', // Center the button container horizontally
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
  resetButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default TaegeukDetailsComponent;
