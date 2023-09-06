import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

interface QuizComponentProps {
  quizData: QuizQuestion[];
}

const QuizComponent: React.FC<QuizComponentProps> = ({quizData}) => {
  const [userAnswers, setUserAnswers] = useState<number[]>(
    Array(quizData.length).fill(-1),
  );
  const [showResults, setShowResults] = useState(false);

  const handleAnswerChange = (
    questionIndex: number,
    selectedOptionIndex: number,
  ) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[questionIndex] = selectedOptionIndex;
    setUserAnswers(updatedAnswers);
  };

  const handleSubmitQuiz = () => {
    setShowResults(true);
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

  return (
    <ScrollView contentContainerStyle={styles.quizContainer}>
      <View style={styles.form}>
        {quizData.map((question, questionIndex) => (
          <View key={questionIndex} style={styles.question}>
            <Text style={styles.questionText}>
              {questionIndex + 1}. {question.question}
            </Text>
            <View style={styles.options}>
              {question.options.map((option, optionIndex) => (
                <TouchableOpacity
                  key={optionIndex}
                  style={[
                    styles.option,
                    userAnswers[questionIndex] === optionIndex &&
                      styles.selectedOption,
                  ]}
                  onPress={() =>
                    handleAnswerChange(questionIndex, optionIndex)
                  }>
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmitQuiz}>
          <Text style={styles.submitButtonText}>Submit Quiz</Text>
        </TouchableOpacity>
      </View>
      {showResults && (
        <View style={styles.results}>
          <Text style={styles.score}>
            Your score: {calculateScore()} / {quizData.length}
          </Text>
          <Text style={styles.score}>
            Percentage correct: {percentageCorrect()}%
          </Text>
          {quizData.map((question, questionIndex) => (
            <View key={questionIndex} style={styles.resultItem}>
              <Text style={styles.questionText}>{question.question}</Text>
              <Text style={styles.answerText}>
                Your answer: {question.options[userAnswers[questionIndex]]}
              </Text>
              {userAnswers[questionIndex] === question.correctAnswerIndex ? (
                <Text style={styles.correctAnswer}>Correct</Text>
              ) : (
                <View>
                  <Text style={styles.incorrectAnswer}>
                    Your answer is incorrect
                  </Text>
                  <Text style={styles.correctAnswer}>
                    Correct answer:{' '}
                    {question.options[question.correctAnswerIndex]}
                  </Text>
                </View>
              )}
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  quizContainer: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },

  form: {
    flex: 1,
  },
  question: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    marginBottom: 10,
  },
  options: {
    marginTop: 10,
  },
  option: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedOption: {
    backgroundColor: 'blue', // Change to your selected option color
    borderColor: 'blue',
  },
  optionText: {
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  results: {
    marginTop: 20,
  },
  score: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  resultItem: {
    marginBottom: 10,
  },
  answerText: {
    fontSize: 16,
    marginBottom: 5,
  },
  correctAnswer: {
    color: 'green',
    fontWeight: 'bold',
  },
  incorrectAnswer: {
    color: 'red',
    fontWeight: 'bold',
  },
  questionNumber: {
    fontSize: 16,
    marginRight: 10,
  },
});

export default QuizComponent;
