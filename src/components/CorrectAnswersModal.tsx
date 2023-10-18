import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';

interface CorrectAnswersModalProps {
  isVisible: boolean;
  onClose: () => void;
  quizData: {question: string; options: string[]; correctAnswerIndex: number}[];
  userAnswers: number[];
}
const CorrectAnswersModal: React.FC<CorrectAnswersModalProps> = ({
  isVisible,
  onClose,
  quizData,
  userAnswers,
}) => {
  return (
    <Modal isVisible={isVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.closeButtonContainer}>
          <TouchableOpacity onPress={onClose}>
            <FontAwesome name="times-circle" size={30} color="#333" />
          </TouchableOpacity>
        </View>
        <ScrollView>
          {quizData.map((questionItem, index) => (
            <View key={index} style={styles.resultBox}>
              <Text style={styles.questionText}>{questionItem.question}</Text>
              {questionItem.options.map((option, optionIndex) => {
                const isSelected = userAnswers[index] === optionIndex;
                const isCorrect =
                  questionItem.correctAnswerIndex === optionIndex;

                return (
                  <View key={optionIndex} style={styles.answerSection}>
                    {/* Display checkmark if the option is the correct answer */}
                    {isCorrect && (
                      <FontAwesome
                        name="check-circle"
                        size={20}
                        color="green"
                      />
                    )}
                    {/* Display an "X" if this option was incorrectly selected by the user */}
                    {isSelected && !isCorrect && (
                      <FontAwesome name="times-circle" size={20} color="red" />
                    )}
                    <Text
                      style={[
                        styles.answerText,
                        isSelected && isCorrect && styles.correctAnswer,
                        isSelected && !isCorrect && styles.incorrectAnswer,
                      ]}>
                      {option}
                    </Text>
                  </View>
                );
              })}
            </View>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  // ... existing styles ...

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
  modalContainer: {
    flex: 0.9,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden', // This ensures the borderRadius is applied to ScrollView content
  },
  closeButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    paddingBottom: 10,
  },
});

export default CorrectAnswersModal;
