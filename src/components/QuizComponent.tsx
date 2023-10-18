import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import QuestionComponent from './QuestionComponent';
import NavigationComponent from './NavigationComponent';
import ResultsComponent from './ResultsComponent';
import CorrectAnswersModal from './CorrectAnswersModal';
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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAnswerChange = (index: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = index;
    setUserAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const finishQuiz = () => {
    setIsQuizFinished(true);
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setIsQuizFinished(false);
  };

  const calculateScore = () => {
    let score = 0;
    for (let i = 0; i < quizData.length; i++) {
      if (userAnswers[i] === quizData[i].correctAnswerIndex) {
        score++;
      }
    }
    return score;
  };

  return (
    <View style={styles.container}>
      {isQuizFinished ? (
        <>
          <ResultsComponent
            score={calculateScore()}
            totalQuestions={quizData.length}
            onRestart={restartQuiz}
          />
          <TouchableOpacity
            style={styles.reviewButton}
            onPress={() => setIsModalVisible(true)}>
            <Text style={styles.reviewButtonText}>Review Correct Answers</Text>
            <FontAwesome
              name="arrow-right"
              size={20}
              color="#fff"
              style={styles.arrowIcon}
            />
          </TouchableOpacity>
        </>
      ) : (
        <>
          <QuestionComponent
            question={quizData[currentQuestionIndex].question}
            options={quizData[currentQuestionIndex].options}
            userAnswer={userAnswers[currentQuestionIndex]}
            onAnswerChange={handleAnswerChange}
          />
          <NavigationComponent
            onPrev={prevQuestion}
            onNext={nextQuestion}
            onSubmit={finishQuiz}
            canGoBack={currentQuestionIndex > 0}
            canSubmit={currentQuestionIndex === quizData.length - 1}
          />
        </>
      )}

      <CorrectAnswersModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        quizData={quizData}
        userAnswers={userAnswers}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#eef2f7', // A soft shade of blue
  },
  reviewButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 24,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  reviewButtonText: {
    color: '#fff',
    fontWeight: '700', // Bold font weight
    fontSize: 18,
    marginRight: 10,
  },
  arrowIcon: {
    marginLeft: 10,
  },
});

export default QuizComponent;
