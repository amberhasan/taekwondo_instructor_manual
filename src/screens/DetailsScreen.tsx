import React, {useState} from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import BreakdownComponent from '../components/BreakdownComponent';
import TaegeukData from '../data/TaegeukData';
import PalgwaeData from '../data/PalgwaeData';
import {SegmentedButtons} from 'react-native-paper';
import VideoPlayer from '../components/VideoPlayer';
import FullVideoComponent from '../components/FullVideoComponent';

const DetailsScreen = ({route}) => {
  const {selectedFormIndex, formType} = route.params;
  const [value, setValue] = React.useState('breakdown');

  const form =
    formType === 'taegeuk'
      ? TaegeukData[selectedFormIndex]
      : PalgwaeData[selectedFormIndex];

  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const currentMove = form.moves[currentMoveIndex];
  const fullVideo = form.fullVideo;

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
      <SegmentedButtons
        style={styles.segmentedButtonContainer}
        value={value}
        onValueChange={setValue}
        buttons={[
          {
            value: 'breakdown',
            label: 'Breakdown',
          },
          {
            value: 'full',
            label: 'Full Video',
          },
        ]}
      />
      {value === 'breakdown' ? (
        <BreakdownComponent
          currentMove={currentMove}
          handlePrevious={handlePrevious}
          handleReset={handleReset}
          handleNext={handleNext}
          isPreviousDisabled={currentMoveIndex === 0}
          isNextDisabled={currentMoveIndex === form.moves.length - 1}
        />
      ) : (
        <FullVideoComponent fullVideo={fullVideo} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Set an appropriate background color
  },
  segmentedButtonContainer: {
    padding: 16, // Add padding to the container
  },
});

export default DetailsScreen;
