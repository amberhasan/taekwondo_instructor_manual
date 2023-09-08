import palgwaeQuizSet from '../data/palgwaeQuizSet';
import taegeukQuizSet from '../data/taegeukQuizSet';

const initialState = {
  taegeuk: taegeukQuizSet,
  palgwae: palgwaeQuizSet,
};

// Define the reducer function
const quizReducer = (state = initialState, action) => {
  return state;
};

export default quizReducer;
