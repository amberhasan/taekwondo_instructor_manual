import React, {useState} from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import DetailsComponent from '../components/DetailsComponent';
import TaegeukData from '../data/TaegeukData';
import PalgwaeData from '../data/PalgwaeData';

const DetailsScreen = ({route}) => {
  const {selectedFormIndex, formType} = route.params;
  const form =
    formType === 'taegeuk'
      ? TaegeukData[selectedFormIndex]
      : PalgwaeData[selectedFormIndex];

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
    <SafeAreaView style={styles.container}>
      <DetailsComponent
        currentMove={currentMove}
        handlePrevious={handlePrevious}
        handleReset={handleReset}
        handleNext={handleNext}
        isPreviousDisabled={currentMoveIndex === 0}
        isNextDisabled={currentMoveIndex === form.moves.length - 1}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Set an appropriate background color
  },
});

export default DetailsScreen;
