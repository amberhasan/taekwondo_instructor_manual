import React, {useState} from 'react';
import {View} from 'react-native';
import TaegeukDetailsComponent from '../components/TaegeukDetailsComponent';
import TaegeukData from '../data/TaegeukData';

const TaegeukDetailsScreen = ({route}) => {
  const {selectedFormIndex} = route.params;
  console.log('selectedFormIndex', selectedFormIndex);
  // const selectedFormIndex = 0; // TODO: Replace this with the index of the selected form you want to display
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
    <TaegeukDetailsComponent
      currentMove={currentMove}
      handlePrevious={handlePrevious}
      handleReset={handleReset}
      handleNext={handleNext}
      isPreviousDisabled={currentMoveIndex === 0}
      isNextDisabled={currentMoveIndex === form.moves.length - 1}
    />
  );
};

export default TaegeukDetailsScreen;
