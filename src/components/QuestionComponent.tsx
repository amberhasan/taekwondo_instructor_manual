import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {RadioButton} from 'react-native-paper';

interface QuestionComponentProps {
  question: string;
  options: string[];
  userAnswer: number;
  onAnswerChange: (index: number) => void;
}

const QuestionComponent: React.FC<QuestionComponentProps> = ({
  question,
  options,
  userAnswer,
  onAnswerChange,
}) => {
  return (
    <View style={styles.questionContainer}>
      <View style={styles.questionHeader}>
        <Text style={styles.questionText}>{question}</Text>
      </View>
      <View style={styles.questionBorder}>
        <RadioButton.Group
          onValueChange={newValue => onAnswerChange(Number(newValue))}
          value={String(userAnswer)}>
          {options.map((option, optionIndex) => (
            <TouchableOpacity
              onPress={() => onAnswerChange(optionIndex)}
              key={optionIndex}
              style={[
                styles.option,
                userAnswer === optionIndex && styles.selectedOption,
              ]}>
              <RadioButton value={String(optionIndex)} />
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </RadioButton.Group>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  resultsContainer: {
    flex: 1,
    padding: 10,
  },
  modalContainer: {
    flex: 0.9,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden', // This ensures the borderRadius is applied to ScrollView content
  },
  closeButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 10,
    paddingTop: 10,
  },
  resultBox: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  questionText: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  answerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  correctAnswerText: {
    marginLeft: 10,
    color: 'green',
  },
  incorrectAnswerText: {
    marginLeft: 10,
    color: 'red',
  },
  hideButton: {
    alignSelf: 'center',
    marginTop: 10,
    backgroundColor: 'grey',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  hideButtonText: {
    color: 'white',
  },
  resultItem: {
    marginBottom: 10,
  },
  answerText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  correctAnswer: {
    color: 'green',
    fontWeight: 'bold',
  },
  incorrectAnswer: {
    color: 'red',
    fontWeight: 'bold',
  },
  navigationButtons: {
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
    flex: 0,
    marginRight: 10,
    alignSelf: 'stretch',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  quizContainer: {
    flexGrow: 1,
    backgroundColor: '#f9f9f9',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  questionContainer: {
    height: 400,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    elevation: 3,
  },
  questionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  questionNumber: {
    fontSize: 16,
    marginRight: 10,
    fontWeight: 'bold',
    color: '#333',
  },
  questionBorder: {
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingTop: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  bubble: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
  },
  bubbleFilled: {
    backgroundColor: '#f0f0f0',
    borderColor: '#f0f0f0',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedOption: {
    backgroundColor: '#EDE7F6',
    borderColor: 'blue',
  },
  results: {
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    elevation: 3,
  },
  score: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#333',
  },

  labelText: {
    fontSize: 16,
    fontWeight: '500',
    marginRight: 5,
  },
});
export default QuestionComponent;
