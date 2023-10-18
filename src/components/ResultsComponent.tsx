import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

interface ResultsComponentProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

const ResultsComponent: React.FC<ResultsComponentProps> = ({
  score,
  totalQuestions,
  onRestart,
}) => {
  const percentageCorrect = ((score / totalQuestions) * 100).toFixed(2);

  return (
    <View style={styles.resultsContainer}>
      <View style={styles.results}>
        <Text style={styles.percentage}>
          You got {percentageCorrect}% correct!
        </Text>
        <Text style={styles.score}>
          ({score} out of {totalQuestions} questions)
        </Text>
        <TouchableOpacity style={styles.button} onPress={onRestart}>
          <Text style={styles.buttonText}>Restart Quiz</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  resultsContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  results: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 15,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  percentage: {
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
    color: '#007BFF', // This color is used to highlight the percentage for emphasis
  },
  score: {
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 20,
    color: '#555',
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default ResultsComponent;
