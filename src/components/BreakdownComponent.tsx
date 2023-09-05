import React, {useRef} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import VideoPlayer from './VideoPlayer';

export function generateRandomColor() {
  // Generate random values for red, green, and blue channels
  const red = Math.floor(Math.random() * 128); // Limiting to a darker range (0-127)
  const green = Math.floor(Math.random() * 128); // Limiting to a darker range (0-127)
  const blue = Math.floor(Math.random() * 128); // Limiting to a darker range (0-127)

  // Create a CSS color string in the format "rgb(r, g, b)"
  const randomDarkColor = `rgb(${red}, ${green}, ${blue})`;

  return randomDarkColor;
}

const BreakdownComponent = ({
  currentMove,
  handlePrevious,
  handleReset,
  handleNext,
  isPreviousDisabled,
  isNextDisabled,
  form,
}) => {
  const playerRef = useRef(null);

  return (
    <View style={styles.container}>
      <View style={styles.moveContainer}>
        <Text style={styles.moveText}>
          {currentMove.id}. {currentMove.moveDescription}
        </Text>
        <Text style={styles.stanceText}>({currentMove.stance})</Text>
      </View>
      <View style={styles.imageContainer}>
        <VideoPlayer ref={playerRef} source={currentMove.video} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.sideButton}
          onPress={handlePrevious}
          disabled={isPreviousDisabled}>
          <MaterialIcons name="keyboard-arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.resetFormButton}
          onPress={async () => {
            if (playerRef.current) {
              await playerRef.current.resetVideo();
            }
          }}>
          <Text style={styles.resetFormButtonText}>Replay</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resetFormButton} onPress={handleReset}>
          <Text style={styles.resetFormButtonText}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sideButton}
          onPress={handleNext}
          disabled={isNextDisabled}>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View
        style={[
          styles.descriptionContainer,
          {backgroundColor: generateRandomColor()},
        ]}>
        <Text style={styles.descriptionText}>
          {form.facts[Math.floor(Math.random() * 20)]}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: 20,
  },
  moveContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  moveText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  stanceText: {
    fontSize: 18,
    color: 'black',
  },
  descriptionText: {
    color: 'white',
    fontSize: 20, // Increase the font size
    textAlign: 'center', // Center the text
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
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
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  sideButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333',
    borderRadius: 20,
  },
  resetFormButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#333',
    borderRadius: 5,
    marginHorizontal: 10,
  },
  resetFormButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  descriptionContainer: {
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
  },
});

export default BreakdownComponent;
