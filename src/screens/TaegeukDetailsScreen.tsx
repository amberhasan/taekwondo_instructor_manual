import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import TaegeukData from '../data/TaegeukData';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const TaegeukDetailsScreen = ({route}) => {
  const {selectedForm} = route.params;
  const selectedFormIndex = 0; // Replace this with the index of the selected form you want to display
  const form = TaegeukData[selectedFormIndex];

  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const currentMove = form.moves[currentMoveIndex];

  const handleNext = () => {
    const nextMoveIndex = (currentMoveIndex + 1) % form.moves.length;
    setCurrentMoveIndex(nextMoveIndex);
  };
  const handleReset = () => {
    setCurrentMoveIndex(0);
  };

  const handlePrevious = () => {
    const previousMoveIndex = currentMoveIndex - 1;
    if (previousMoveIndex >= 0) {
      setCurrentMoveIndex(previousMoveIndex);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        {/* <Text style={styles.formText}>{selectedForm.title}</Text> */}
        <Text style={styles.formText}>
          {currentMove.id}. {currentMove.moveDescription}
        </Text>
        <Text style={styles.descriptionText}>({currentMove.stance})</Text>
      </View>
      <View style={{backgroundColor: 'orange'}}>
        <Image
          source={currentMove.image} // Use the current move's image
          style={styles.video}
          resizeMode="cover"
        />
      </View>
      {/* Add more details or components related to the selected form */}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.sideButton}
          onPress={handlePrevious}
          disabled={currentMoveIndex === 0}>
          <Text style={styles.buttonText}>L</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sideButton}
          onPress={handleNext}
          disabled={currentMoveIndex === form.moves.length - 1}>
          <Text style={styles.buttonText}>R</Text>
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
  },
  formText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  video: {
    width: 300, // Adjust the width as needed
    height: 200, // Adjust the height as needed
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
  },
  previousButton: {
    flex: 1,
    padding: 10,
    backgroundColor: 'gray',
    borderRadius: 5,
    marginRight: 10,
  },
  nextButton: {
    flex: 1,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  descriptionText: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
  },

  // Modify the sideButton style
  sideButton: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    borderRadius: 15,
    paddingHorizontal: 10, // Add padding horizontally
  },

  // Modify the resetButton style
  resetButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'gray',
    borderRadius: 5,
    marginRight: 10, // Add margin to the right side
  },

  resetButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default TaegeukDetailsScreen;
