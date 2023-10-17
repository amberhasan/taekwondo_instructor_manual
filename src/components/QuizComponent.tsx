import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import Modal from 'react-native-modal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface QuizComponentProps {
  quizData: QuizQuestion[];
}

const QuizComponent: React.FC<QuizComponentProps> = ({quizData}) => {
  const [userAnswers, setUserAnswers] = useState<number[]>(
    Array(quizData.length).fill(-1),
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false); // Added state for showing correct answers

  const isTesting = 'true';
  const handleAnswerChange = (selectedOptionIndex: number) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = selectedOptionIndex;
    setUserAnswers(updatedAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      // Check if the user has answered the current question
      if (!isTesting && userAnswers[currentQuestionIndex] === -1) {
        // User hasn't answered the current question, show a message
        Alert.alert('Please complete the current question before proceeding.');
      } else {
        // User has answered the current question, proceed to the next one
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitQuiz = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setShowResults(true);
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers(Array(quizData.length).fill(-1));
    setShowResults(false);
    setShowCorrectAnswers(false); // Reset the showCorrectAnswers state
  };

  const calculateScore = (): number => {
    let score = 0;
    for (let i = 0; i < quizData.length; i++) {
      if (userAnswers[i] === quizData[i].correctAnswerIndex) {
        score++;
      }
    }
    return score;
  };

  const percentageCorrect = () => {
    const score = calculateScore();
    return ((score / quizData.length) * 100).toFixed(2);
  };

  const currentQuestion = quizData[currentQuestionIndex];
  const renderQuestion = () => {
    return (
      <View style={styles.questionContainer}>
        <View style={styles.questionHeader}>
          <Text style={styles.questionNumber}>{currentQuestionIndex + 1}.</Text>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>
        </View>
        <View style={styles.questionBorder}>
          <RadioButton.Group
            onValueChange={newValue => handleAnswerChange(Number(newValue))}
            value={String(userAnswers[currentQuestionIndex])}>
            {currentQuestion.options.map((option, optionIndex) => (
              <TouchableOpacity
                onPress={() => handleAnswerChange(optionIndex)}
                key={optionIndex}
                style={[
                  styles.option,
                  userAnswers[currentQuestionIndex] === optionIndex &&
                    styles.selectedOption,
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

  const renderNavigationButtons = () => {
    return (
      <View
        style={[
          styles.navigationButtons,
          currentQuestionIndex === 0
            ? {alignSelf: 'flex-end'}
            : {justifyContent: 'space-between'},
        ]}>
        {currentQuestionIndex > 0 && (
          <TouchableOpacity style={styles.button} onPress={handlePrevQuestion}>
            <Text style={styles.buttonText}>Previous</Text>
          </TouchableOpacity>
        )}
        {currentQuestionIndex < quizData.length - 1 ? (
          <TouchableOpacity
            style={[styles.button]}
            onPress={handleNextQuestion}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleSubmitQuiz}>
            <Text style={styles.buttonText}>
              {currentQuestionIndex === quizData.length - 1 ? 'Submit' : 'Next'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderResults = () => {
    return (
      currentQuestionIndex === quizData.length && (
        <View style={styles.results}>
          <Text style={styles.score}>
            Your score: {calculateScore()} / {quizData.length}
          </Text>
          <Text style={styles.score}>
            Percentage correct: {percentageCorrect()}%
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleRestartQuiz}>
            <Text style={styles.buttonText}>Restart Quiz</Text>
          </TouchableOpacity>
        </View>
      )
    );
  };

  const renderCorrectAnswers = () => {
    if (!showCorrectAnswers) return null;

    return (
      <View style={styles.resultsContainer}>
        {quizData.map((question, index) => (
          <View key={index} style={styles.resultBox}>
            <Text style={styles.questionText}>{question.question}</Text>

            <View style={styles.answerSection}>
              {question.correctAnswerIndex === userAnswers[index] ? (
                <FontAwesome name="check" size={24} color="green" />
              ) : (
                <FontAwesome name="times" size={24} color="red" />
              )}
              <Text style={styles.correctAnswerText}>
                {question.options[question.correctAnswerIndex]}
              </Text>
            </View>

            {question.correctAnswerIndex !== userAnswers[index] && (
              <View style={styles.answerSection}>
                <FontAwesome name="times" size={24} color="red" />
                <Text style={styles.incorrectAnswerText}>
                  {question.options[userAnswers[index]]}
                </Text>
              </View>
            )}
          </View>
        ))}
      </View>
    );
  };

  return (
    <ScrollView
      contentContainerStyle={styles.quizContainer}
      showsVerticalScrollIndicator={false}>
      {!showResults && renderQuestion()}
      {!showResults && renderNavigationButtons()}
      {showResults && renderResults()}
      {showResults && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowCorrectAnswers(!showCorrectAnswers)}>
          <Text style={styles.buttonText}>{`${
            showCorrectAnswers ? 'Hide' : 'Show'
          } Correct Answers`}</Text>
        </TouchableOpacity>
      )}
      <Modal isVisible={showCorrectAnswers}>
        <View style={styles.modalContainer}>
          <View style={styles.closeButtonContainer}>
            <TouchableOpacity onPress={() => setShowCorrectAnswers(false)}>
              <FontAwesome name="times-circle" size={30} color="#333" />
            </TouchableOpacity>
          </View>
          <ScrollView style={{flex: 1}}>{renderCorrectAnswers()}</ScrollView>
        </View>
      </Modal>
    </ScrollView>
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

export default QuizComponent;
