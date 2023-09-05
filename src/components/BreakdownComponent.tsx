import React, {useRef} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import VideoPlayer from './VideoPlayer';

const BreakdownComponent = ({
  currentMove,
  handlePrevious,
  handleReset,
  handleNext,
  isPreviousDisabled,
  isNextDisabled,
}) => {
  const playerRef = useRef(null);

  return (
    <View style={styles.container}>
      <View style={styles.moveContainer}>
        <Text style={styles.formText}>
          {currentMove.id}. {currentMove.moveDescription}
        </Text>
        <Text style={styles.descriptionText}>({currentMove.stance})</Text>
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

      <View style={styles.descriptionContainer}>
        <Text style={styles.aboutTitle}>About Taegeuk 1:</Text>
        <Text style={styles.descriptionText}>
          Taegeuk 1, or "Taegeuk Il Jang," is the first foundational form in
          Taekwondo. It teaches beginners fundamental stances, blocks, and
          strikes, setting the groundwork for their martial arts journey.
        </Text>
        <Text style={styles.descriptionTitle}>Key Points:</Text>
        <Text style={styles.descriptionText}>
          - Focuses on balance and coordination.
        </Text>
        <Text style={styles.descriptionText}>
          - Introduces basic stances, blocks, and strikes.
        </Text>
        <Text style={styles.descriptionText}>
          - Represents the beginning of a Taekwondo practitioner's journey.
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
    backgroundColor: '#D4E79E', // Light Green
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  aboutTitle: {
    // Add a new style for the "About Taegeuk 1" title
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
});

export default BreakdownComponent;
