import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

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

  const handleAnswerChange = (selectedOptionIndex: number) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = selectedOptionIndex;
    setUserAnswers(updatedAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
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
          {currentQuestion.options.map((option, optionIndex) => (
            <TouchableOpacity
              key={optionIndex}
              style={[
                styles.option,
                userAnswers[currentQuestionIndex] === optionIndex &&
                  styles.selectedOption,
              ]}
              onPress={() => handleAnswerChange(optionIndex)}>
              <View
                style={[
                  styles.bubble,
                  userAnswers[currentQuestionIndex] === optionIndex &&
                    styles.bubbleFilled,
                ]}
              />
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const renderNavigationButtons = () => {
    return (
      <View style={styles.navigationButtons}>
        {currentQuestionIndex > 0 && (
          <TouchableOpacity style={styles.button} onPress={handlePrevQuestion}>
            <Text style={styles.buttonText}>Previous</Text>
          </TouchableOpacity>
        )}
        {currentQuestionIndex < quizData.length - 1 ? (
          <TouchableOpacity style={styles.button} onPress={handleNextQuestion}>
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
    return (
      showCorrectAnswers && (
        <View style={styles.results}>
          <Text style={styles.score}>Correct Answers:</Text>
          {quizData.map((question, index) => (
            <View key={index} style={styles.resultItem}>
              <Text style={styles.answerText}>{question.question}</Text>
              <Text style={styles.correctAnswer}>
                Correct Answer: {question.options[question.correctAnswerIndex]}
              </Text>

              {question.correctAnswerIndex != userAnswers[index] && (
                <Text style={styles.incorrectAnswer}>
                  Your Answer: {question.options[userAnswers[index]]}
                </Text>
              )}
            </View>
          ))}
          <TouchableOpacity
            style={styles.button}
            onPress={() => setShowCorrectAnswers(false)}>
            <Text style={styles.buttonText}>Hide Correct Answers</Text>
          </TouchableOpacity>
        </View>
      )
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
      {renderCorrectAnswers()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
    flex: 0,
    marginRight: 10,
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
  questionText: {
    fontSize: 18,
    flex: 1,
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
});

export default QuizComponent;
