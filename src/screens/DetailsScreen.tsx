import React, {useState} from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import BreakdownComponent from '../components/BreakdownComponent';
import {SegmentedButtons} from 'react-native-paper';
import FullVideoComponent from '../components/FullVideoComponent';
import QuizComponent from '../components/QuizComponent';
import {useSelector} from 'react-redux';

const DetailsScreen = ({route}) => {
  const {selectedFormIndex, formType} = route.params;
  const [viewType, setViewType] = useState<string>('breakdown'); // Added state for view type
  const taegeukData = useSelector(state => state.taegeuk.taegeukData);
  const palgwaeData = useSelector(state => state.palgwae.palgwaeData); // state.root reducer.state
  const form =
    formType === 'taegeuk'
      ? taegeukData[selectedFormIndex]
      : palgwaeData[selectedFormIndex];

  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const currentMove = form.moves[currentMoveIndex];
  const fullVideo = form.fullVideo;

  const handleNext = () => {
    let nextMoveIndex = (currentMoveIndex + 1) % form.moves.length;
    if (nextMoveIndex === form.moves.length - 1) {
      // If it's the first move again, reset the index to 0
      setCurrentMoveIndex(0);
    } else {
      setCurrentMoveIndex(nextMoveIndex);
    }
  };

  const handleViewTypeChange = (newViewType: string) => {
    // Use newViewType to set the value
    setViewType(newViewType);
    // When the view type changes, reset the index to 0
    setCurrentMoveIndex(0);
  };

  const handleReset = () => {
    setCurrentMoveIndex(0);
  };

  const handlePrevious = () => {
    let previousMoveIndex = currentMoveIndex - 1;

    if (previousMoveIndex < 0) {
      // If it's going to be negative, set it to the last move
      previousMoveIndex = form.moves.length - 1;
    }

    setCurrentMoveIndex(previousMoveIndex);
  };

  return (
    <SafeAreaView style={styles.container}>
      <SegmentedButtons
        style={styles.segmentedButtonContainer}
        value={viewType}
        onValueChange={handleViewTypeChange}
        buttons={[
          {
            value: 'breakdown',
            label: 'Breakdown',
          },
          {
            value: 'full',
            label: 'Full Video',
          },
          {
            value: 'quiz',
            label: 'Quiz',
          },
        ]}
      />
      {viewType === 'breakdown' ? (
        <BreakdownComponent
          currentMove={currentMove}
          handlePrevious={handlePrevious}
          handleReset={handleReset}
          handleNext={handleNext}
          isPreviousDisabled={false}
          isNextDisabled={false}
          form={form}
        />
      ) : viewType === 'quiz' ? (
        <QuizComponent quizData={form.quiz} />
      ) : (
        <FullVideoComponent fullVideo={fullVideo} form={form} />
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
